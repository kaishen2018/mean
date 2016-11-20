/*
 *
 * @Name: servicerequest.js
 * @Description: define the express route for servicerequest CRUD
 *
 * @Author: yejing
 * @Date: 2016-11-09
 *
 * */


var express = require('express');
var router = express.Router();
var myLogger = require('../utils/logger');
var dataModel = require('../models/servicerequestData')
var response = require('../constants/response')

/*
 *
 * Define a middleware for this specific router
 *
 * */
router.use(function timeLog(req, res, next) {
    myLogger.log(" In servicerequest router -> Time: ", Date.now())
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
 * create a new servicerequest
 *
 */
router.post('/', function (req, res, next) {
    myLogger.log('req body: ', JSON.stringify(req.body));

    dataModel.create({
        request_num: req.body.request_num,
        status_id: req.body.status_id,
        opened_date: req.body.opened_date,
        opened_by: req.body.opened_by,
        on_behalf_of: req.body.on_behalf_of,
        planned_start_time: req.body.planned_start_time,
        planned_end_time: req.body.planned_end_time,
        actual_start_time: req.body.actual_start_time,
        actual_end_time: req.body.actual_end_time,
        config_item_id: req.body.config_item_id,
        category_id: req.body.category_id,
        sub_category_id: req.body.sub_category_id,
        urgency: req.body.urgency,
        priority: req.body.priority,
        workgroup_id: req.body.workgroup_id,
        assigned_to: req.body.assigned_to,
        short_description: req.body.short_description,
        description: req.body.description,
        workflow_id: req.body.workflow_id,
        closure_id: req.body.closure_id
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
 * Update a servicerequest
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
 * delete a servicerequest by Id
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
 * get servicerequest detail by id
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