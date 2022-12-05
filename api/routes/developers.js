const express = require('express');
<<<<<<< HEAD
const { getAllDevelopers, getDevByMail, registerDev ,login} = require('../models/developers');
=======
const { getAllDevelopers, getDevByMail, registerDev, login } = require('../models/developers');
>>>>>>> 860ee05195b4ba15412170408e107a2b6aa66fac

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
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !password) return res.sendStatus(400); // 400 Bad Reques

  const authenticatedUser = await login(username, password);

  if (!authenticatedUser) return res.sendStatus(401); // 401 Unauthorized

  return authenticatedUser;
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

  return res.json([{"id" :authenticatedUser}, {"email" :email}]);
});



module.exports = router;
