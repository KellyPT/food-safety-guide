
var mongo = require('mongodb');
var client = mongo.MongoClient;
var _db;

var connect = function() {
  client.connect('mongodb://localhost:27017/food-db-test', function(err, db){
    if (err) {
      console.log("Error connecting to Mongo - check mongod connection");
      process.exit(1); // exit node when fail to conne
    }
    _db = db;
    console.log("Connected to database");
  });
};

var userCollection = function(){
  var result = _db.collection("usercollection").find().toArray(function(err, docs){
    console.log(JSON.stringify(docs));
  });
  return result;
};

exports.connect = connect;
exports.userCollection = userCollection;
