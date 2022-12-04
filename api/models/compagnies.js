/* eslint-disable no-console */
const client = require('../connection');

const getAllCompagnies = async () =>
  new Promise((resolve, reject) => {
    const select = `select id_company , description,
    adress , mail
     from webproject.compagnies`;
    client.query(select, (err, result) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(result.rows);
      }
    });
  });

const getOneCompany=(idCompany)=> new Promise((resolve, reject) => {
    const select = `select company_name, description,
    adress , mail from webproject.compagnies where id_company = $1`;
    client.query(select,[idCompany],(err,result)=>{
        if (err) {
            reject(err.message);
          } else {
            resolve(result.rows[0]);
          }
    })
})

module.exports = { getAllCompagnies , getOneCompany};
