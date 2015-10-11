'use strict';
//	Require the necessary packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


//	Set all the middleware.
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//	Set port to 3000 if no port is specified.
var port = process.env.OPENSHIFT_NODEJS_PORT||process.env.PORT||3000;


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


//	Initiate the app.
app.listen(port);

console.log('Current App name: ' + 'Bismuth');
console.log('Listening to port ' + port);

