/* eslint-disable no-console */
const client = require('../connection');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const getAllCompagnies = async () =>
  new Promise((resolve, reject) => {
    const select = `select id_company ,company_name, description,
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

const getOneCompany = (idCompany) =>
  new Promise((resolve, reject) => {
    const select = `select company_name, description,
    adress , mail from webproject.compagnies where id_company = $1`;
    client.query(select, [idCompany], (err, result) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(result.rows[0]);
      }
    });
  });

const registerCompany = async (data) =>
  new Promise((resolve, reject) => {
    const insert = `insert into webproject.compagnies(company_name, description, adress, mail, password)
  VALUES ($1,$2,$3,$4,$5) RETURNING id_company`;

  const hashedPassword = bcrypt.hash(data.password, saltRounds);

    client.query(
      insert,
      [data.companyName, data.description, data.adress, data.mail, hashedPassword],
      (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          console.log(result.rows);
          resolve(result.rows[0]);
        }
      },
    );
  });


  


module.exports = { getAllCompagnies, getOneCompany , registerCompany };
