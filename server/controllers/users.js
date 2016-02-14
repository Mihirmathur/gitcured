var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Users = mongoose.model('Users');


// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     console.log("Called the function: ", username, password, done);
//     Users.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err)}
//       if  (!user) {
//         return done(null, false, { message: 'Incorrect username.'});
//       }
//       if (!user.authenticate(password)) {
//         return done(null, false, { message: 'Incorrect password'});
//       }
//
//       return done(null, user);
//     })
//   }
// ))


module.exports = {
  create: function(req, res) {
    console.log("the post request: ", req.body);
    var user = new Users(req.body);
    user.password = user.generateHash(user.password);
    user.save(function(err) {
      if (err) {
        console.log("Error creating new user: ", err);
        res.redirect('/');
      } else {
        console.log("Succesfully created user");
        req.session.loggedIn = true;
        req.session.user = user;
        res.redirect('/search')
      }
    })
  },
  find: function(req, res) {
    console.log("request boddy username: ", req.session);
    Users.findOne({username: req.session.username}, function(err, user) {
      if (err) {
        console.log("Errror getting the user: ", err);
      } else {
        console.log("Succesfully found the user: ", user);
        res.json(user);
      }
    })
  },
  login: function(req, res) {
    Users.findOne({username: req.body.username}, function(err, user) {
      if (user) {
        req.session.LoggedIn = false;
        req.session.user = {};
        if (user.authenticate(req.body.password)) {
          req.session.loggedIn = true;
          req.session.user = user;
          res.redirect('/search')
        } else {
          console.log("incorrect password");
          res.redirect('/')
        }
      } else {
        console.log("user does not exist");
        res.redirect('/')
      }
    })
  }
}
