var request = require('request');
var url = require('url');

var express = require('express');
var app = express();

var mongoUtil = require('./mongoUtil');
mongoUtil.connect();

// create a separate query based on business ID to avoid closures in JavaScript
var requestByID = function(id) {
  bizOptions = {
    protocol: "https:",
    host: "data.kingcounty.gov",
    pathname: "/resource/gkhn-e8mn.json",
    search: "business_id=" + id + "&$order=inspection_date DESC&$limit=1"
  };

  var bizDataUrl = url.format(bizOptions);

  request(bizDataUrl, function(bErr, bRes, bBody){
    if (bErr) {
      console.log("Failed bv eto load data for business " + id + " from API");
    } else {
      var data = JSON.parse(bBody);
      if (data && data.length > 0){
        console.log(JSON.stringify(data));
        mongoUtil.insert(data[0]);
        console.log("Inserted data for business " + id);
      } else {
        console.log("Empty result for business " + id + " from API");
      }
    }
  });
};

// this route is to refresh API call and db migration
app.get('/refresh', function(req, response){

  options = {
    protocol: "https:",
    host: "data.kingcounty.gov",
    pathname: "/resource/gkhn-e8mn.json",
    search: "$query=SELECT business_id, inspection_date WHERE city IN ('Seattle', 'SEATTLE') |> SELECT business_id, MAX(inspection_date) AS latest GROUP BY business_id LIMIT 20"
  };

  var dataURL = url.format(options);
  console.log(dataURL);

  request(dataURL, function(err, res, body){
    if (err) {
      console.log("Failed to load business IDs from API");
      process.exit(1);
    }
    var results = JSON.parse(body);
    for (var i = 0; i < results.length; i++) {
      console.log(i);
      var id = results[i].business_id;
      requestByID(id);
    }
  });
});

// this route is to load data from db
app.get('/', function(req, response){
  var inspections = mongoUtil.inspections();
});

// var dataURL = url.format(options);
//
// request(dataURL, function(err, res, body){
//   var results = JSON.parse(body);
//   response.locals = {results: results};
//   response.render('test.ejs');
// });


app.listen(8080, function() {console.log("Listening on 8080");});
