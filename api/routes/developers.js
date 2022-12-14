const { authorizeDev } = require('../utils/auths');
const express = require('express');
const { getAllDevelopers, getDevByMail, registerDev, login,getProfilDevById ,
  getmasteredLanguageByIdDev,addLangageToDev,getAllLanguages } = require('../models/developers');

const router = express.Router();

/* GET users listing. */

router.get('/', async (req, res) => {
  const allDevelopers = await getAllDevelopers();

  if (!allDevelopers || allDevelopers === undefined) return res.status(400);

  return res.json(allDevelopers);
});

router.get('/login/:mail', async (req, res) => {
  const devFound = await getDevByMail(req.params.mail);
  if(!devFound ) return res.status(400);
  return res.json(devFound);
});

/* Login a user */
router.post('/login', async (req, res) => {
  const mail = req?.body?.mail?.length !== 0 ? req.body.mail : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!mail || !password) return res.sendStatus(400); // 400 Bad Reques

  const authenticatedUser = await login(mail, password);

  if (!authenticatedUser) return res.sendStatus(401); // 401 Unauthorized


  return res.json(authenticatedUser);
});


/* Register a user */
router.post('/registerDev', async (req, res) => {
  const lastname = req?.body?.lastname?.length !== 0 ? req.body.lastname : undefined;
  const firstname = req?.body?.firstname?.length !== 0 ? req.body.firstname : undefined;
  const email = req?.body?.mail?.length !== 0 ? req.body.mail : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;
  const date = req?.body?.birth_date?.length !== 0 ? req.body.birth_date : undefined;
  const phone = req?.body?.tel?.length !== 0 ? req.body.tel : undefined;
  const typeOffer = req?.body?.type_offer_required?.length !== 0 ? req.body.type_offer_required: undefined;
  

  if (!email || !password) return res.sendStatus(400); // 400 Bad Request

  const authenticatedUser = await registerDev(lastname, firstname, email, password, date, phone, typeOffer);

  if (!authenticatedUser) return res.sendStatus(409); // 409 Conflict

  return res.json(authenticatedUser);
});



router.get('/profileDev/:id', async (req, res) => {
 // if (req.user.id != req.params.id) return res.sendStatus(403);
  const devFound = await getProfilDevById(req.params.id);

  if(!devFound ) return res.sendStatus(400);
  

  return res.json(devFound);
});

router.get('/masteredLanguageDev/:id', async (req, res) => {
  
  const infoFound = await getmasteredLanguageByIdDev(req.params.id);

  if(!infoFound ) {
    return res.sendStatus(404);
  }
  return res.json(infoFound);
});

router.get('/getAllLanguages', async (req, res) => {
  
  const infoFound = await getAllLanguages();

  if(!infoFound ) {
    return res.sendStatus(404);
  }
  
  return res.json(infoFound);
});

router.post('/addLanguageProgramationToDev', authorizeDev,async (req, res) => {
  const dev =  req.body.idDev ;
  const language = req.body.idLanguage;

  if (req.user.id != dev) return res.sendStatus(403);
  if (!dev || !language ) return res.sendStatus(400); // 400 Bad Request
  addLangageToDev(dev,language);
  return res.json("effectue");
});




module.exports = router;
