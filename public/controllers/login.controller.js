module.exports = function(ngModule){
	ngModule.controller('loginController', ['$scope', '$window', '$location', '$http', '$auth', function($scope, $window, $location, $http, $auth){
		$scope.user = {};
		$http({
			method:'GET',
			url:'/authenticate',
			headers:{'x-access-token':$window.localStorage.satellizer_token}
		}).success(function(res){
			if(res.success){
				return $location.path("/admin");
			}
		});
		$scope.logIn = function(){
			console.log('clicked login');
			$auth.login($scope.user)
			.then(function(response){
				console.log(response);
				return $location.path("/admin");
			}, function(error){
				console.log(error);
			});
		};
	}]);
};
