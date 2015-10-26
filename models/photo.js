var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var PhotoSchema = new Schema({
	//title: String,
	url: String,
	//captions: String,
	//location: String
});

var Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
