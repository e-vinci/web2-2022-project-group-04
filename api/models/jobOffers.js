/* eslint-disable no-console */
const client = require('../connection');

//get all offers from DB
const getAllOffers = async () => {
  const select = `SELECT j.id_offer ,c.company_name , t.type_offer, j.title, j.description , j.upload_date
  FROM webproject.job_offers j
  INNER JOIN webproject.compagnies c ON j.company = c.id_company
  INNER JOIN webproject.type_offers t ON j.type_offer = t.id_type_offer`;

  try {
    const res = await client.query(select);

    return res.rows;
  } catch (error) {
    console.log(error.message);
  }
  return undefined;
};

//add a match in DB (between an offer and a dev)
const addToIntersted = async (data) => {
  const insert = `insert into webproject.matches(job_offer, developer) values ($1,$2) `;

  client.query(insert, [data.idOffer, data.idDeveloper], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(result.rows[0]);
    }
  });
};

//return all offers from a company from DB with its id
const getAllJobOffersFromCompany = async (idCompany) => {
  const select = `SELECT j.id_offer, j.title, t.type_offer, j.description, j.upload_date
    FROM webproject.job_offers j
             inner join webproject.compagnies c on c.id_company = j.company
    INNER JOIN webproject.type_offers t on t.id_type_offer = j.type_offer
    WHERE c.id_company = $1`;

  try {
    // eslint-disable-next-line camelcase
    const res = await client.query(select, [idCompany]);
    if (res.rowCount === 0) {
      console.log('pas de matches bd');
      return undefined;
    }
    return res.rows;
  } catch (err) {
    console.log(err.message);
  }
  return undefined;
};

//return all devs intersted for an offer from DB with its id 
async function getAllDevInterestedForOffer(idOffer) {
  const select = `SELECT d.id_developer, d.lastname, d.firstname, d.mail, d.birth_date, d.tel, t.type_offer

    FROM webproject.matches m
             JOIN webproject.developers d on d.id_developer = m.developer
             JOIN webproject.job_offers jo on jo.id_offer = m.job_offer
            JOIN webproject.type_offers t on t.id_type_offer = d.type_offer_required
    
        AND m.developer_is_interested = true AND m.job_offer = $1
        AND  m.company_is_interested = false`;

  try {
    const res = await client.query(select, [idOffer]);
    if (res.rowCount === 0) {
      console.log('pas de matches bd');
      return undefined;
    }
    return res.rows;
  } catch (err) {
    console.log(err.message);
  }
  return undefined;
}

//add an offer in DB
const createJobOffer = (jobOffer) =>
  new Promise((resolve, reject) => {
    const insert = `insert into webproject.job_offers(company, title, type_offer, description) 
    VALUES ($1,$2,$3,$4) RETURNING id_offer`;
    client.query(
      insert,
      [jobOffer.idCompany, jobOffer.title, jobOffer.typeOffer, jobOffer.description],
      (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result.rows);
        }
      },
    );
  });

//return all types of offer from DB
const getAllTypeOffer = async () =>{
  const select = `SELECT * FROM webproject.type_offers`;
  try {
    const res = await client.query(select);

    return res.rows
    
  } catch (error) {
    console.log(error.message);
  }
  return undefined;
}


async function getMatchesDevAndCompany(idOffer) {
  const select = `SELECT d.*
    FROM webproject.matches m, 
    webproject.developers d
    where 
    m.job_offer = $1
    and d.id_developer = m.developer
    and m.developer_is_interested = true
    and m.company_is_interested = true  
    `;
  try {
    const res = await client.query(select, [idOffer]);
    if (res.rowCount === 0) {
      console.log('pas de matches bd');
      return undefined;
    }
    return res.rows;
  } catch (err) {
    console.log(err.message);
  }
  return undefined;
}

