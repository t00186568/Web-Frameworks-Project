var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/concertVenue');
var User = require('../models/users');
//Login in code from tutorial: https://www.youtube.com/watch?v=pzGQMwGmCnc
//and https://www.youtube.com/watch?v=zsOGmMuwhT4

router.get('/login', function(req, res, next){
  res.render('login', { title: 'About - Concert Venue'});
});

//Get all users
router.get('/', function(req,res,next){
 User.find({}, function(err, users){
    if(err){
      res.send('Error');
      next();
    }
    res.json(users);
    
  });
});

//Delete user by ID
router.delete('/:id', function(req,res){
  User
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(doc => {
      if(!doc){ return res.status(404).end();}
      return res.send("Record Deleted");
    })
    .catch(err => next(err));
});

//Post - register new user
router.post('/register', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;

  var newuser = new User();
  newuser.username = username;
  newuser.password = password;
  newuser.firstname = firstname;
  newuser.lastname = lastname;
  newuser.save(function(err, savedUser){
      if(err){
          console.log(err);
          return res.status(500).send();
      }

      return res.status(200).send();
  });
});



//Login 
router.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
 //Temporarily authenticating user all the time while I try to figure out Login
  User.find({'username': username, 'password': password}, function(err, user){
    // if(err){
    //   console.log(err);
    //   return res.status(500).send();
    // } else if(!user){
      
    //   return res.status(401).send();
      

    // } else{
    
    req.session.user = user;
    
    return res.redirect("/");
    
    //}
  
  });
   
});









module.exports = router;
