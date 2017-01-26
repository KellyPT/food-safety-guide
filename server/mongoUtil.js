require('dotenv').config({path: '.env'});

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

  var query = {};
  if (paramSet.zipcode)
  {
    query.zip_code = paramSet.zipcode;
  }

  if (paramSet.safeChoice)
  {
    if (paramSet.safeChoice == "safe")
    {
      query.violation_points = "0";
    }
    else if (paramSet.safeChoice == "unsafe") {
      query.violation_points = {$gt: "0"};
    }
  }

  if (paramSet.businessType)
  {
    query.description = new RegExp(paramSet.businessType);
  }

  inspections.find(query).toArray(callback);
};

var connect = function() {
  var connectUrl = 'mongodb://' + process.env.MONGOD_USERNAME + ':' + process.env.MONGOD_PASSWORD + '@' + process.env.HOST_NAME + ':' + process.env.MONGOD_PORT + '/' + process.env.DB_NAME;

  client.connect(connectUrl, function(err, db){
    if (err) {
      console.log("Error connecting to Mongo - check mongod connection");
      process.exit(1); 
    }
    _db = db;
    console.log("Connected to database");
  });
};

exports.connect = connect;
exports.insert = insert;
exports.clearDB = clearDB;
exports.search = search;
