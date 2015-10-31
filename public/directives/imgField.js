angular.module('img.field',[])
.directive('imgField', function() {
  return {
    restrict: 'E',
    scope:{
        imgs: '=imgs'
    },
    templateUrl:'directives/imgField.html',
  };
});