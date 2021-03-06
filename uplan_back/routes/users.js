var express = require('express');
var router = express.Router();
//var User = require('../controllers/users.js');
var mongoose =require('mongoose');
var User = require('../models/user.js');
/* GET users listing. */

//user route

//var xiaoming = new User({name:'Eric1990',password: '1234567', email:'123@hotmail.com'});

//xiaoming.save(function (err) {
  //  if (err) // ...
  //      console.log('meow');
//});
router.post('/signup',function(req,res,next){
    var _user = req.body.user;
    User.findOne({name: _user.name},  function(err, user) {
        if (err) {
            console.log(err)
        }

        if (user) {
            return res.redirect('/signin')
        }
        else {
            user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err)
                }

                res.json(user);
            })
        }
    })
});
   // var newUser = new User(_user);
    //var user = req.param('user'); //req.param('user)
    // use findOne method in models. If exists, jump to login page
   // newUser.save(function(err,post){
       // if (err) return next(err);
     //   res.json(post);
    //})



router.post('/signin', function (req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;

    User.findOne({name:name},function (err,user) {
        if(err){
            console.log(err);
        }
        if(!user){
            return res.redirect('/signup');
            // if the account is not exsit, return back to the signin page
        }
        user.comparePassword(password, function(err, isMatch){
            if(err){
                console.log(err);
            }
            if(isMatch){
                 // if get matched password then save in to memory
                return res.redirect('/');
            }
            else{
                res.end('<h1>Password is not matched</h1>');
                console.log('Password is not matched');
                return res.redirect('/signin');

            }

        })

    })

});



module.exports = router;
