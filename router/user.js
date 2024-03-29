const express=require('express');
const auth=require('./../middleware/auth')
const router=express.Router();
const {handleUserLogin,handleUserSignup,renderProfile,deleteURL}=require('./../controller/user');
const {handleGenerateNewShortURL2}=require('./../controller/url');

router.post('/signup',handleUserSignup);

router.post('/login',auth,handleUserLogin);

router.get('/profile',auth,renderProfile);

router.post('/url',auth,handleGenerateNewShortURL2);

router.get('/delete', deleteURL);

module.exports=router;