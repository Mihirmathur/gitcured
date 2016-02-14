
$.ajax({
	method: "GET",
	url: "questions/index"
}).done(function( quest_rec ) {

	console.log( "Data Saved: " + quest_rec );
});

var user_logged;

$.ajax({
	method: "GET",
	url: "/user"
}).done(function(data){
	user_logged=data;
	console.log(data);
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
  	var quest= $('#message-text').val();
  	var t1=$('#tg1').val();
  	var t2=$('#tg2').val();
  	$('#tg1').val("");
  	$('#tg2').val("");
  	$('#message-text').val("");
  	console.log(quest);
  	modal.toggle();

  	q=[{user: user_logged,
  		question: quest,
  		tags: [t1,t2]
  		  }
  		];

  		$.ajax({
  			method: "POST",
  			url: "/question/create",
  			data: q
  		}).done(function(response){
  			if(ok==true){

  			}
  			else return;
  		});

  		$('.element').click(function(){
  			$('#right_panel').toggle();
  		});

  		$('#questions').append('<li>'+
  			'<div class="votes"><a class="uparrow">&uarr;</a><div>1010</div></div>'+
  			'<div class="element"><a>'+quest+'</a><div><a>asked by'+user_logged+'</a> <a>discuss</a><a>'+
  			'save</a><a>share</a><ul class="tags"><li><a>#'+t1+'</a></li>'+'<li><a>'+t2+'</a></li></ul></div></li>'
  			);

  		});
});
