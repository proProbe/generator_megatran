'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  promptUserDialog: function() {
    var done = this.async();

    this.log(yosay(
      'Welcome to the controller generator!'
      ));

    var prompts = [{
      name: 'viewName',
      message: 'What is your view\'s name ?',
      default: 'testView'
    }];

    this.prompt(prompts, function (props) {
      this.viewName = props.viewName;
      done();
    }.bind(this));
  },

  copyNeededFiles: function(){
    var context = {
      view_name: this.viewName
    };

    this.template('_view.html', "public/views/" + this.viewName + '.html', context);
  },
  addToNeededFiles: function(){
    var context = {
      view_name: this.viewName
    };
    this.fs.copy('public/app.js', 'public/app.js', {
      process: function(content){
        var pathString = [
          ".when('/path/" + context.view_name + "', {\r",
          "\t\ttemplateUrl:'views/" + context.view_name + ".html',\r",
          "\t\tcontroller:'insertController'\r",
          "\t})"
        ].join('');
        var re = new RegExp('//Placeholder:NewRoute', 'g');
        console.log(pathString);
        var newContent = content.toString().replace(re, pathString + '\n\t//Placeholder:NewRoute');
        return newContent;
      }
    });
  },
});
