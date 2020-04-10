var express = require('express');
var app = express();
var path = require('path');
var https = require('https')
const fs = require('fs');

app.use( express.static( __dirname + '/' ));

app
  .get( '/', function( req, res ) {
    res.sendFile( path.join( __dirname, 'index.html' ));
  });

  https.createServer({
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem')
  }, app)
  .listen(3000, function () {
    console.log('Example app listening on port 3000! Go to https://localhost:3000/')
  })