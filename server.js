'use strict';
//	Require the necessary packages
var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
var fs = require('fs');
var formidable = require('formidable');
var mongoose = require('mongoose');
// var util = require('util');

//	Set all the middleware.
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());


//	Set port to 3000 if no port is specified.
var port = process.env.OPENSHIFT_NODEJS_PORT||process.env.PORT||3000;
var ip = process.env.OPENSHIFT_NODEJS_IP||"127.0.0.1";

var mongoURL = 'mongodb://127.0.0.1:27017';
if(process.env.OPENSHIFT_MONGODB_DB_HOST){
	mongoURL = "mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/";
}
mongoose.connect(mongoURL, function(err){
	if(err){
		console.log('mongodb connection error', err);
	}else{
		console.log('mongodb connection successful!');
	}
});

/*
	Close the process when exiting the server.
	Processes like db connections should be closed here.
*/
process.on('SIGINT', function() {
	console.log('\nClosed app');
	process.exit(0);
});


//	Send static files when requested
app.use('/', express.static(__dirname + '/public'));

app.get('/img/:category/:file', function(req, res){
	res.sendFile(__dirname + '/imgs/tavlor/test1.jpg' );
});

app.post('/img', function(req, res){

	var form = new formidable.IncomingForm();
	var tempPath;
	var title;
	var category;
	form.parse(req, function(err, fields, files){
		tempPath = files.file.path;
		title = fields.title;
		category = fields.category;
	});
	form.on('end', function(){
		fs.rename(tempPath, __dirname + '/imgs/' + category +  '/' + title, function(err){
			if(err){
				throw err;
			}
			res.status(200).send({message:"Saved image"});
		});
	});
});

//	Initiate the app.
app.listen(port, ip);

console.log('Current App name: ' + 'Bismuth');
console.log('Listening to port ' + port);

