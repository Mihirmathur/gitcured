var user_logged;

$.ajax({
	method: "GET",
	url: "questions/index"
}).done(function( quest_rec ) {

	console.log( "Data Saved: ", quest_rec );
	for (var i = 0; i < quest_rec.length; i++) {
		console.log("Inside the loop");
		var currentQuestion = quest_rec[i];
		$('#questions').append('<li>'+
			'<div class="votes"><a class="uparrow">&uarr;</a><div>'+ currentQuestion.up_votes.length +'</div></div>'+
			'<div class="element"><a>'+currentQuestion.question+'</a><div><a>asked by '+currentQuestion._user.name+'</a> <a>discuss</a><a>'+
			'save</a><a>share</a><ul class="tags"><li><a>#'+currentQuestion.tags[0]+'</a></li>'+'<li><a>#'+currentQuestion.tags[1]+'</a></li></ul></div></li>'
			);
	}
});

$.ajax({
	method: "GET",
	url: "/user"
}).done(function(data){
	if (data) {
		user_logged = data;
		// console.log("Logged user object: ", data);
	} else {
		console.log("User is undefined");
	}
});

$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New question ')
  modal.find('.modal-body input').val(recipient)
  $('#post').one("click", function(){
  	var question= $('#message-text').val();
  	var t1=$('#tg1').val();
  	var t2=$('#tg2').val();
  	$('#tg1').val("");
  	$('#tg2').val("");
  	$('#message-text').val("");
  	modal.toggle();

  		$.ajax({
  			method: "POST",
  			url: "/question/create",
  			data: { user: user_logged,
								question: question,
								tags: [t1, t2] }
  		}).done(function(response){
  			console.log("Response from queston/create post: ", response);
  		});

  		$('.element').click(function(){
  			$('#right_panel').toggle();
  		});

  		$('#questions').append('<li>'+
  			'<div class="votes"><a class="uparrow">&uarr;</a><div>0</div></div>'+
  			'<div class="element"><a>'+question+'</a><div><a>asked by'+user_logged+'</a> <a>discuss</a><a>'+
  			'save</a><a>share</a><ul class="tags"><li><a>#'+t1+'</a></li>'+'<li><a>'+t2+'</a></li></ul></div></li>'
  			);

	});
});
