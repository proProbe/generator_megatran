'use strict';
var app = angular.module('App',[
	'ngRoute'
	]);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.otherwise({redirectTo: '/'});
}]);

app.controller('MainController', [function(){
	var main = this;
	main.description = "Welcome to the app: <%= site_name %>";
}]);