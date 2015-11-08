'use strict';
var app = angular.module('App',[
	'ngRoute',
	'satellizer',
	'homeController',
	'blommorController',
	'tavlorController',
	'vaskorController',
	'resorController',
	'adminController',
	'bootstrap.fileField',
	'img.field',
	'loginController',
	//Placeholder:NewModule
	]);

app.config(['$routeProvider', '$authProvider', function($routeProvider, $authProvider){
	$routeProvider

	.when('/', {
		templateUrl:'views/home.view.html',
		controller:'homeController'
	})
	.when('/blommor', {
		templateUrl:'views/blommor.view.html',
		controller:'blommorController'
	})

	.when('/tavlor', {
		templateUrl:'views/tavlor.view.html',
		controller:'tavlorController'
	})
	.when('/vaskor', {
		templateUrl:'views/vaskor.view.html',
		controller:'vaskorController'
	})
	.when('/resor', {
		templateUrl:'views/resor.view.html',
		controller:'resorController'
	})
	.when('/admin', {
		templateUrl:'views/admin.view.html',
		controller:'adminController',
	})
	.when('/login', {
		templateUrl:'views/login.view.html',
		controller:'loginController'
	})
	//Placeholder:NewRoute
	.otherwise({redirectTo: '/'});
	$authProvider.loginUrl = '/authenticate';
}]);

app.controller('MainController', ['$location', function($location){
	var main = this;
	main.description = 'Welcome to the app: Bismuth';
	main.isActive = function(route){
		return route===$location.url();
	};
}]);