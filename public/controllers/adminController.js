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
}]);