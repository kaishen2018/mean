// server.js
var path = require('path');
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var myLogger = require('./utils/logger');

// import routers
var todo = require('./routes/todo');

// override with different headers; last one takes precedence
app.use(methodOverride('X-HTTP-Method'));          // Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override'));      // IBM

// configuration
// find static files
app.use(express.static(path.join(__dirname, '../public')));

// display a log of all requests on console.
// app.use(express.logger('dev'));
app.use(morgan('dev'));

// change html post method
// app.use(express.bodyParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());


// register routers
app.use('/api/todos', todo);

// start listening port
app.listen(8888, function () {
  myLogger.info('mean server is up and listening port : 8888');
});

exports.default = app;
