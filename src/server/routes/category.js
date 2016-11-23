﻿/*
 *
 * @Name: category.js
 * @Description: define the express route for category CRUD
 *
 * @Author: Lemon Yang
 * @Date: 2016-11-13
 *
 * */


var express = require('express');
var router = express.Router();
var myLogger = require('../utils/logger');
var dataModel = require('../models/categoryData');
var response = require('../constants/response')

/*
 *
 * Define a middleware for this specific router
 *
 * */
router.use(function timeLog(req, res, next) {
    myLogger.log(" In categgory router -> Time: ", Date.now())
    next();
})


// Routes of out API  -- start ------

/**
 * get all categories
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
 * get category detail by id
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
/**
 *
 * Add new category
 *
 */
router.post('/', function (req, res, next) {
    myLogger.log('req body: ', JSON.stringify(req.body));

    dataModel.create({
        category_code: req.body.category_code,
        category_name: req.body.category_name,
        category_desc: req.body.category_desc,
        created_by: req.body.created_by,
        last_updated_by: req.body.last_updated_by,
        subCategory: req.body.subCategory
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
 * Update a Category
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
 * delete category by Id
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


module.exports = router;