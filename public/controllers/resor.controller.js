module.exports = function(ngModule){
	ngModule.controller('resorController', ['$scope', '$http', function($scope, $http){
		$scope.imgs = [];
		$http({
			method:'GET',
			url:'/img/resor'
		})
		.success(function(imgs){
			$scope.imgs = imgs;
		})
		.error(function(err){
			console.log(err);
		});
	}]);
};
