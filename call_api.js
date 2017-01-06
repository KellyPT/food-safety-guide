var request = require('request');
var url = require('url');

var express = require('express');
var app = express();

app.get('/', function(req, response){
  options = {
    protocol: "https:",
    host: "data.kingcounty.gov",
    pathname: "/resource/gkhn-e8mn.json",
    data : {"$limit" : 1}
  };

  var dataURL = url.format(options);
  // request(dataURL).pipe(res);

  request(dataURL, function(err, res, body){
    var apiName = JSON.parse(body)[0].inspection_business_name;
    var apiID = JSON.parse(body)[0].business_id;
    var apiAddress = JSON.parse(body)[0].address;
    var apiCity = JSON.parse(body)[0].city;
    var apiZipCode = JSON.parse(body)[0].zip_code;
    var apiLongitude = JSON.parse(body)[0].longitude;
    var apiLatitude = JSON.parse(body)[0].latitude;
    var apiInspectionDate = JSON.parse(body)[0].inspection_date;
    var apiInspectionResult = JSON.parse(body)[0].inspection_result;
    var apiViolationType = JSON.parse(body)[0].violation_type;
    var apiViolationDescription = JSON.parse(body)[0].violation_description;
    response.locals = {
      apiName: apiName,
      apiID: apiID,
      apiAddress: apiAddress,
      apiCity: apiCity,
      apiZipCode: apiZipCode,
      apiLongitude: apiLongitude,
      apiLatitude: apiLatitude,
      apiInspectionDate: apiInspectionDate,
      apiInspectionResult: apiInspectionResult,
      apiViolationType: apiViolationType,
      apiViolationDescription: apiViolationDescription
    };
    response.render('test.ejs');
  });
}).listen(8080);
