var express = require('express');
var app = express();
var mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.get('/', function(req, response){
  var userCollection = mongoUtil.userCollection();
  // userCollection.find().toArray(function(err, docs){
  //   console.log(JSON.stringify(docs));
  // });

  // options = {
  //   protocol: "https:",
  //   host: "data.kingcounty.gov",
  //   pathname: "/resource/gkhn-e8mn.json",
  //   search: "city=Seattle&$limit=100"
  // };
  //
  // var dataURL = url.format(options);
  // console.log(dataURL);

  // request(dataURL, function(err, res, body){
  //   var results = JSON.parse(body);
  //   response.locals = {results: results};
  //   response.render('test.ejs');
  // });
});

app.listen(8080, function() {console.log("Listening on 8080");});
