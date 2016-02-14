var JSX = require('node-jsx').install();
var React = require('react');
var users = require('./../server/controllers/users.js');
var questions = require('./../server/controllers/questions.js');
var passport = require('passport');
var path = require('path')


module.exports = function(app) {
  app.get('/search', function(req, res) {
    // console.log("the session: ", req.session);
    if (req.session.loggedIn) {
      res.sendFile(path.resolve('public/healthify_results.html'));
    } else {
      res.redirect('/');
    }
  })
  app.get('/matrix_diabetes.json', function(req, res) {
    res.sendfile('./server/render_data/matrix_diabetes.json')
  })
  app.get('/categories.json', function(req, res) {
    res.sendfile('./server/render_data/categories.json')
  })
  app.post('/login', function(req, res) {
    // console.log("user to login: ", req.body);
    users.login(req, res);
  })
  app.post('/register', function(req, res) {
    users.create(req, res);
  })
  app.get('/questions/index', function(req, res) {
    questions.index(req, res);
  })
  app.post('/question/create', function(req, res) {
    // console.log("post request to /question/create ", req.body);
    questions.create(req, res);
  })
  app.post('/question/upvote', function(req, res) {
    // console.log("post request to /question/upvote ", req.body);
    questions.upVote(req, res);
  })
  app.post('/chat/post',function(req, res){
    console.log("chat request has been made", req.body)
    questions.chat(req, res);
  })
  app.get('/user', function(req, res) {
    users.find(req, res);
  })
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
}
