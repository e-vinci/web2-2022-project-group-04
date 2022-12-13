/* eslint-disable spaced-comment */
/* eslint-disable no-console */
// eslint-disable-next-line no-undef
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../connection');

const saltRounds = 10;

// eslint-disable-next-line no-undef
const jwtSecret = 'MatteoLeBg';
const lifetimeJwt = 24 * 60 * 60 * 1000;
//const saltRounds = 10;

const getAllDevelopers = async () =>
  new Promise((resolve, reject) => {
    client.query(
      `SELECT dev.id_developer,
    dev.lastname,
    dev.firstname,
    dev.mail,
    dev.birth_date,
    dev.tel
    FROM webproject.developers dev,
    webproject.type_offers tof
    WHERE dev.type_offer_required= tof.id_type_offer`,
      (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          console.log('erreur ', err.message);
          reject(err.message);
        }
      },
    );
  });

const getDevByMail = (mail) =>
  new Promise((resolve, reject) => {
    
    const select = `SELECT * FROM webproject.developers where mail = $1`;
    client.query(select, [mail], (err, result) => {
      if (err) {
        reject(err.message);
        console.log(err.message);
      } else  {
          resolve(result.rows[0]);
        } 
    });
  });

const getCompagnyByMail = (mail) =>
  new Promise((resolve, reject) => {
    
    const select = `SELECT * FROM webproject.compagnies where mail = $1`;
    client.query(select, [mail], (err, result) => {
      if (err) {
        reject(err.message);
        console.log(err.message);
      } else if (result.rowCount !== 0) {
          resolve(result.rows[0]);
        } else {
          console.log('Compagny not found');
          
        }
    });
  });

  const getProfilDevById = (idDev) =>
  new Promise((resolve, reject) => {
    
    const select = `SELECT * 
    FROM webproject.developers dev    
    where id_developer = $1`;

    client.query(select, [idDev], (err, result) => {
      if (err) {
        reject(err.message);
        console.log(err.message);
      } else if (result.rowCount !== 0) {
          resolve(result.rows[0]);
        } else {
          console.log('User not found');
          
        }
    });
  });


  async function getmasteredLanguageByIdDev(idDev) {
    
    const select = `SELECT lang.language
    FROM webproject.mastered_languages mast, webproject.languages lang
    where mast.developper = $1 and lang.id_language = mast.language` ;
    try {
      const res = await client.query(select, [idDev]);
      if(res.rowCount===0){
    return undefined;
      }

      return res.rows[0];
    } catch (err) {
        console.log(err.message);
    }
    return undefined;
  }

  async function login(mail, password) {

    let isDev = true;
    let id;
    let userFound = await getDevByMail(mail);
    
    if (!userFound) {
      userFound = await getCompagnyByMail(mail);
      isDev = false;
    }
    if (!userFound) return undefined;

    if(isDev){
      id = userFound.id_developer;
    }else{
      id = userFound.id_company;
    }

    const passwordMatch =  await bcrypt.compare(password, userFound.password);
    if (!passwordMatch) return undefined;

    
  
    const token = jwt.sign(
      { id }, // session data added to the payload (payload : part 2 of a JWT)
      jwtSecret, // secret used for the signature (signature part 3 of a JWT)
      { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
    );
  
    const authenticatedUser = {
      id,
      isDev,
      token,
    };
  
    return authenticatedUser;
  }



  const registerDev = async (lastname, firstname,email, password, date, tel, typeOffer) => {
      const insert = `INSERT INTO webproject.developers(lastname, firstname, mail, password, birth_date, tel, type_offer_required)
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id_developer` ;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      try {
        const res = await client.query(insert, [lastname, firstname,email, hashedPassword, date, tel, typeOffer]);
        return res.rows[0];
      
      } catch (err) {
          console.log(err.message);
      }
      return undefined;
     
  };
  
  async function insertNewProgramtionLanguage(language) {
    
    const insert = `
    
    INSERT INTO webproject.languages VALUES (default,?)  RETURNING id_language;
    
` 
    ;
    try {
      const res = await client.query(insert, [language]);
      if(res.rowCount===0){
        console.log("insert Lp pas effectue")
        return undefined;
      }
      console.log("insert Lp effectue")
      return res.rows[0];
    } catch (err) {
        console.log(err.message);
    }
    return undefined;
  }

  async function getAllLanguages() {
    
    const select = `
    
    SELECT l.id_language, l.language from webproject.languages l;
    `   ;
    try {
      const res = await client.query(select);
      if(res.rowCount===0){
        console.log("aucun languages")
        return undefined;
      }
      console.log(" plusieurs languages")
      return res.rows;
    } catch (err) {
        console.log(err.message);
    }
    return undefined;
  }



  

  

  

module.exports = { getAllDevelopers, getDevByMail, registerDev, login,getProfilDevById , getmasteredLanguageByIdDev,insertNewProgramtionLanguage,getAllLanguages };
