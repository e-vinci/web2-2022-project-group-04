const express = require('express');
const {getAllOffers,addToIntersted} = require('../models/jobOffers');

const router = express.Router();

router.get('/', async (req,res)=>{
    const allOffers = await getAllOffers()

    res.json(allOffers);
})

router.post('/addToInterstedDev', async (req,res)=>{
    
    const idDeveloper = req?.body?.idDeveloper;
    const idOffer = req?.body?.idOffer;

    await addToIntersted(
        idDeveloper,
        idOffer
    )
    res.json([{"id_dev" :idDeveloper}, {"id_offer" :idOffer}]);
})


module.exports = router;