const express = require('express');
const send = require('../email/sendEmail');

const route = express.Router();

route.get('/', (req, res)=>{
    res.render('feedback');
})

route.post('/', (req, res)=>{
    const {email, name, message} = req.body;

    send.feedback(name, email, message);
    
    res.redirect('/');
})

module.exports = route;