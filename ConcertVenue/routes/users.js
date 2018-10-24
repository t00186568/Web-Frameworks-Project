var express = require('express');
var router = express.Router();

var User = require('../models/users');
//Login in code from tutorial: https://www.youtube.com/watch?v=pzGQMwGmCnc
//and https://www.youtube.com/watch?v=zsOGmMuwhT4

router.get('/login', function(req, res, next){
  res.render('login', { title: 'About - Concert Venue'});
});

router.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
 
  User.findOne({'username': username, 'password': password}, function(err, user){
    if(err){
      console.log(err);
      return res.status(500).send();
    } else if(!user){
      
      return res.status(401).send();
      

    } else{
    
    req.session.user = user;
    
    return res.redirect("/");
    
    }
  
  });
   
});

router.get('/dashboard', function(req, res ){
  if(!req.session.user){
    return res.status(401).send();
  }
  

  res.render('dashboard');
});

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


module.exports = router;
