//CLIENT SIDE JAVASCRIPT

console.log("Sanity Check: JS is working!");

$(document).ready(function(){
	//SECTION FOR NEW URL
	// form for new URL (index.ejs)
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
	//SECTION FOR NEW USER
	//form for new user (signup.ejs)
	var $newuser = $('#new-user');

	//submit form for new user
	$newuser.on('submit', function(event) {
		console.log('cliked signup form submit button');
		//event.preventDefault();
		//creates new user object based on data input in the form
		var customer = $newuser.serialize();
		console.log('the customer happens to be: ', customer);
		// //$.post('/users', $newuser.serialize() , function(response){
		// 	console.log('we are on the post method for new user');
		// 	console.log('the response is: ', response);
		// });
	});
	//SECTION FOR NEW LOGIN
	//form for new login (login.ejs)
	var $newlogin = $('#new-login');

	//submit form for new login
	//$.post to send a request to a /sessions path with the user's login data
	$newlogin.on('submit', function(event) {
		console.log('cliked login form submit button');
		//event.preventDefault();
		//creates new user object based on data input in the form
		var login = $newlogin.serialize();
		console.log('the login happens to be: ', login);
		// //$.post('/sessions', $newlogin.serialize() , function(response){
		// 	console.log('we are on the post method for new login');
		// 	console.log('the response is: ', response);
		// });
	});

	// load images if they exist, client side ajax if else
	// //$.ajax({
	// 	url: '/api/photos',
	// 	type: "POST",
	// 	data: text
	// });

});
