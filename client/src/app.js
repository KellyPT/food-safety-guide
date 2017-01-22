var app = angular.module('foodsafety', ['scrollable-table']);

app.controller('FilterController', ['$scope', '$http', '$window', function($scope, $http, $window){
  $scope.condition = {
    safeChoice: '',
    businessType: '',
    zipcode: '',
  };

  $scope.redirectToBing = function(name){
    $window.open('https://www.bing.com/search?q=' + name, '_blank');
  };

  $scope.violationComparator = function(v1, v2){
      // console.log(v1);

      if (v1.violation_points === null){
        return -1;
      }

      if (v2.violation_points === null){
        return 1;
      }

      return (parseInt(v1.violation_points) < parseInt(v2.violation_points) ? -1 : 1);
  };

  $scope.formatDate = function (datetimeString){
    var d = new Date(datetimeString);
    return d.toDateString();
  };

  $scope.dbUrl = 'http://localhost:8080/search';
  $scope.data = [];
  $scope.reset = function(){
    $scope.condition.safeChoice = '';
    $scope.condition.businessType = '';
    $scope.condition.zipcode = '';
  };

  $scope.$watch('condition', function onConditionChange(newValue, oldValue, scope){
    console.log("condition: ", newValue.zipcode);
    var params = '';
    if (newValue.safeChoice)
    {
      params += "&safeChoice=" + newValue.safeChoice;
    }

    if (newValue.businessType)
    {
      params += "&businessType=" + newValue.businessType;
    }

    if (newValue.zipcode)
    {
      params += "&zipcode=" + newValue.zipcode;
    }

    var url = "http://localhost:8080/search";
    if (params.length > 0)
    {
      url += "?" + params.slice(1);
    }

    $scope.dbUrl = url;
  }, true);

  $scope.$watch('dbUrl', function onDbUrlChange(newValue, oldValue){
    $http.get($scope.dbUrl).then(function success(response){
      $scope.data = response.data;
      console.log("Finished loading data");
    }, function error(response){
      $scope.data = [];
      console.log("Error in making DB call at " + $scope.dbUrl);
    });
  }, true);
}]);
