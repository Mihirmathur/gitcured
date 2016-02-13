var JSX = require('node-jsx').install();
var React = require('react');
var users = require('./../server/controllers/users.js');
var questions = require('./../server/controllers/questions.js');
var passport = require('passport');


module.exports = function(app) {
  app.get('/search', function(req, res) {
    res.sendfile('./public/healthify_results.html')
   })
  app.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/successRedirect');
  })
  app.post('/register', function(req, res) {
    users.create(req, res);
  })
  app.get('/questions/index', function(req, res) {
    questions.index(req, res);
  })
  app.post('/question/create', function(req, res) {
    console.log("post request to /question/add ", req.body);
    questions.create(req, res);
  })
  app.post('/question/upvote', function(req, res) {
    console.log("post request to /question/upvote ", req.body);
    questions.upVote(req, res);
  })
}
