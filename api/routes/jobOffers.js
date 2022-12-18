const express = require('express');
const { authorizeDev } = require('../utils/auths');

const {
  getAllOffers,
  addToIntersted,
  notInterested,
  getAllJobOffersFromCompany,
  getAllDevInterestedForOffer,
  createJobOffer,
  getAllTypeOffer,
  getLanguageRequired,
  getAllLanguages,
  addLanguageToAnOffer,
  getLikedOffers,
  likeDev,
  dislikeDev,
  getMatchesDevAndCompany,
  getCompleteMatchesInfosCompanies,
  getCompleteMatchesInfosOffers
  
} = require('../models/jobOffers');


const router = express.Router();

router.get('/', async (req, res) => {
  const allOffers = await getAllOffers();

  res.json(allOffers);
});

router.post('/addToInterstedDev', async (req, res) => {
  const idDeveloper = req?.body?.idDeveloper;
  const idOffer = req?.body?.idOffer;

  await addToIntersted({ idDeveloper, idOffer });

  res.json({ id_dev: idDeveloper, id_offer: idOffer });
});

router.post('/notInterestedDev/', async(req, res) => {
  const idDeveloper = req?.body?.idDeveloper;
  const idOffer = req?.body?.idOffer;
  
  const result = await notInterested(idDeveloper,idOffer);
  
  return res.json(result);
})


router.get('/allJobOfferFromCompany/:idCompany', async (req, res) => {
  const idCompanyy = req.params.idCompany;
  const allOffersFromCompany = await getAllJobOffersFromCompany(idCompanyy);

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
  return res.json(devsInterested);
});

router.post('/create/:idCompany', authorizeDev, async (req, res) => {
  const idCompany = req?.params.idCompany;
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

router.get('/allTypeOffer', async (req, res) => {
  const allTypeOffer = await getAllTypeOffer();

  if (allTypeOffer === undefined) {
    return res.sendStatus(400);
  }

  return res.json(allTypeOffer);
});

router.get('/likedOffers/:idCompany', async (req, res) => {
  // eslint-disable-next-line camelcase
  const id_company = req.params.idCompany;
  const matches = await getLikedOffers(id_company);
  if (!matches || matches ===undefined) {
    return res.sendStatus(400);
  }
  return res.json(matches);
});

router.post('/likeDev/:idDev/:idOffer', async (req, res) => {
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

router.get('/getMatchesDevAndCompnay/:idOffer', async (req, res) => {
  // eslint-disable-next-line camelcase
  const idOfferr = req.params.idOffer;

  const result = await getMatchesDevAndCompany(idOfferr);

  if(!result || result==undefined)
    res.sendStatus(400);

  return res.json(result);
});

router.get('/getCompaniesMatchInfos/:idDev', async (req, res) => {
  // eslint-disable-next-line camelcase
  const id_dev = req.params.idDev;

  const result = await getCompleteMatchesInfosCompanies(id_dev);

  if(!result || result==undefined)
    res.sendStatus(400);

  return res.json(result);
});

router.get('/getJobOffersMatchInfos/:idCompany/:idDev', async (req, res) => {
  // eslint-disable-next-line camelcase
  const id_dev = req.params.idDev;
  const id_company = req.params.idCompany;

  const result = await getCompleteMatchesInfosOffers(id_company,id_dev);

  if(!result || result==undefined)
    res.sendStatus(400);

  return res.json(result);
});


router.get('/getLanguageRequired/:idOffer', async (req, res) => {
  const offer = req.params.idOffer;
  const languageRequired = await getLanguageRequired(offer);

  if (languageRequired === undefined) {
    return res.json([
      {
        language: "Aucun language"
      }
    ]);
  }

  return res.json(languageRequired);
});

router.get('/getAllLanguages', async (req, res) => {
  const allLanguages = await getAllLanguages();

  if (allLanguages === undefined) {
    return res.sendStatus(400);
  }

  return res.json(allLanguages);
});

router.post('/addLanguageToOffer', async (req, res) => {
  const offer = req?.body?.offer;
  const languageToAdd = req?.body?.language;

  if (languageToAdd === 'Aucun langage') {
    return res.json('Creer une offre sans langage requis');
  }
  const addLanguage = await addLanguageToAnOffer(offer, languageToAdd);

  return res.json(addLanguage);

});

module.exports = router;
