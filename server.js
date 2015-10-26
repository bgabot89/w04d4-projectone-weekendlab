//SERVER SIDE JAVASCRIPT

//SECTION FOR REQUIRES
var express = require('express');
var path= require('path');
var bodyParser = require('body-parser');
var app = express();
//var nodemon = require("nodemon");
var mongoose = require('mongoose');
var db = require('./models');

//SECTION FOR CONFIGURATION
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended :true}));

//SECTION FOR ROUTES
app.get('/', function (req, res) {
	//res.render('index');
	// res.send("route is working");
	db.Photo.find().exec(function(err, photo){
    	if (err) { return console.log("find error: " + err); }
    	res.render("index", {photo: photo});
  });
});

//post images to new route and url, imgs.ejs with new route in server.js
//app.get('/imgs', function (req,res){
//	res.render("index", {photo: photo});
//});

app.post('/imgs', function (req,res){
	var link = req.body.urlInput;
	console.log('the link actually is:', link);
	// res.json(link);
	db.Photo.create({url: link}, function(err, photo){
    	if (err) { return console.log("create error: " + err); }
    	console.log("created ", photo.url);
    	res.json(photo);
    	// process.exit();
});
});

// //SECTION FOR USER SIGNUP AND LOGIN
// // signup route with placeholder response
// app.get('/signup', function (req, res) {
//   res.send('signup coming soon');
// });

// // login route with placeholder response
// app.get('/login', function (req, res) {
//   res.send('login coming soon');
// });

//sets up server to listen on a port
var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log('sanity check app listening on port', port);
});

