var userModel = function(mongoose){
	var Schema = mongoose.Schema;

	var userSchema = new Schema({
		user:{type:String, required:true},
		password:{type:String, required:true},
		admin:Boolean
	});
	return mongoose.model('user', userSchema);
}

module.exports = userModel;