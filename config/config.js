var config = function(){
	var db = 'mongodb://127.0.0.1:27017/bismuth';
	if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
		db = 'mongodb://'+ process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
		process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
		process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
		process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
		process.env.OPENSHIFT_APP_NAME;
	}

	var port = process.env.OPENSHIFT_NODEJS_PORT||process.env.PORT||3000;

	var ip = process.env.OPENSHIFT_NODEJS_IP||"127.0.0.1";

	var secret = 'iloveidapalm';

	return {
		db:db,
		port:port,
		ip:ip,
		secret:secret
	};
};

module.exports = config;