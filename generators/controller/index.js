'use strict';
// var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var SectionGenerator = yeoman.generators.Base.extend({
  promptUserDialog: function() {
    var done = this.async();

    this.log(yosay(
      'Welcome to the controller generator!'
      ));

    var prompts = [{
      name: 'ctrlName',
      message: 'What is your controller\'s name ?',
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
        var srcString = '<script src="controllers/' + context.ctrl_name + '.js"></script>'
        var re = new RegExp('<!-- Placeholder:NewSrc -->', 'g');
        var newContent = content.toString().replace(re, srcString + '\n\t<!-- Placeholder:NewSrc -->');
        return newContent;
      }
    });
    this.fs.copy('public/app.js', 'public/app.js', {
      process: function(content){
        var moduleString = "'"+context.ctrl_name + "',";
        var re = new RegExp('//Placeholder:NewModule', 'g');
        var newContent = content.toString().replace(re, moduleString + '\n\t//Placeholder:NewModule');
        return newContent;
      }
    });
  },

});

module.exports = SectionGenerator;