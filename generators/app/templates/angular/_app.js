var app = angular.module('App',[
	'ngRoute',
	//Placeholder:NewModule
	]);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	//Placeholder:NewRoute
	.otherwise({redirectTo: '/'});
}]);

app.controller('MainController', [function(){
	var main = this;
	main.description = "Welcome to the app: <%= site_name %>";
}]);