const express = require('express');
const { getAllDevelopers, getDevByMail } = require('../models/developers');

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


module.exports = router;
