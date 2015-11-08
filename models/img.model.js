var imgModel = function(mongoose){
	var Schema = mongoose.Schema;

	var imgSchema = new Schema({
		category:{type:String, required:true},
		title:{type:String, required:true},
		path:{type:String, required:true},
		description:{type:String}
	});
	return mongoose.model('imgs', imgSchema);
};

// module.exports = mongoose.model('imgs', imgSchema);
module.exports = imgModel;