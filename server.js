var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
// var session = require('express-session');
var passport = require('passport');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var uuid = require('node-uuid');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('TreeHacks'));
app.use(session({
    genid: function(req) {
        return uuid.v1();
    },
    store: new MongoStore({
        url: 'mongodb://localhost/treehacks',
        autoRemove: 'native',
        touchAfter: 24 * 3600 // time period in seconds || = 24 hours; Let the session be updated once on a 24 hour period
    }),
    secret: 'TreeHacks',
    saveUninitialized: false, // don't create a session until something is stored
    resave: false, // don't resave session if unmodified
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 // log out after 1 month (days * hours * minutes * seconds * milliseconds)
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, './public')));


require('./config/mongoose.js');
require('./config/routes.js')(app);

var numUsers = 0;

io.on('connection', function (socket) {
	console.log("a user has connected");

	socket.on('new message', function(data){
		console.log("message has emitted")
		var d = new Date()
		var data_message = {
			username: data.userid,
			timestamp: d.toLocaleTimeString().replace(/(.*)\D\d+/, '$1'),
			message: data.message
		}
		socket.emit('new message', data_message)
		socket.broadcast.emit('new message', data_message)
	});

	socket.on('add user', function(username) {
		if (addedUser) return;
		++numUsers;
	});

	socket.on('disconnect', function(){
		console.log("a user has disconnected")
		--numUsers;
	})
});


http.listen(8000, function() {
    console.log("Server up and running on port 8000");
})
