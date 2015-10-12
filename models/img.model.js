var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imgSchema = new Schema({
	category:{type:String, required:true},
	title:{type:String, required:true},
	path:{type:String, required:true},
	description:{type:String}
});

module.exports = mongoose.model('imgs', imgSchema);