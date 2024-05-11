const express = require('express');

const route = express.Router();

route.get('/', (req, res)=>{
    res.render('donate');
})

route.get('/:location', (req, res)=>{
    const url = 'https://paystack.com/pay/floods-donors-book'
    const locations = {
        africa: '-africa',
        brazil: '-brazil',
        indonesia: '-indonesia',
        kenya: '-kenya',
        uae: '-uae'
    };

    const ext = locations[req.params.location] || '';

    res.redirect(url+ext);
})

module.exports = route;