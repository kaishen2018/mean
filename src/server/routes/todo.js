/**
 * Created by kaishen on 01/11/2016.
 */
var express = require('express');
var router = express.Router();
var myLogger = require('../utils/logger');
var todoModel = require('../models/todoData')

/*
 *
 * Define a middleware for this specific router
 *
 * */
router.use(function timeLog(req, res, next) {
  myLogger.log(" In todo router -> Time: ", Date.now())
  next();
})


// Routes of out API  -- start ------

/**
 * get all todo items
 */
router.get('/', function (req, res) {
  todoModel.find(function (error, todos) {
    if (error) {
      res.send(error);
    }
    res.json(todos);
  });
});

/**
 *
 * create a new todo
 *
 */
router.post('/', function (req, res) {
  console.log('req body: ', JSON.stringify(req.body));
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
  });
});

router.put('/', function (req, res) {
  console.log('req body: ', JSON.stringify(req.body));
  todoModel.update({
    _id: req.body._id
  }, req.body, function (err, todo) {
    if (err) {
      res.send(err);
    }
    todoModel.find(function (err, todos) {
      if (err) {
        res.send(err);
      }
      res.json(todos);
    });
  });
});

/**
 *
 * delete a todo by id
 *
 */
router.delete('/:todo', function (req, res) {
  todoModel.remove({
    _id: req.params.todo
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
  });
});

/**
 *
 * get tod detail by id
 *
 */
router.get('/:todo', function (req, res) {
  todoModel.findOne({
    _id: req.params.todo
  }, function (err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
});

module.exports = router;