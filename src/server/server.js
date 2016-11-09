// server.js
var path = require('path');
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var myLogger = require('./utils/logger');
var response = require('./constants/response')

// import routers
var todoRoute = require('./routes/todo');
var typeRoute = require('./routes/type');
var workgroupRoute = require('./routes/workgroup');
var statusRoute = require('./routes/status');

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
app.use('/api/todos', todoRoute);
app.use('/api/types', typeRoute); 
app.use('/api/workgroups', workgroupRoute);
app.use('/api/status', statusRoute);



app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


/**
 *
 * Log errors
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
function logErrors (err, req, res, next) {
  myLogger.error('error occurs: ' + err.stack);
  next(err)
}

/**
 *
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send(response.errorResponse)
  } else {
    next(err)
  }
}

/**
 *
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500);
  res.send(response.errorResponse);
}

// start listening port
app.listen(8888, function () {
  myLogger.info('mean server is up and listening port : 8888');
});

exports.default = app;
