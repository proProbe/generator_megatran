'use strict';
// var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var ast = require('ast-query');
var cheerio = require('cheerio');

var SectionGenerator = yeoman.generators.Base.extend({
	promptUserDialog: function() {
		var done = this.async();

		this.log(yosay(
			'Welcome to the controller generator!'
			));

		var prompts = [{
			name: 'ctrlName',
			message: 'What is your controller\'s name?',
			default: 'testController'
		}];

		this.prompt(prompts, function (props) {
			this.ctrlName = props.ctrlName;
			done();
		}.bind(this));
	},
	copyNeededFiles: function(){
		var context = {
			ctrl_name: this.ctrlName
		};

		this.template('_ctrl.js', "public/controllers/" + this.ctrlName + '.js', context);
	},

	addToNeededFiles: function(){
		var context = {
			ctrl_name: this.ctrlName
		};
		this.fs.copy('public/index.html', 'public/index.html', {
			process: function(content){
				var srcString = '<script src="controllers/' + context.ctrl_name + '.js"></script>';
				var $ = cheerio.load(content);
				$('body').append('\t' + srcString + '\n\t');
				return $.html();
				// var re = new RegExp('((?:<script src=.+[\\t\\n\\s]*)+)');
				// var newContent = content.toString().replace(re, "$1"+ srcString + "\n\t");
				// return newContent;
			}
		});
		this.fs.copy('public/app.js', 'public/app.js', {
			process: function(content){
				var moduleString = context.ctrl_name;
				var tree = ast(content);
				tree.callExpression('angular.module').
				nodes[0].arguments[1].elements.push({
					value: moduleString,
					raw:'\'' + moduleString + '\'',
					type: 'Literal'
				});
				return tree.toString();
				// var re = new RegExp('(angular.module[(][\'\\w]+,[\[\t\n]*)([\'\\w\t\n\.,]*\')([\n\t]*\\]\\);)');
				// var newContent = content.toString().replace(re, '$1' + '$2,' + moduleString + '$3');
				// return newContent;
			}
		});
	},

});

module.exports = SectionGenerator;