require('dotenv').config({path: '../.env'});

var request = require('requestretry');
var url = require('url');

var express = require('express');
var app = express();

var mongoUtil = require('./server/mongoUtil');
app.use(express.static(__dirname + '/client'));

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/map', express.static(__dirname + '/client/src/map'));
mongoUtil.connect();

var requestByID = function(id) {
  bizOptions = {
    protocol: "https:",
    host: "data.kingcounty.gov",
    pathname: "/resource/gkhn-e8mn.json",
    search: "business_id=" + id + "&$order=inspection_date DESC, violation_points DESC&$limit=1&$$app_token=" + process.env.APP_TOKEN
  };

  var bizDataUrl = url.format(bizOptions);
  request(bizDataUrl, function(bErr, bRes, bBody){
    if (bErr) {
      console.log("Failed to load data for business " + id + " from API");
    } else {
      var data = JSON.parse(bBody);
      if (data && data.length > 0){
        mongoUtil.insert(data[0]);
        console.log("Inserted data for business " + id);
      } else {
        console.log("Empty result for business " + id + " from API");
      }
    }
  });
};

app.get('/refresh', function(req, response){
  mongoUtil.clearDB();

  options = {
    protocol: "https:",
    host: "data.kingcounty.gov",
    pathname: "/resource/gkhn-e8mn.json",
    search: "$query=SELECT business_id WHERE city IN ('Seattle', 'SEATTLE') AND inspection_date IS NOT NULL AND inspection_date >= '2016-06-01'|> SELECT business_id GROUP BY business_id LIMIT 10000&$$app_token=" + process.env.APP_TOKEN
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

      var id = results[i].business_id;

      requestByID(id);
      console.log(i);
    }
  });

  console.log("Loaded all data from API");
});


app.get('/search', function(req, response){
  response.header("Access-Control-Allow-Origin", "*");

  console.log("request made for DB query");

  mongoUtil.search(req.query, function(err, results){
    if (err){
      console.log(err);
      return response(err);
    }

    return response.json(results);
  });
});

app.get('/', function(req, response){
  response.sendFile('./client/index.html');
});

app.listen(process.env.PORT, function() {console.log("Listening on " + process.env.PORT );});