async function getCompleteMatchesInfosCompanies(idDev) {
  const select = `
  SELECT DISTINCT c.*
  FROM 
  webproject.matches m, 
  webproject.job_offers j,
  webproject.compagnies c
  where 
  m.developer = $1
  and m.job_offer = j.id_offer
  and j.company = c.id_company
  and m.developer_is_interested = true
  and m.company_is_interested = true  
  `;
  try {
    const res = await client.query(select, [idDev]);
    if (res.rowCount === 0) {
      console.log('pas de matches ');
      return undefined;
    }
    return res.rows;
  } catch (err) {
    console.log(err.message);
  }
  return undefined;
}
async function getCompleteMatchesInfosOffers(idCompany, idDev) {
  const select = `
  SELECT DISTINCT j.*
  FROM 
  webproject.matches m, 
  webproject.job_offers j,
  webproject.compagnies c
  where 
  j.company = $1
  and m.developer = $2
  and m.job_offer = j.id_offer
  and j.company = c.id_company
  and m.developer_is_interested = true
  and m.company_is_interested = true  
  `;
  try {
    const res = await client.query(select, [idCompany, idDev]);
    if (res.rowCount === 0) {
      console.log('pas de matches ');
      return undefined;
    }
    return res.rows;
  } catch (err) {
    console.log(err.message);
  }
  return undefined;
}

async function getLikedOffers(idCompany) {
  const select = `SELECT distinct j.*,t.type_offer
    FROM webproject.matches m, 
    webproject.developers d,
    webproject.job_offers j,
    webproject.type_offers t,
    webproject.compagnies c
    where d.id_developer = m.developer
    and c.id_company = j.company
    and j.company = $1
    and m.job_offer = j.id_offer
    and d.type_offer_required= t.id_type_offer
    and m.company_is_interested = false
    and m.developer_is_interested = true
    `;
  try {
    const res = await client.query(select, [idCompany]);
    if (res.rowCount === 0) {
      console.log('pas de matches bd');
      return undefined;
    }

    return res.rows;
  } catch (err) {
    console.log(err.message);
  }
  return undefined;
}

async function likeDev(idDev, idOffer) {
  const UPDATE = `UPDATE webproject.matches  SET company_is_interested = true WHERE developer = $1 and job_offer = $2  RETURNING company_is_interested`;

  try {
    const result = await client.query(UPDATE, [idDev, idOffer]);
    if (result) return result.rows;

    return 1;
  } catch (err) {
    console.log(err.message);
    return undefined;
  }
}

async function dislikeDev(idDev, idOffer) {
  const DELETE = `DELETE FROM webproject.matches m
    WHERE m.developer = $1 and m.job_offer = $2 RETURNING *`;

  try {
    const result = await client.query(DELETE, [idDev, idOffer]);
    if (result) return result.rows;

    return 1;
  } catch (err) {
    console.log(err.message);
    return undefined;
  }
}

const getLanguageRequired = async (idOffer) => {
  const select = `SELECT l.language
    FROM webproject.required_languages r
    LEFT OUTER JOIN webproject.job_offers j ON j.id_offer = r.job_offer 
    LEFT OUTER JOIN webproject.languages l ON l.id_language = r.language
    WHERE r.job_offer = $1`;
  try {
    const res = await client.query(select, [idOffer]);
    if (res.rowCount === 0) {
      console.log('aucun languages requis');
      return undefined;
    }
    console.log('plusieurs languages');
    return res.rows;
  } catch (err) {
    console.log(err.message);
  }
  return undefined;
};

const getAllLanguages = async () => {
  const select = `SELECT * FROM webproject.languages`;
  try {
    const res = await client.query(select);
    return res.rows;   

  } catch (error) {
    console.log(error.message);
  }
  return undefined;
}


const addLanguageToAnOffer = async (idOffer, idLanguage) => {
  new Promise((resolve, reject) => {
    const insert = `insert into webproject.required_languages(job_offer, language) VALUES($1, $2)`;
    client.query(insert, [idOffer, idLanguage], (err, result) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(result.rows[0]);
      }
    });
  });
};

module.exports = {
  getAllOffers,
  addToIntersted,
  getAllJobOffersFromCompany,
  getAllDevInterestedForOffer,
  createJobOffer,
  getAllTypeOffer,
  getLanguageRequired,
  getAllLanguages,
  addLanguageToAnOffer,
  getLikedOffers,
  likeDev,
  dislikeDev,
  getMatchesDevAndCompany,
  getCompleteMatchesInfosCompanies,
  getCompleteMatchesInfosOffers,
};
