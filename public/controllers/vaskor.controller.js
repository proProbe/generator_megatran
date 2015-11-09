module.exports = function(ngModule){
	ngModule.controller('vaskorController', ['$scope', '$http', function($scope, $http){
		$scope.imgs = [];
		console.log('got the controller');
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
};
