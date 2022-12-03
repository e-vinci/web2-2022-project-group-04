const express = require('express');
const { getAllOffers, addToIntersted, getAllJobOffersFromCompany } = require('../models/jobOffers');

const router = express.Router();

router.get('/', async (req, res) => {
  const allOffers = await getAllOffers();

  res.json(allOffers);
});

router.post('/addToInterstedDev', async (req, res) => {
  const idDeveloper = req?.body?.idDeveloper;
  const idOffer = req?.body?.idOffer;

  await addToIntersted(idDeveloper, idOffer);
  res.json([{ id_dev: idDeveloper }, { id_offer: idOffer }]);
});

router.get('/allJobOfferFromCompany/:idCompany', async (req, res) => {
    const {idCompany} = req.params;
    const allOffersFromCompany = await getAllJobOffersFromCompany(idCompany);

    if(allOffersFromCompany === undefined || !allOffersFromCompany) return res.status(400);
  
    return res.json(allOffersFromCompany);
  });

module.exports = router;
