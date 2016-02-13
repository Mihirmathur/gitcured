$(function(){
	
var $window = $(window);
var $conversation = $('.conversation > ul');
var $input = $('.inputbox textarea');

var connected = true;

var socket = io();

function cleanInput(input){
	return $('<div/>').text(input).text();
}

function sendMessage (message) {
	message = cleanInput(message.trim());
	if(!connected)
	{
		console.log("warning not connected");
	}

	if(message && connected) 
		socket.emit('new message', {message: message});
}

function addChatMessage (data, options){
	console.log("Something happened")
	options = options || {};
	var $timeDiv = $('<div class="time" />').text(data.timestamp)
	var $userA = $('<a class="user" />').text(data.username)
	var $messDiv = $('<div class="message" />').append($userA, data.message)
	var $convoLI = $('<li />').append($timeDiv,$messDiv)
	$conversation.append($convoLI)
}

socket.on('new message', function(data) {
	addChatMessage(data)
})

socket.on('user joined', function(data){
	log(data.username + ' joined')
})


$input.bind('keypress', function(e) {
	var code = e.keyCode || e.which;
	if(code == 13) { //Enter keycode
		sendMessage($input.val());
		$input.val('');
	}	
});




})