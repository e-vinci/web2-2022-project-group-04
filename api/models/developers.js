/* eslint-disable spaced-comment */
/* eslint-disable no-console */


//const bcrypt = require('bcrypt');
const client = require('../connection');
//const saltRounds = 10;


const getAllDevelopers = async () =>
  new Promise((resolve, reject) => {
    client.query(
      `SELECT dev.id_developer,
    dev.lastname,
    dev.firstname,
    dev.mail,
    dev.birth_date,
    dev.tel,
    tof.type_offer AS offer_required
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

const getDevByMail = async (mail) =>
  new Promise((resolve, reject) => {
    const select = `SELECT mail , password FROM webproject.developers where mail = $1`;
    client.query(select, [mail], (err, result) => {
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

  const registerDev = async (lastname, firstname,email, password, date, tel, typeOffer) =>
    new Promise((resolve, reject) => {
      const insert = `INSERT INTO webproject.developers(lastname, firstname, mail, password, birth_date, tel, type_offer_required)
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id_developer` ;
    client.query(insert, [lastname, firstname,email, password, date, tel, typeOffer], (err, result) => {
      if(err){
        reject(err.message);
        console.log(err.message);
      }
      else {
      resolve(result.rows[0]);
      }})
    });
  


  

  

  

module.exports = { getAllDevelopers, getDevByMail, registerDev };
