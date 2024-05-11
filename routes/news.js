const express = require('express');
const { newsById } = require('../controllers/news');

const route = express.Router();

route.get('/', (req, res)=>{
    res.render('news');
})

route.get('/id/:id/:title', newsById)

module.exports = route;