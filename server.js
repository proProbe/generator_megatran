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

var connection_string = 'mongodb://127.0.0.1:27017/bismuth';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect('mongodb://'+connection_string, function(err){
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
	mongoose.connection.close(function(){
		console.log('Closed connection to mongodb');
	});
	process.exit(0);
});

var imgModel = require('./models/img.model.js');
var fileFolder = __dirname;
if(process.env.OPENSHIFT_DATA_DIR){
	fileFolder = process.env.OPENSHIFT_DATA_DIR;

}

//	Send static files when requested
app.use('/', express.static(__dirname + '/public'));

app.get('/img/:category/:file', function(req, res){
	res.sendFile(fileFolder + '/imgs/'+req.params.category+'/'+req.params.file );
});

app.get('/img', function(req, res){
	imgModel.find().lean().exec(function(err, imgs){
		if(err){throw err;}
		return res.status(200).json(imgs);
	});
});

app.get('/img/:category', function(req, res){
	imgModel.find({category:req.params.category}).lean().exec(function(err, imgs){
		if(err){throw err;}
		return res.status(200).json(imgs);
	});
});

app.post('/upload', function(req, res){

	var form = new formidable.IncomingForm({
		uploadDir: process.env.OPENSHIFT_TMP_DIR
	});
	// console.log(form.path);
	var tempPath;
	var title;
	var category;
	form.parse(req, function(err, fields, files){
		tempPath = files.file.path;
		title = fields.title;
		category = fields.category;
		form.name = title;
	});
	form.on('end', function(){
		var newPath = fileFolder + '/imgs/' + category +  '/' + title;
		var pdir = fileFolder + '/imgs';
		if(!fs.existsSync(pdir)){
			fs.mkdirSync(pdir);
		}
		if(!fs.existsSync(fileFolder + '/imgs/' + category)){
			fs.mkdirSync(fileFolder + '/imgs/' + category);
		}
		fs.rename(tempPath, newPath, function(err){
			if(err){
				return console.log(err);
			}
		});
		var img = new imgModel({
			category:category,
			title:title,
			path: '/img/' + category + '/' + title,
			description:"Test pictures"
		});
		img.save(function(err, img){
			if(err){throw err;}
			res.status(200).send({message:"Saved image"});
		});
	});

});

//	Initiate the app.
app.listen(port, ip);

console.log('Current App name: ' + 'Bismuth');
console.log('Listening to port ' + port);

