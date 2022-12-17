/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../connection');

const jwtSecret = 'MatteoLeBg';
const lifetimeJwt = 24 * 60 * 60 * 1000;
const saltRounds = 10;

const getAllCompagnies = async () => {
  const select = `select id_company ,company_name, description,
    adress , mail
     from webproject.compagnies`;
  try {
    const res = await client.query(select);

    return res.rows;
  } catch (error) {
    console.log(err.message);
  }
  return undefined;
};

const getOneCompany = async (idCompany) => {
  const select = `select company_name, description,
    adress , mail, password from webproject.compagnies where id_company = $1`;
  try {
    const res = await client.query(select, [idCompany]);

    return res.rows[0];
  } catch (error) {
    console.log(err.message);
  }
  return undefined;
};

const registerCompany = async (data) => {
  const insert = `insert into webproject.compagnies(company_name, description, adress, mail, password)
  VALUES ($1,$2,$3,$4,$5) RETURNING id_company`;

  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  try {
    const res = await client.query(insert, [
      data.companyName,
      data.description,
      data.adress,
      data.mail,
      hashedPassword,
    ]);
    const id = res.rows[0].id_company;

    const token = jwt.sign(
      { id: id, isDev: false }, // session data added to the payload (payload : part 2 of a JWT)
      jwtSecret, // secret used for the signature (signature part 3 of a JWT)
      { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
    );

    const authenticatedUser = {
      id,
      isDev: false,
      token,
    };

    return authenticatedUser;
  } catch (err) {
    console.log(err.message);
  }
  return undefined;
};

module.exports = { getAllCompagnies, getOneCompany, registerCompany };
