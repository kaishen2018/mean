/*
 *
 * @Name: user.js
 * @Description: define the express route for user info CRUD
 *
 * @Author: Lemon Yang
 * @Date: 2016-11-13
 *
 * */


var express = require('express');
var router = express.Router();
var myLogger = require('../utils/logger');
var dataModel = require('../models/userData')
var response = require('../constants/response')

/*
 *
 * Define a middleware for this specific router
 *
 * */
router.use(function timeLog(req, res, next) {
    myLogger.log(" In user info router -> Time: ", Date.now())
    next();
})


// Routes of out API  -- start ------

/**
 * get all users
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
 * get user by id
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
 * Add user
 *
 */
router.post('/', function (req, res, next) {
    myLogger.log('req body: ', JSON.stringify(req.body));

    dataModel.create({
        user_full_name: req.body.user_full_name,
        gender: req.body.gender,
        birthday: req.body.birthday,
        telephone: req.body.telephone,
        mobile: req.body.mobile,
        is_active: req.body.is_active,
        created_by: req.body.created_by,
        last_updated_by: req.body.last_updated_by
    }, function (err, result) {
        if (err) {
            next(err);
            return;
        }
        dataModel.find(function (error, data) {
            if (error) {
                next(error);
                return;
            }
            res.json(data);
        });
    });
});

/**
 *
 * Update user info
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
        dataModel.find(function (error, data) {
            if (error) {
                next(error);
                return;
            }
            res.json(data);
        });
    });
});

/**
 *
 * delete user by id
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
        dataModel.find(function (error, data) {
            if (error) {
                next(error);
                return;
            }
            res.json(data);
        });
    });
});


module.exports = router;