
var mongo = require('mongodb');
var client = mongo.MongoClient;
var _db;

var insert = function(doc){
  _db.collection("inspections").save(doc);
};

var clearDB = function(){
  _db.collection("inspections").drop();
  console.log("clear successfully");
};

var connect = function() {
  client.connect('mongodb://localhost:27017/testing', function(err, db){
    if (err) {
      console.log("Error connecting to Mongo - check mongod connection");
      process.exit(1); // exit node when fail to conne
    }
    _db = db;
    console.log("Connected to database");
  });
};

var inspections = function(){
  var inspections = _db.collection("inspections").find().toArray(function(err, docs){
    console.log(JSON.stringify(docs));
  });
  return inspections;
};

exports.connect = connect;
exports.inspections = inspections;
exports.insert = insert;
exports.clearDB = clearDB;
