'use strict';
//	Require the necessary packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var formidable = require('formidable');
var mongoose = require('mongoose');

var im = require('imagemagick');
var morgan = require('morgan');
var config = require('./config/config.js')();
var jwt    = require('jsonwebtoken');


//	Set all the middleware.
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('superSecret', config.secret);


var port = config.port;
var ip = config.ip;

var db = config.db;
mongoose.connect(db, function(err){

	if(err){
		console.log('mongodb connection error', err);
	}else{
		console.log('mongodb connection successful!');
		// var User = require('./models/user.model.js')(mongoose);
		// var ida = new User({
		// 	user:'kiraii',
		// 	password:'bismuth',
		// 	admin:true
		// });
		// ida.save(function(err){
		// 	if(err) return console.log(err);
		// 	return console.log('saved ida');

		// })
}
});


var imgModel = require('./models/img.model.js')(mongoose);
var __dir = __dirname;

if(process.env.OPENSHIFT_DATA_DIR){
	__dir = process.env.OPENSHIFT_DATA_DIR;
}

//	Send static files when requested
app.use('/', express.static(__dirname + '/public'));


var User = require('./models/user.model.js')(mongoose);




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

var saveImg = function(tp, np, fp, img){
	if(!fs.existsSync(fp)){
		fs.mkdirSync(fp);
	}

	if(!fs.existsSync(fp + '/' + img.category)){
		fs.mkdirSync(fp + '/' + img.category);
	}

	fs.rename(tp, np, function(err){
		if(err){
			throw err;
		}
		console.log('saved img');
	});
};

var imgToThumbnail = function(w, h, sp, dp){
	im.resize({
		srcPath: sp,
		dstPath: dp,
		width: w,
		height: h,
	}, function(err){
		if(err){
			throw err;
		}
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

		img.save(function(err){
			if(err){
				return res.status(500).send({message:err});
			}
			res.status(200).send({message:"Saved image"});
		});
	});

});

app.get('/authenticate', function(req, res){
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
  	// decode token
  	if (token) {
    	// verifies secret and checks exp
    	jwt.verify(token, app.get('superSecret'), function(err, decoded) {
    		if (err) {
    			return res.json({ success: false, message: 'Failed to authenticate token.' });
    		} else {
        	// if everything is good, save to request for use in other routes
        	req.decoded = decoded;
        	return res.status(200).send({success:true, message:'Token ok'});
        }
    });
    } else {
	    // if there is no token
	    // return an error
	    return res.status(403).send({
	    	success: false,
	    	message: 'No token provided.'
	    });
	}
});

app.post('/authenticate', function(req, res){
	var user = req.body;
	console.log(user);
	// var form = new formidable.IncomingForm();
	// console.log(form);
	// form.parse(req, function(err, fields){
		User.findOne({user:user.user}, function(err, user){
			if(err) return res.status(500).json({message:err});
			if(!user){
				return res.status(401).json({message:'no such user exists.'});
			}else if(user){
				if (user.password !== user.password){
					res.status(401).json({message:'incorrect password!'});
				}else{
					var token = jwt.sign(user, app.get('superSecret'),{
						expiresInMinutes: 1440 //24h
					});

					res.status(200).json({success:true, message:"here is your token", token:token});
				}
			}
		});
	// });
});


//	Initiate the app.
app.listen(port, ip);

process.on('SIGINT', function() {
	console.log('\nClosed app');
	mongoose.connection.close(function(){
		console.log('Closed connection to mongodb');
	});
	process.exit(0);
});

console.log('Current App name: ' + 'Bismuth');
console.log('Listening to port ' + port);

