var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
// var session = require('express-session');
var passport = require('passport');
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/mongoose.js');
require('./config/routes.js')(app);


io.on('connection', function(socket) {
  console.log('a user connected: ');
  socket.on('disconnect', function() {
    console.log('a user disconnected');
  })
})



http.listen(8000, function() {
    console.log("Server up and running on port 8000");
})
