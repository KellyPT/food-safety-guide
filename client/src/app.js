var app = angular.module('foodsafety', []);

app.controller('FilterController', ['$scope', '$http', function($scope, $http){
  $scope.condition = {
    safeChoice: '',
    businessType: '',
    zipcode: '',
  };

  $scope.dbUrl = '/localhost:8080/search';
  $scope.data = [];

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

    var url = "/localhost:8080/search";
    if (params.length > 0)
    {
      url += "?" + params.slice(1);
    }

    $scope.dbUrl = url;
  }, true);

  // $scope.$watch('dbUrl', function onDbUrlChange(newValue, oldValue){
  //   $http.get($scope.dbUrl).success(function (data){
  //     $scope.data = data.ResponseData;
  //   });
  // });
}]);
