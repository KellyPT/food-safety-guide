require('dotenv').config({path: '../.env'});

var mongo = require('mongodb');
var client = mongo.MongoClient;
var _db;

var insert = function(doc){
  _db.collection("inspections").save(doc);
};

var clearDB = function(){
  _db.collection("inspections").drop();
  console.log("Cleaned old data successfully");
};

var search = function(paramSet, callback){
  var inspections = _db.collection("inspections");

  // hard-coded query parameters
  // keep this for debugging purpose
  // var query = {
  //   violation_points: {$gt: "0"},
  //   zip_code: "98105",
  //   description: /Profit/
  // };

  // dynamically generate the query options
  // from url query parameter set
  var query = {};
  if (paramSet.zipcode)
  {
    query.zip_code = paramSet.zipcode;
  }

  if (paramSet.safeChoice)
  {
    // if safeChoice is selected as safe
    // violation_points must be 0,
    // if it is unsafe, violation_points must > 0
    if (paramSet.safeChoice == "safe")
    {
      query.violation_points = "0";
    }
    else if (paramSet.safeChoice == "unsafe") {
      query.violation_points = {$gt: "0"};
    }
  }

  // regular expression is needed for businessType
  // in order to forge a LIKE filter condition on description field
  if (paramSet.businessType)
  {
    query.description = new RegExp(paramSet.businessType);
  }

  // execute the query in inspections collection
  // then convert the results to an array
  // and call the provided callback function
  inspections.find(query).toArray(callback);
};

var connect = function() {
  // client.connect('mongodb://localhost:27017/testing', function(err, db){
  client.connect('mongodb://' + process.env.MONGOD_USERNAME + ':' + process.env.MONGOD_PASSWORD + '@' + process.env.HOST_NAME + ':' + process.env.PORT + '/' + process.env.DB_NAME, function(err, db){
    if (err) {
      console.log("Error connecting to Mongo - check mongod connection");
      process.exit(1); // exit node when fail to connect
    }
    _db = db;
    console.log("Connected to database");
  });
};

exports.connect = connect;
exports.insert = insert;
exports.clearDB = clearDB;
exports.search = search;
