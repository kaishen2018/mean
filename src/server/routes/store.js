/**
 * Created by kaishen on 01/11/2016.
 */
var express = require('express');
var router = express.Router();
var myLogger = require('../utils/logger');
var storeModel = require('../models/storeData')

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
 * get all stores
 */
router.get('/', function (req, res) {
  storeModel.list((err, data) => {
    if (err) {
      myLogger.error(err);
      throw err;
    }
    console.log("----> in Controller :", data);
    res.json(data);
  });
});

/**
 *
 * create a new store
 *
 */
router.post('/', function (req, res) {
  console.log('req body: ', JSON.stringify(req.body));
  storeModel.create({
    name: req.body.name,
    owner: req.body.owner,
    address: req.body.address
  }, function (err, data) {
    if (err) {
      res.send(err);
    }
    storeModel.list((err, data) => {
      if (err) {
        myLogger.error(err);
        throw err;
      }
      console.log("----> in Controller :", data);
      res.json(data);
    });
  });
});

router.put('/', function (req, res) {
  console.log('req body: ', JSON.stringify(req.body));
  storeModel.update(req.body, function (err, data) {
    if (err) {
      res.send(err);
      return;
    }
    storeModel.list((err, data) => {
      if (err) {
        myLogger.error(err);
        throw err;
      }
      console.log("----> in Controller :", data);
      res.json(data);
    });
  });
});

/**
 *
 * delete a store by id
 *
 */
router.delete('/', function (req, res) {
  storeModel.delete({
    id: req.body.id
  }, function (err, data) {
    if (err) {
      res.send(err);
      return;
    }

    storeModel.list((err, data) => {
      if (err) {
        myLogger.error(err);
        throw err;
      }
      console.log("----> in Controller :", data);
      res.json(data);
    });
  });
});

/**
 *
 * get tod detail by id
 *
 */
router.get('/:storeId', function (req, res) {

  storeModel.getStoreById({
    id: req.params.storeId
  }, (err, data) => {
    if (err) {
      myLogger.error(err);
      throw err;
    }
    console.log("----> in Controller :", data);
    res.json(data);
  });
});

module.exports = router;