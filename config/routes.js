var JSX = require('node-jsx').install();
var React = require('react');
var users = require('./../server/controllers/users.js');
var questions = require('./../server/controllers/questions.js');
var passport = require('passport');


module.exports = function(app) {
  app.get('/search', function(req, res) {
    // console.log("the session: ", req.session);
    if (req.session.passport.user) {
      res.sendfile('./public/healthify_results.html')
    } else {
      res.redirect('/');
    }
   })
  app.post('/login', function(req, res) {
    req.login(req.body, function(err) {
      if (err) {
        console.log("error from /login: ", err);
        return res.redirect('/');
      }
      return res.redirect('/search');
    });
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
  app.post('/chat/post',function(req, res){
    console.log("chat request has been made", req.body)
    questions.chat(req, res);
  })
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
}
