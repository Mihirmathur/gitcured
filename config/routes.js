var JSX = require('node-jsx').install();
var React = require('react');


module.exports = function(app) {
  app.get('/search', function(req, res) {
    res.send('healthify_results.html')
   })
  app.post('/login', function(req, res) {
    
  })
}
