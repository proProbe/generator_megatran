// var jquery = require("./libs/jquery/dist/jquery.js");
const angular = require("angular");
var ngModule = angular.module('App', ['ngRoute','satellizer']);

var routes =require('./app.config.js')(ngModule);

// require all angular modules
require("angular-route");
require("./libs/satellizer/satellizer.js");

// require all controllers
require("./controllers/main.controller.js")(ngModule);
// require("./controllers/home.controller.js")(ngModule, 'homeController');
// require("./controllers/blommor.controller.js")(ngModule);
// require("./controllers/tavlor.controller.js")(ngModule);
// require("./controllers/vaskor.controller.js")(ngModule);
// require("./controllers/resor.controller.js")(ngModule);
// require("./controllers/admin.controller.js")(ngModule);
// require("./controllers/login.controller.js")(ngModule);


// require all directives
// require("./directives/bootstrapFileField.js");
// require("./directives/imgField.js");


// require all other libs
// require("./libs/lightbox2/dist/js/lightbox.min.js");
// require("./libs/masonry.js");
// require("./libs/bootstrap/dist/js/bootstrap.min.js");
// require("./libs/imagesloaded.js");

// require init lib
// require("./init.js");
// require("./app.js");