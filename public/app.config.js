module.exports = function(ngModule){
	ngModule.config(['$routeProvider', '$authProvider', function($routeProvider, $authProvider){
		$routeProvider
		.when('/', {
			template: require('./views/home.view.html'),
			controller: require("./controllers/home.controller.js")
			// controller: 'homeController'
		})
		.when('/blommor', {
			template: require('./views/blommor.view.html'),
			// controller: require('./controllers/blommor.controller.js')(ngModule)
			controller: 'blommorController'
		})

		.when('/tavlor', {
			template: require('./views/tavlor.view.html'),
			// controller: require('./controllers/tavlor.controller.js')(ngModule)
			controller: 'tavlorController'
		})
		.when('/vaskor', {
			template: require('./views/vaskor.view.html'),
			// controller: require('./controllers/vaskor.controller.js')(ngModule)
			controller: 'vaskorController'
		})
		.when('/resor', {
			template: require('./views/resor.view.html'),
			// controller: require('./controllers/resor.controller.js')(ngModule)
			controller: 'resorController'
		})
		.when('/admin', {
			template: require('./views/admin.view.html'),
			// controller: require('./controllers/admin.controller.js')(ngModule),
			controller: 'adminController'
		})
		.when('/login', {
			template: require('./views/login.view.html'),
			// controller: require('./controllers/login.controller.js')(ngModule)
			controller: 'loginController'
		})
	//Placeholder:NewRoute
		.otherwise({redirectTo: '/'});
		$authProvider.loginUrl = '/authenticate';
	}]);
};