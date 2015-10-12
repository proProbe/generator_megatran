var tavlorController = angular.module('tavlorController', []);

tavlorController.controller('tavlorController', ['$scope', '$http', function($scope, $http){
	$scope.imgs = [];
	$http({
		method:'GET',
		url:'/img/tavlor'
	})
	.success(function(imgs){
		$scope.imgs = imgs;
	})
	.error(function(err){
		console.log(err);
	});
}]);