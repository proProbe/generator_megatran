'use strict';
//	Require the necessary packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var formidable = require('formidable');
var mongoose = require('mongoose');
var im = require('imagemagick');


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


// Close the process when exiting the server.
// Processes like db connections should be closed here.
process.on('SIGINT', function() {
	console.log('\nClosed app');
	mongoose.connection.close(function(){
		console.log('Closed connection to mongodb');
	});
	process.exit(0);
});


var imgModel = require('./models/img.model.js');
var __dir = __dirname;
if(process.env.OPENSHIFT_DATA_DIR){
	__dir = process.env.OPENSHIFT_DATA_DIR;
}

//	Send static files when requested
app.use('/', express.static(__dirname + '/public'));

app.get('/imgs/:category/:file', function(req, res){
	res.sendFile(__dir + '/imgs/'+req.params.category+'/'+req.params.file );
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
				fs.unlink(__dir + path, function(err){
					if(err){
						return res.status(500).send({message:"unlink", err:err});
					}
					fs.unlink(__dir + path + '-thumbnail', function(err){
						if(err){
							return res.status(500).send({message:"unlink thumbnail", err:err});
						}
						return res.status(200).send({message:'deleted thumbnail and img'});
					});
					// return res.status(200).send({message:'deleted img'});
				});
			});
		}
	});
});

// app.delete('/delete')

var saveImg = function(tempPath, newPath, folderPath, img){
	if(!fs.existsSync(folderPath)){
		fs.mkdirSync(folderPath);
	}

	if(!fs.existsSync(folderPath + '/' + img.category)){
		fs.mkdirSync(folderPath + '/' + img.category);
	}

	fs.rename(tempPath, newPath, function(err){
		if(err){
			throw err;
		}
	});
};

var imgToThumbnail = function(w, h, sp, dp){
	im.resize({
		srcPath: sp,
		dstPath: dp,
		width: w,
		height: h,
	}, function(err){
		if(err){throw err;}
		console.log('resized it all');
	});
};

app.post('/upload', function(req, res){
	var form = new formidable.IncomingForm({
		uploadDir: __dir
	});
	var imgMeta = {};
	var tempPath;

	form.parse(req, function(err, fields, files){
		try{
			tempPath = files.file.path;
			imgMeta.title = fields.title;
			imgMeta.category = fields.category;
			imgMeta.description = fields.description;
			form.name = imgMeta.title;
		}catch(e){
			return res.status(500).send({message:"error!!"});
		}
	});

	form.on('end', function(){
		try{

			var newPath = __dir + '/imgs/' + imgMeta.category +  '/' + imgMeta.title;
			var imgFolder = __dir + '/imgs';

			saveImg(tempPath, newPath, imgFolder, imgMeta);
			imgToThumbnail(400, 200, newPath, newPath + '-thumbnail');

		}catch(e){
			return res.status(500).send({message:"error!!"});
		}

		var img = new imgModel({
			category:imgMeta.category,
			title:imgMeta.title,
			path: '/imgs/' + imgMeta.category + '/' + imgMeta.title,
			description:imgMeta.description
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

