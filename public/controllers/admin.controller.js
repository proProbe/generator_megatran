module.exports = function(ngModule){
	ngModule.controller('adminController', ['$scope', '$window', '$location','$http', '$timeout', function($scope, $window, $location,$http, $timeout){
		$scope.user = {};
		$scope.correct = true;
		$scope.form = {};
		$http({
			method:'GET',
			url:'/authenticate',
			headers:{'x-access-token':$window.localStorage.satellizer_token}
		}).success(function(res){
			console.log(res.status);
			if(res.status === 403){
				return $location.path("/login");
			}
		}).error(function(err){
			delete $window.localStorage.satellizer_token;
			return $location.path("/login");
		});

		var resetForm = function(){
			$timeout(function(){
				$scope.message = "";
				$scope.form = {};
				$scope.previewImg = "";
				$scope.uploading = false;
			},2000);
		};

		$scope.sendForm = function(){
			var fd = new FormData();
			fd.append("file", $scope.form.uploadFile);
			fd.append("title", $scope.form.title);
			fd.append("category", $scope.form.category);
			fd.append("description", $scope.form.description);
			$scope.uploading = true;
			$http.post('/upload', fd, {
				headers : {
					'Content-Type' : undefined
				},
				transformRequest : angular.identity
			})
			.success(function(res){
				$scope.form.msg = res;
				$scope.form.status = "alert-success";
				resetForm();
			})
			.error(function(err){
				$scope.form.msg = err;
				$scope.form.status = "alert-warning";
				resetForm();
			});
		};

		$scope.getImgs = function(){
			$http.get('/imgs')
			.success(function(imgs){
				$scope.imgMsg = "Got all the pictures";
				$scope.imgStatus = "alert-success";
				$scope.imgs = imgs;
			})
			.error(function(err){
				$scope.imgMsg = err;
				$scope.imgStatus = "alert-error";
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

		$scope.logout = function logout(){
			delete $window.localStorage.satellizer_token;
			return $location.path("/login");
		};
	}]);
};
