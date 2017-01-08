var request = require('request');
var url = require('url');

var express = require('express');
var app = express();

app.get('/', function(req, response){
  options = {
    protocol: "https:",
    host: "data.kingcounty.gov",
    pathname: "/resource/gkhn-e8mn.json",
    search: "city=Seattle&$limit=100"
  };

  var dataURL = url.format(options);
  console.log(dataURL);
  // request(dataURL).pipe(res);

  request(dataURL, function(err, res, body){
    var results = JSON.parse(body);
    response.locals = {results: results};
    response.render('test.ejs');
  });
});

app.listen(8080, function() {console.log("Listening on 8080");});
