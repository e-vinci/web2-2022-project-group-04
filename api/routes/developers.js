const express = require('express');
const { getAllDevelopers, getDevByMail, registerDev, login } = require('../models/developers');

const router = express.Router();

/* GET users listing. */

router.get('/', async (req, res) => {
  const allDevelopers = await getAllDevelopers();

  if (!allDevelopers || allDevelopers === undefined) return res.status(400);

  return res.json(allDevelopers);
});

router.get('/login/:mail', async (req, res) => {
  console.log("eafxfa")
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

  createCookieSessionData(req, authenticatedUser);

  return res.json({"id" :authenticatedUser});
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

  createCookieSessionData(req, authenticatedUser);

  return res.json([{"id" :authenticatedUser}, {"email" :email}]);
});



/* Logout a user */
router.get('/logout', (req, res) => {
  req.session = null;
  return res.sendStatus();
});

function createCookieSessionData(req, authenticatedUser) {
  req.session.mail = authenticatedUser.mail;
  req.session.token = authenticatedUser.token;
}


module.exports = router;
