//CLIENT SIDE JAVASCRIPT

console.log("Sanity Check: JS is working!");

$(document).ready(function(){

	// form for new URL
	var $newurl = $('#new-url');

	// element for holding list of URLs
	var $urllist = $('#url-list');

	// submit form for new URL
	$newurl.on('submit', function(event) {
		console.log('clicked');
		event.preventDefault();
		// create new URL object based on data input in the form
		var link = $newurl.serialize();
		console.log('the link happens to be: ', link);
		$.post('/imgs', $newurl.serialize() , function(response){
			console.log('we are on the post method');
			console.log('the response is:', response);
			$('#url-list').append('<li class="url"> <img src="' + response.url + '"> </li>');
		});
	});

	// load images if they exist, client side ajax if else
	// //$.ajax({
	// 	url: '/api/photos',
	// 	type: "POST",
	// 	data: text
	// });

});
