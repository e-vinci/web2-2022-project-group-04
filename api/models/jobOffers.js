/* eslint-disable no-console */
const client = require('../connection');

const getAllOffers =()=> new Promise((resolve, reject) => {
    const select = `SELECT j.id_offer ,c.company_name , t.type_offer, j.title, j.description , j.upload_date 
    FROM webproject.job_offers j 
    INNER JOIN webproject.compagnies c ON j.company = c.id_company
    INNER JOIN webproject.type_offers t ON j.type_offer = t.id_type_offer`;
    client.query(select,(err,result)=>{
        if (err) {
            reject(err.message);
        } else {
            resolve(result.rows);

        }
    })
})

const addToIntersted = async( idOffer , idDeveloper) => {

    const insert = `insert into webproject.matches(job_offer, developer) values ($1,$2) `

    client.query(insert,[idOffer,idDeveloper],(err,result)=>{
        if (err) {
            console.log(err.message);
            
        }else  {
            console.log(result.rows[0]);
        }
    })
}

const getAllJobOffersFromCompany = async(idCompany)=> new Promise((resolve, reject) => {
    const select =`SELECT j.* FROM  webproject.job_offers j join webproject.compagnies c on c.id_company = j.company
    WHERE c.id_company= $1`;

    client.query(select,[idCompany], (err,result)=>{
        if (err) {
            reject(err.message);
        } else {
            resolve(result.rows)
        }
    })
    
})

const getAllDevInterestedForOffer = async(idOffer) => new Promise((resolve, reject) => {
    const select = `SELECT d.id_developer, d.lastname, d.firstname, d.mail, d.birth_date, d.tel, t.type_offer

    FROM webproject.matches m
             JOIN webproject.developers d on d.id_developer = m.developer
             JOIN webproject.job_offers jo on jo.id_offer = m.job_offer
            JOIN webproject.type_offers t on t.id_type_offer = d.type_offer_required
    
        AND m.developer_is_interested = true AND m.job_offer = $1`;

        client.query(select,[idOffer],(err,result)=>{
            if (err) {
                reject(err.message)
            } else {
                
                resolve(result.rows)
            }
        })
    
})

const createJobOffer = (jobOffer) => new Promise((resolve, reject) => {
    const insert = `insert into webproject.job_offers(company, title, type_offer, description) 
    VALUES ($1,$2,$3,$4) RETURNING id_offer`;
    client.query(insert,[jobOffer.idCompany,jobOffer.title , jobOffer.typeOffer, jobOffer.description],(err, result)=>{
        if(err){
            reject(err.message)
        }else{
            resolve(result.rows)
        }
    })
});


const getAllTypeOffer = async()=> new Promise((resolve, reject) => {
    const select= `SELECT * FROM webproject.type_offers`;
    client.query(select,(err,result)=>{
        if (err) {
            reject(err.message)
        } else {
            resolve(result.rows)
        }
    })
})

    



module.exports = {getAllOffers,addToIntersted,getAllJobOffersFromCompany 
    , getAllDevInterestedForOffer , createJobOffer , getAllTypeOffer} 