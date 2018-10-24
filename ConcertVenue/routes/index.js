var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var assert = require('assert');


var url = 'mongodb://localhost:27017/concertVenue'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home - Concert Venue' });
});

router.get('/about', function(req, res, next){
    res.render('about', { title: 'About - Concert Venue'});
});





router.get('/login', function(req, res, next){
    res.render('login', { title: 'About - Concert Venue'});
});



//MongoDB test https://www.youtube.com/watch?v=ZKwrOXl5TDI





module.exports = router;
