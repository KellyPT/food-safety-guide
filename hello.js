// non-blocking events

// var http = require('http');
// var fs = require('fs');
//potentially can be used to call my API file.

// http.createServer(function(request, response) {
//   response.writeHead(200);
//   response.write("hello world!");
//   response.end();
  // fs.readFile("index.html", function(error,contents){
  //   response.write(contents);
  //   response.end();
  // });

// }).listen(8080);
// listen with $curl http://localhost:8080

// Create a Server and event
var http = require('http');
var server = http.createServer();

server.on('request', function(request, response) {
  response.writeHead(200);
  response.write("Hello, this is dog");
  response.end();
});

server.on('request', function(request,response){
  console.log("Hello from the other side");
});

server.listen(8080);
