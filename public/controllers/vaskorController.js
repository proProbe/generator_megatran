var vaskorController = angular.module('vaskorController', []);

vaskorController.controller('vaskorController', ['$scope', '$http', function($scope, $http){
	$scope.imgs = [];
	$http({
		method:'GET',
		url:'/img/vaskor'
	})
	.success(function(imgs){
		$scope.imgs = imgs;
	})
	.error(function(err){
		console.log(err);
	});
}]);