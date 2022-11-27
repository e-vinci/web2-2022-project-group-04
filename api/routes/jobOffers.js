const express = require('express');
const {getAllOffers} = require('../models/jobOffers');

const router = express.Router();

router.get('/', async (req,res)=>{
    const allOffers = await getAllOffers()

    res.json(allOffers);
})


module.exports = router;