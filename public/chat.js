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
	$('#right_panel').show();
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
	$("#right_panel").hide();
})

socket.on('history', function(arr){
	$('.chathead > .section_title').text(arr[0].question);
	$('.chathead > .section_subtitle a').text(arr[1]);
	var count = 0;
	for(var key in arr[0].chat){
		addChatMessage(arr[0].chat[key])
		count++;
	}

	if(count == 0) {
		var $convoLI = $('<li />').html("Looks like nobody has yet talked about this topic. Be the first...").css({color:"#AAA"})
		$conversation.append($convoLI)
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
