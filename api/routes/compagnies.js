/* eslint-disable no-console */
const express = require('express');
const { getAllCompagnies, getOneCompany, registerCompany } = require('../models/compagnies');

const router = express.Router();

router.get('/', async (req, res) => {
  const allCompangies = await getAllCompagnies();
  if (allCompangies === undefined) {
    return res.status(404);
  }
  return res.json(allCompangies);
});

router.get('/:idCompany', async (req, res) => {
  const idCompany = req?.params?.idCompany?.length !== 0 ? req.params.idCompany : undefined;

  if (idCompany === undefined) {
    return res.status(400);
  }
  const company = await getOneCompany(idCompany);
  return res.json(company);
});

router.post('/register', async (req, res) => {
  const companyName = req?.body?.company_name;
  const description = req?.body?.description;
  const adress = req?.body?.adress;
  const mail = req?.body?.mail;
  const password = req?.body?.password;

  const idCompany = await registerCompany({
    companyName,
    description,
    adress,
    mail,
    password,
  }).catch((err) => {
    console.error("Error", err);
    return res.status(400);
  });

  if (!idCompany || idCompany === undefined) return res.status(400);

  return res.json(idCompany);
});

module.exports = router;
