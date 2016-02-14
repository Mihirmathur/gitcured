$(function(){

var $window = $(window);
var $conversation = $('.conversation > ul');
var $input = $('.inputbox textarea');

var currentroom = "";

var connected = true;

var socket = io("/gitcured");

$('#questions').on("click",".element",function(e){
	currentroom = $(this).attr("data-id")
	socket.emit('join room', currentroom);
	$('.conversation > ul').html('');
})


function cleanInput(input){
	return $('<div/>').text(input).text();
}

function sendMessage (message) {
	message = cleanInput(message.trim());
	if(!connected)
	{
		console.log("warning not connected");
	}

	$.get("/user", function(data){
		if(message && connected){
			socket.emit('new message', {message: message, userid: data.name, currentroom: currentroom});
			// socket.emit('join chat room'), {roomid: id}	
		}
	});
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
	console.log("did anything happen?")
	if(data.currentroom == currentroom) addChatMessage(data)
})

socket.on('user joined', function(data){
	log(data.username + ' joined')
})

socket.on('close room', function(){
	currentroom = "";
})

socket.on('history', function(arr){
	for(var key in arr){
		addChatMessage(arr[key])
	}
})

$input.bind('keypress', function(e) {
	var code = e.keyCode || e.which;
	if(code == 13) { //Enter keycode
		sendMessage($input.val());
		$input.val('');
	}
});



})
