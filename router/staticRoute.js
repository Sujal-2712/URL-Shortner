const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/regi',(req,res)=>{
    res.render('regi');
});

router.get('/forgot-password',(req,res)=>{
    res.render('forgotPassword');
});

router.get('/reset-password',(req,res)=>{
    res.render('resetPassword');
})


module.exports=router;

