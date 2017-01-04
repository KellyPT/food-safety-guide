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

// 2. Create a Server and event
// var http = require('http');
// var server = http.createServer();
//
// server.on('request', function(request, response) {
//   response.writeHead(200);
//   response.write("Hello, this is dog");
//   response.end();
// });
//
// server.on('request', function(request,response){
//   console.log("Hello from the other side");
// });

// will only be called if there is a 'close' event on the server
// server.on('close', function(){
//   console.log("Closing down the server...");
// });
//
// server.listen(8080);

// 3. Streams

// Create an echo server
var http = require('http');
http.createServer(function(request, response){
  response.writeHead(200);
  request.pipe(response);
}).listen(8080);
// type curl -d "hello" http://localhost:8080 in the terminal to see the echo
// this method is good when processing API (Which can be unstable)
