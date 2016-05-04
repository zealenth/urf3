'use strict';

// simple express server
var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/urf3');

app.set('views', '/server/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.static('./app'));
app.get('/', function(req, res) {
  res.sendFile('index.html');
});



require('./server/routes')(app);

app.listen(5000);
exports = module.exports = app;
