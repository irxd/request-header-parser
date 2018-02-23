// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", function (request, response) {
  // response.send(request.headers);
  var header = request.headers;
  var ipAddress = header["x-forwarded-for"];
  var language = header["accept-language"];
  var software = header["user-agent"];
  
  function getIpAddress (ipAddress) {
    var splitted = ipAddress.split(",");
    return splitted[0];
  }
  
  function getLanguage (language) {
    var splitted = language.split(",");
    return splitted[0];
  }
  
  function getSoftware (software) {
    var splitted = software.match(/[^()]+/g)
    return splitted[1];
  }
  
  response.send({
    "ipaddress": getIpAddress(ipAddress),
    "language": getLanguage(language),
    "software": getSoftware(software)
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
