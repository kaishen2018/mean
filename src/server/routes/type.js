/*
 *
 * @Name: type.js
 * @Description: define the express route for CI types CRUD
 *
 * @Author: Kaishen Yang
 * @Date: 2016-11-06
 *
 * */


var express = require('express');
var router = express.Router();
var myLogger = require('../utils/logger');
var dataModel = require('../models/typeData')
var response = require('../constants/response')

/*
 *
 * Define a middleware for this specific router
 *
 * */
router.use(function timeLog(req, res, next) {
  myLogger.log(" In type router -> Time: ", Date.now())
  next();
})


// Routes of out API  -- start ------

/**
 * get all types
 */
router.get('/', function (req, res, next) {
  dataModel.find(function (error, data) {
    if (error) {
      next(error);
      return;
    }
    res.json(data);
  });
});

/**
 *
 * create a new type
 *
 */
router.post('/', function (req, res, next) {
  myLogger.log('req body: ', JSON.stringify(req.body));

  dataModel.create({
    name: req.body.name,
    description: req.body.description
  }, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.send(response.successResponse);
  });
});

/**
 *
 * Update a type
 *
 */
router.put('/', function (req, res, next) {
  myLogger.log('req body: ', JSON.stringify(req.body));
  dataModel.update({
    _id: req.body.id
  }, req.body, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.send(response.successResponse);
  });
});

/**
 *
 * delete a type by Id
 *
 */
router.delete('/:id', function (req, res, next) {
  dataModel.remove({
    _id: req.params.id
  }, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.send(response.successResponse);
  });
});

/**
 *
 * get type detail by id
 *
 */
router.get('/:id', function (req, res, next) {
  dataModel.findOne({
    _id: req.params.id
  }, function (err, data) {
    if (err) {
      next(err);
      return;
    }
    res.json(data);
  });
});

module.exports = router;