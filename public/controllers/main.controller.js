module.exports = function(ngModule){
	ngModule.controller('mainController', ['$location', function($location){
		var main = this;
		main.description = 'Welcome to the app: Bismuth';
		main.isActive = function(route){
			return route===$location.url();
		};
	}]);
};