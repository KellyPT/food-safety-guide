var request = require('request');
var url = require('url');

var express = require('express');
var app = express();

app.get('/', function(req,response){
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
    response.locals = { apiName: apiName, apiID: apiID  };
    response.render('test.ejs');
  });
}).listen(8080);
