var app = angular.module('foodsafety', ['scrollable-table']);

app.controller('FilterController', ['$scope', '$http', function($scope, $http){
  $scope.condition = {
    safeChoice: '',
    businessType: '',
    zipcode: '',
  };

  $scope.sortType = 'name'; // set the default sort type
  $scope.sortReverse = false; // set the default sort order
  $scope.searchName = ''; // set the default search/filter term

  // $scope.customComparator = function(v1, v2){
  //   if ($scope.sortType == 'violation_points'){
  //     return (parseInt(v1.value) < parseInt(v2.value) ? -1 : 1);
  //   }
  //   else{
  //     return (v1.value < v2.value ? -1 : 1);
  //   }
  // };

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
