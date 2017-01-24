require('dotenv').config({path: '../.env'});

var request = require('requestretry');
var url = require('url');

var express = require('express');
var app = express();

var mongoUtil = require('./server/mongoUtil');
app.use(express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
mongoUtil.connect();

// helper function: create a separate query based on business ID to avoid closures in JavaScript
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
        // console.log(JSON.stringify(data));
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
  // create a clean function in mongoUtil to clean current collection;
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

// how to refresh:
// connect to the database pathway: mongod --dbpath /Users/kelly/Desktop/Ada_C6/Capstone/capstone-database/
// [initandlisten]: waiting for connections on port 27017
// open another terminal tab: $ mongo
// drop the current database: db.inspections.drop();
// check successful deletion: show dbs;
// launch: $ node app.js
// open another tab: $ curl -i localhost:8080/refresh
// look at node window: connected to database
// use database (specified in 'connect'): use testing --> switched to db testing
// check new data inserted into db: db.inspections.find().pretty();

// this route is to load data from db
app.get('/search', function(req, response){
  // need this to allow cross-origin HTTP request
  // in this case, the request comes from angular app
  // from a different port
  response.header("Access-Control-Allow-Origin", "*");

  console.log("request made for DB query");
  // pass the request url parameters to mongoUtil search
  // and define a callback function to handle results
  mongoUtil.search(req.query, function(err, results){
    if (err){
      console.log(err);
      return response(err);
    }

    // log the results and put them in json response
    // console.log(results);
    return response.json(results);
  });
});

app.get('/', function(req, response){
  response.sendFile('./client/index.html');
});

app.listen(process.env.PORT, function() {console.log("Listening on " + process.env.PORT );});
