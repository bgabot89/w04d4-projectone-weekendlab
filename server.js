//SERVER SIDE JAVASCRIPT

//SECTION FOR REQUIRES
var express = require('express');
var path= require('path');
var bodyParser = require('body-parser');
var app = express();
//var nodemon = require("nodemon");
var mongoose = require('mongoose');
var db = require('./models');
//requires User model in server.js
// var User = require('./models/user');
//no longer needed after adding "db."" to db.User.createSecure under app.post('/users', function (req, res)
//requires express sessions
var session = require('express-session');

//REQUIRES FOR API
// load in the request module
//var request = require('request');
// load in dotenv module
// don't need to save this one to a var
// just pull in the dotenv module's code and run its load method
// require('dotenv').load();

//SECTION FOR CONFIGURATION
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended :true}));

//Set up sessions and cookies to keep track of logged-in users
// middleware (new addition)
// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));

//SECTION FOR ROUTES

// //SECTION FOR ROOT HOME PAGE
app.get('/', function (req, res) {
	//res.render('index');
	// res.send("route is working");
	//db.Photo.find().exec(function(err, photo){
    	//if (err) { return console.log("find error: " + err); }
    	//res.render("index", {photo: photo});
    	res.render("index");
  //});
});

//SECTION FOR GALLERTY RENDER ROUTE
app.get('/gallery', function (req, res) {
	//res.render('index');
	// res.send("route is working");
	db.Photo.find({}).exec(function(err, photo){
    	if (err) { 
    		return console.log("find error: " + err); 
    	}
    	res.render("gallery", {photo: photo});
  });
});

// // TO BE DETERMINED DUE TO ROUTING EITHER TO ROOT OR TO IMGS
// app.get('/imgs', function (res, req) {
// res.render('imgs')
// });

//post images to new route and url, imgs.ejs with new route in server.js
//app.get('/imgs', function (req,res){
//	res.render("index", {photo: photo});
//});

app.post('/imgs', function (req,res){
	var link = req.body.urlInput;
	console.log('the link actually is:', link);
	// res.json(link);
	db.Photo.create({url: link}, function(err, photo){
    	if (err) { return console.log("create error: " + err); 
    	}
    	console.log("created ", photo.url);
    	res.json(photo);
    	// process.exit();
});
});

// SECTION FOR USER SIGNUP
// signup route with placeholder response
app.get('/signup', function (req, res) {
  	//res.send('signup coming soon');
	res.render('signup');
});

// A create user route - creates a new user with a secure password
app.post('/users', function (req, res) {
  console.log('request body: ', req.body);
  //watch req.body.emailInput instead of req.body.email
  db.User.createSecure(req.body.emailInput, req.body.passwordInput, function (err, user) {
    req.session.userId = user._id;
    //res.json(user);
  	//res.json("signup user route worked!");
  	res.redirect('/profile');
  });
});

//SECTION FOR USER LOGIN
// // login route with placeholder response
app.get('/login', function (req, res) {
  //res.send('login coming soon');
  res.render('login');
});

//authenticates the user
app.post('/sessions', function (req, res) {
	console.log('request body from login form is: ', req.body);
	// call authenticate function to check if password user entered is correct
  db.User.authenticate(req.body.emailInput, req.body.passwordInput, function (err, user) {
    //res.send(user);
    // res.redirect('/users');
    req.session.userId = user._id;
    //res.json(user);
    console.log(user, 'logged in!');
    res.redirect('/profile');
  });
});

//SECTION FOR USER PROFILE
// show user profile page
app.get('/profile', function (req, res) {
  // find the user currently logged in
  db.User.findOne({_id: req.session.userId}, function (err, currentUser) {
    res.render('profile.ejs', {user: currentUser});
  });
});

//SECTION FOR USER LOGOUT
app.get('/logout', function (req, res) {
  // remove the session user id
  req.session.userId = null;
  // redirect to login (for now)
  res.redirect('/login');
});

//sets up server to listen on a port
//updates (process.env.PORT || 3000) due to heroku
var server = app.listen(process.env.PORT || 3000, function() {
	var port = server.address().port;
	console.log('sanity check app listening on port', port);
});

