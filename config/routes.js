var JSX = require('node-jsx').install();
var React = require('react');
var users = require('./../server/controllers/users.js');
var passport = require('passport');


module.exports = function(app) {
  app.get('/search', function(req, res) {
    res.send(healthify_results.html)
   })
  app.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/successRedirect');
  })
  app.post('/register', function(req, res) {
    users.create(req, res);
  })
}
