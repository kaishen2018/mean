//server.js
var path = require('path');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var myLogger = require('./logger');

// override with different headers; last one takes precedence
app.use(methodOverride('X-HTTP-Method'));          // Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override'));      // IBM

// connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/mean');

// create mongo model
var todoModel = mongoose.model('todo', {
  text: String
});

//configuration
// app.configure(function () {
// find static files
app.use(express.static(__dirname + '/public'));

//display a log of all requests on console.
// app.use(express.logger('dev'));
app.use(morgan('dev'));

//change html post method
// app.use(express.bodyParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// Routes of out API  -- start ------
app.get('/api/todos', function (req, res) {
  setTimeout( function() {
    todoModel.find(function (error, todos) {
      if (error) {
        res.send(error);
      }
      res.json(todos);
    })
  }, 5000);
});

app.post('/api/todos', function (req, res) {
  setTimeout( function () {
    console.log( 'req body: ',  JSON.stringify(req.body));
    todoModel.create({
      text: req.body.text,
      done: false
    }, function (err, todo) {
      if (err) {
        res.send(err);
      }
      todoModel.find(function (err, todos) {
        if (err) {
          res.send(err);
        }
        res.json(todos);
      });
  }) }, 5000);

  ;
  // });

  app.delete('/api/todos/:todo', function (req, res) {
    todoModel.remove({
      _id: req.params.todo
    }, function (err, todo) {
      if (err) {
        res.send(err);
      }
      todoModel.find(function (err, todos) {
        if (err) {
          res.send(err)
        }
        res.json(todos)
      });
    })
  });

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })

});
// Routes of out API  -- End ------


// start listening port
app.listen(8888, function () {
  myLogger.info('mean server is up and listening port : 8888');
});

exports.default = app;