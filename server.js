'use strict';
//	Require the necessary packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var formidable = require('formidable');
var mongoose = require('mongoose');
// var util = require('util');

//	Set all the middleware.
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//	Set port to 3000 if no port is specified.
var port = process.env.OPENSHIFT_NODEJS_PORT||process.env.PORT||3000;
var ip = process.env.OPENSHIFT_NODEJS_IP||"127.0.0.1";

var connection_string = 'mongodb://127.0.0.1:27017/bismuth';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
	connection_string = 'mongodb://'+ process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
	process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
	process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
	process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
	process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect(connection_string, function(err){
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

app.get('/imgs/:category/:file', function(req, res){
	res.sendFile(fileFolder + '/imgs/'+req.params.category+'/'+req.params.file );
});

app.get('/imgs', function(req, res){
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

app.delete('/delete/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	// res.send({message:"ok"});
	imgModel.findOne({_id:id}, function(err, img){
		if(err){
			return res.status(500).send({message:err});
		}else if(!img){
			return res.status(404).send({message:"no img"});
		}
		else{
			var path = img.path;
			img.remove(function(err){
				if(err){
					return res.status(500).send({message:"img remove", err:err});
				}
				fs.unlink(fileFolder + path, function(err){
					if(err){
						return res.status(500).send({message:"unlink", err:err});
					}
					return res.status(200).send({message:'deleted img'});
				});
			});
		}
	});
});

// app.delete('/delete')

app.post('/upload', function(req, res){
	var form = new formidable.IncomingForm({
		uploadDir: fileFolder
	});

	var tempPath;
	var title;
	var category;

	form.parse(req, function(err, fields, files){
		try{
			tempPath = files.file.path;
			title = fields.title;
			category = fields.category;
			form.name = title;
		}catch(e){
			return res.status(500).send({message:"error!!"});
		}
	});
	form.on('end', function(){
		try{

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
					// return res.status(500).send({message:err});
					throw err;
				}
			});
		}catch(e){
			return res.status(500).send({message:"error!!"});
		}
		var img = new imgModel({
			category:category,
			title:title,
			path: '/imgs/' + category + '/' + title,
			description:"Test pictures"
		});
		img.save(function(err, img){
			if(err){
				return res.status(500).send({message:err});
			}
			res.status(200).send({message:"Saved image"});
		});
	});

});

//	Initiate the app.
app.listen(port, ip);

console.log('Current App name: ' + 'Bismuth');
console.log('Listening to port ' + port);

