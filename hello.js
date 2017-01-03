var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
  response.writeHead(200);
  response.write("hello world!");
  response.end();

}).listen(8080);
