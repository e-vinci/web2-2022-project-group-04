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



module.exports = {getAllOffers,addToIntersted,getAllJobOffersFromCompany}