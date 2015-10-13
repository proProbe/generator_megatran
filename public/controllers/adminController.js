var adminController = angular.module('adminController', []);

adminController.controller('adminController', ['$scope', '$http', function($scope, $http){
	$scope.user = {};
	$scope.success = true;
	$scope.correct = true;
	$scope.form = {};
	$scope.logIn = function(){
		if ($scope.user.id === "ida" && $scope.user.pwd === "bismuth") {
			$scope.success = true;
		}else{
			$scope.success = false;
			$scope.correct = false;
		}
	};

	$scope.sendForm = function(){
		var fd = new FormData();
		fd.append("file", $scope.form.uploadFile);
		fd.append("title", $scope.form.title);
		fd.append("category", $scope.form.category);
		$http.post('/upload', fd, {
			headers : {
				'Content-Type' : undefined
			},
			transformRequest : angular.identity
		})
		.success(function(res){
			$scope.message = res;
		})
		.error(function(err){
			$scope.message = err;
		});
	};

	$scope.getImgs = function(){
		$http.get('/imgs')
		.success(function(imgs){
			$scope.imgs = imgs;
		})
		.error(function(err){
			console.log("error in getImgs:" + err);
		});
	};

	$scope.deleteImg = function(img){
		var req = {
			method:"DELETE",
			url:"/delete/" + img._id,
			data:img
		};
		console.log(img);
		$http(req)
		.success(function(response){
			console.log(response);
			$scope.getImgs();
		})
		.error(function(err){
			console.log(err);
		});
	};
}]);