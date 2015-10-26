//index.js file should require mongoose and connect to your app's mongoose db.
//Modify models/index.js to have it incorporate your model. It will need to:
// require your model from the other file
var mongoose = require ("mongoose");
mongoose.connect('mongodb://localhost/w04d4-projectone-weekendlab');
// add your model to index.js's module.exports
module.exports.Photo = require('./photo.js');
