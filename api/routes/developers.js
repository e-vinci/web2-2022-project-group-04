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
  const dev = await getDevByMail(req.params.mail);
  
  return res.json(dev);
});

module.exports = router;
