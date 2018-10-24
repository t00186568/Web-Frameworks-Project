var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var assert = require('assert');
var ObjectId = require('mongoose').Types.ObjectId;



var url = 'mongodb://localhost:27017/concertVenue'

var Concert = require('../models/concerts');


router.get('/addConcert', function(req, res, next){
    res.render('addConcert', { title: 'Add a new Concert'});
});

router.get('/checkout', function(req, res, next){
    //ConcertID is passed from link on upcomingEvents page through the url as checkout?id=[id]
    //I then use req.query to extract this ID from the URL and I will use this to query the database for the relevant information associated with it
    if(!req.session.user){
        const url = req.url;
       
        res.redirect('/users/login/?redirect=' + url);
      }else{
    
    var concert_id = req.query['id'];

    var resultArray = [];
    mongoose.connect(url, function(err, db){
        assert.equal(null, err);
        var cursor = db.collection('concerts').find({'_id': ObjectId(concert_id)});
        cursor.forEach(function(doc,err){
            assert.equal(null,err);
            resultArray.push(doc);
        }, function(){
            db.close();
            res.render('checkout', {title: 'Checkout', items: resultArray});
        });
    });
}
});


router.get('/upcomingEvents', function(req, res, next) {
    var resultArray = [];


    mongoose.connect(url, function(err, db){
        assert.equal(null, err);
        var cursor = db.collection('concerts').find();
        cursor.forEach(function(doc, err){
            assert.equal(null, err);
            resultArray.push(doc);
        }, function(){
            db.close();
            res.render('upcomingEvents', {items: resultArray, title: 'Upcoming Events'});
        });
    });
});

router.post('/addConcert', function(req, res, next){
    var item = {
        ArtistName:  req.body.ArtistName,
        ConcertPrice: req.body.ConcertPrice,
        ConcertDate: req.body.ConcertDate,
        TicketsAvailable: req.body.TicketsAvailable
    };

    mongoose.connect(url, function(err, db){
        db.collection('concerts').insertOne(item, function(err, result){
           // assert.equal(null, err);
            res.redirect('/concerts/addConcert');
           
            db.close();
        });
    });

});


module.exports = router;