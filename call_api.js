var request = require('request');
var url = require('url');

var express = require('express');
var app = express();

app.get('/', function(req,res){
  options = {
    protocol: "https:",
    host: "data.kingcounty.gov",
    pathname: "/resource/gkhn-e8mn.json",
    data : {"$limit" : 1}
  };

  var dataURL = url.format(options);
  request(dataURL).pipe(res);
}).listen(8080);
