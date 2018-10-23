var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home - Concert Venue' });
});

router.get('/about', function(req, res, next){
    res.render('about', { title: 'About - Concert Venue'});
});

router.get('/upcoming', function(req, res, next){
    res.render('upcoming', { title: 'Upcoming Events - Concert Venue'});
});

router.get('/login', function(req, res, next){
    res.render('login', { title: 'About - Concert Venue'});
});

module.exports = router;
