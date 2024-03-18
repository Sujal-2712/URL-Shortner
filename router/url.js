const express=require('express');
const {handleGenerateNewShortURL,handleGetAnalyticsURL,handleRedirectURL}= require('../controller/url');
const auth=require('./../middleware/auth');

const router=express.Router();

router.post('/',auth,handleGenerateNewShortURL);
router.get('/:shortID',handleRedirectURL )
// router.get("/analytics/:shortID",handleGetAnalyticsURL);
module.exports=router;