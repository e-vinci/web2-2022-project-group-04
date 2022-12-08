const express = require('express');
const {
  getAllOffers,
  addToIntersted,
  getAllJobOffersFromCompany,
  getAllDevInterestedForOffer,
  createJobOffer,
  getAllTypeOffer
} = require('../models/jobOffers');

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
  const { idCompany } = req.params;
  const allOffersFromCompany = await getAllJobOffersFromCompany(idCompany);

  if (allOffersFromCompany === undefined || !allOffersFromCompany) return res.status(400);

  return res.json(allOffersFromCompany);
});

router.get('/allDevelopersInterstedOffer/:idOffer', async (req, res) => {
  const { idOffer } = req.params;
  const devsInterested = await getAllDevInterestedForOffer(idOffer);

  // eslint-disable-next-line no-console
  console.log(devsInterested);

  if (devsInterested === undefined || !devsInterested) return res.status(400);

  return res.json(devsInterested);
});

router.post('/create', async (req, res) => {
  const idCompany = req?.body?.idCompany;
  const typeOffer = req?.body?.typeOffer;
  const title = req?.body?.title;
  const description = req?.body?.description;

  // eslint-disable-next-line no-console
  console.log(idCompany, typeOffer, title, description);
  const idOffer = await createJobOffer({
    idCompany,
    typeOffer,
    title,
    description,
  });
  res.json(idOffer);
});

router.get('/allTypeOffer', async(req,res)=>{

  const allTypeOffer = await getAllTypeOffer();

  if (allTypeOffer === undefined) {
    return res.sendStatus(400);
    
  }

  return res.json(allTypeOffer);
})



module.exports = router;
