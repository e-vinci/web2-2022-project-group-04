const express = require('express');
const { getAllCompagnies, getOneCompany } = require('../models/compagnies');

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

module.exports = router;
