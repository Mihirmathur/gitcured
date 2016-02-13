var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

passport.use(new LocalStrategy(
  function(username, password, done) {
    Users.findOne({ username: username }, function(err, user) {
      if (err) { return done(err)}
      if  (!user) {
        return done(null, false, { message: 'Incorrect username.'});
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password'});
      }

      return done(null, user);
    })
  }
))


module.exports = {
  create: function(req, res) {
    var user = new Users(req.body);
    user.password = user.generateHash(user.password);
    user.save(function(err) {
      if (err) {
        console.log("Error creating new user: ", err);
        res.send(false)
      } else {
        console.log("Succesfully created user");
        passport.authenticate('local', { successRedirect: '/successRedirect', failureRedirect: '/failureRedirect'});
        res.send(true)
      }
    })
  },
}
