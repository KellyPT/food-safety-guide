var app = angular.module('foodsafety', []);

app.controller('FilterController', ['$scope', function($scope){
  $scope.condition = {
    safeChoice: '',
    type: '',
    zipcode: '',
  };
}]);
