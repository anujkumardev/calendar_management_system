const express = require('express');
const router= express.Router();
const {  RegisterUser, setMeeting, getMeeting} = require('../service/service.js');
const { UserRegister, UsersMeeting } = require('./middleware.js');
router.get('/getUserSchedule',getMeeting);
router.post('/RegisterUser',UserRegister, RegisterUser);
router.post('/CreateMeeting',UsersMeeting, setMeeting);

router.use('/*',(req,res)=>{
    res.send("anything");
});

module.exports = {
    router
};