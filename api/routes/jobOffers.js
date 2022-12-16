const express = require('express');
const {
  getAllOffers,
  addToIntersted,
  getAllJobOffersFromCompany,
  getAllDevInterestedForOffer,
  createJobOffer,
  getAllTypeOffer,
  getLikedOffers,
  likeDev,
  dislikeDev
} = require('../models/jobOffers');

const router = express.Router();

router.get('/', async (req, res) => {
  const allOffers = await getAllOffers();

  res.json(allOffers);
});

router.post('/addToInterstedDev', async (req, res) => {
  const idDeveloper = req?.body?.idDeveloper;
  const idOffer = req?.body?.idOffer;

  await addToIntersted({idDeveloper, idOffer});
  res.json({ id_dev: idDeveloper , id_offer: idOffer });
});

router.get('/allJobOfferFromCompany/:idCompany', async (req, res) => {
  const { idCompany } = req.params;
  const allOffersFromCompany = await getAllJobOffersFromCompany(idCompany);

  if (allOffersFromCompany === undefined || !allOffersFromCompany) return res.status(400);

  return res.json(allOffersFromCompany);
});

router.get('/allDevelopersInterstedOffer/:idOffer', async (req, res) => {
  console.log("on est mort")
  const { idOffer } = req.params;
  const devsInterested = await getAllDevInterestedForOffer(idOffer);
  console.log(devsInterested)
  // eslint-disable-next-line eqeqeq

  // eslint-disable-next-line no-console
  if (devsInterested === undefined) return res.sendStatus(400);

  console.log("eee")
  return res.json(devsInterested);
});

router.post('/create/:idCompany', async (req, res) => {
  const {idCompany} = req.params;
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

router.get('/likedOffers/:idCompany', async (req, res) => {
  // eslint-disable-next-line camelcase
  const id_company = req.params.idCompany;
  const matches = await getLikedOffers(id_company);
    console.log("ici")
  if (!matches || matches ===undefined) {
    return res.sendStatus(400);
  }
  return res.json(matches);
});

router.post('/likeDev/:idDev/:idOffer', async (req, res) => {
  console.log("ici")
  // eslint-disable-next-line camelcase
  const id_dev = req.params.idDev;
  const {idOffer} = req.params;

   const result = await likeDev(id_dev,idOffer);
  
  return res.json(result);
});
router.post('/dislikeDev/:idDev/:idOffer', async (req, res) => {
  // eslint-disable-next-line camelcase
  const id_dev = req.params.idDev;
  const {idOffer} = req.params;

  const result = await dislikeDev(id_dev,idOffer);
  return res.json(result);
});



module.exports = router;




