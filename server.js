'use strict';
//	Require the necessary packages
var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');

//	Set all the middleware.
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());


//	Set port to 3000 if no port is specified.
var port = process.env.OPENSHIFT_NODEJS_PORT||process.env.PORT||3000;
var ip = process.env.OPENSHIFT_NODEJS_IP||"127.0.0.1";


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

app.post('/img', function(req, res){

	var form = new formidable.IncomingForm();
	form.uploadDir = __dirname;
	var tempPath;
	var title;
	form.parse(req, function(err, fields, files){
		tempPath = files.file.path;
		title = fields.title;
		// console.log(files);
	});
	form.on('end', function(){
		fs.rename(tempPath, __dirname + '/' + title, function(err){
			if(err){
				throw err;
			}
		});
	});
	// req.pipe(fs.createWriteStream(__dirname+'/test2.jpg'));
	// console.log(req.data);
	// fs.writeFile(__dirname+'/test3.jpg', req.data, function(){

	// });
	// console.log(req.body);
	// var body = '';
	// var filepath = __dirname + '/test.jpg';
	// req.on('data', function(data){
		
	// });
	// req.on('end', function(){
	// 	fs.writeFile(filepath, body, function(){
	// 		res.end();
	// 	});
	// });
});

//	Initiate the app.
app.listen(port, ip);

console.log('Current App name: ' + 'Bismuth');
console.log('Listening to port ' + port);

