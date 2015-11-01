var adminController = angular.module('adminController', []);

adminController.controller('adminController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
	$scope.user = {};
	$scope.success = false;
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

	var resetForm = function(){
		$timeout(function(){
			$scope.message = "";
			$scope.form = {};
			$scope.previewImg = "";
		},1000);
	};

	$scope.sendForm = function(){
		var fd = new FormData();
		fd.append("file", $scope.form.uploadFile);
		fd.append("title", $scope.form.title);
		fd.append("category", $scope.form.category);
		fd.append("description", $scope.form.description);
		$http.post('/upload', fd, {
			headers : {
				'Content-Type' : undefined
			},
			transformRequest : angular.identity
		})
		.success(function(res){
			$scope.message = res;
			resetForm();
		})
		.error(function(err){
			$scope.message = err;
			resetForm();
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
			$scope.getImgs();
		})
		.error(function(err){
			console.log(err);
		});
	};
}]);