module.exports = function(ngModule){
	ngModule.controller('blommorController', ['$scope', '$http', function($scope, $http){
		$scope.imgs = [];
		$http({
			method:'GET',
			url:'/img/blommor'
		})
		.success(function(imgs){
			$scope.imgs = imgs;
		})
		.error(function(err){
			console.log(err);
		});
	}]);
}

// var blommorController = angular.module('blommorController', []);

// blommorController.controller('blommorController', ['$scope', '$http', function($scope, $http){
// 	$scope.imgs = [];
// 	$http({
// 		method:'GET',
// 		url:'/img/blommor'
// 	})
// 	.success(function(imgs){
// 		$scope.imgs = imgs;
// 	})
// 	.error(function(err){
// 		console.log(err);
// 	});
// }]);