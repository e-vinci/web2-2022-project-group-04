const client = require('../connection');

const getAllOffers =()=> new Promise((resolve, reject) => {
    const select = `SELECT c.company_name , t.type_offer, j.title, j.description , j.upload_date 
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



module.exports = {getAllOffers}