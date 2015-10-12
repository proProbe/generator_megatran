var adminController = angular.module('adminController', []);

adminController.controller('adminController', ['$scope', '$http', function($scope, $http){
	$scope.user = {};
	$scope.success = false;
	$scope.logIn = function(){
		if ($scope.user.id === "ida" && $scope.user.pwd === "bismuth") {
			$scope.success = true;
		}else{
			$scope.success = false;
		}
	};
	$scope.uploadFile = function(){
		$(function(){
			var files = $('#upload').get(0).files[0];
			console.log(files);
			$http(
				{
					method:'POST',
					url:"/img",
					headers:{
						'Content-Type': 'multipart/form-data'
					},
					data:files
				}
			);
		});
	};
}]);