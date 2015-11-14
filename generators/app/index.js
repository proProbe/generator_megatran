'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');


module.exports = yeoman.generators.Base.extend({
	promptUserDialog: function() {
		var done = this.async();

		this.log(yosay(
			'Welcome to the megatran generator!'
			));

		var prompts = [{
			name: 'appName',
			message: 'What is your app\'s name ?',
			default: 'App'
		},{
			name: 'appDescription',
			message: 'App description:',
			default: 'No description'
		}];

		this.prompt(prompts, function (props) {
			this.appName = props.appName;
			this.appDescription = props.appDescription;
			done();
		}.bind(this));
	},

	scaffoldFolders: function(){
		this.mkdir("public");
		this.mkdir("public/libs");
		this.mkdir("public/css");
		this.mkdir("public/views");
		this.mkdir("public/controllers");
		this.mkdir("public/directives");
		this.mkdir("public/assets");
		this.mkdir("public/templates");
		this.mkdir("config");
		this.mkdir("tests");
		this.mkdir("models");
	},

	copyNeededFiles: function(){
		var context = {
			site_name: this.appName,
			site_description: this.appDescription
		};

		this.copy("_bowerrc", ".bowerrc");
		this.copy("_gulpfile.js", "gulpfile.js");
		this.copy("_config.js", "config/config.js");
		this.template("_bower.json", "bower.json", context);
		this.template("_server.js", "server.js", context);
		this.template("_package.json", "package.json", context);
		this.template("_index.html", "public/index.html", context);
		this.template("angular/_app.js", "public/app.js", context);
	},

	end: function(){
		this.bowerInstall();
		this.npmInstall();
	}

});
