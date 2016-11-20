/**
 * Created by kaishen on 20/11/2016.
 */

"use strict";

var mysqlDB = require('../datasources_mysql');

/**
 *
 * get all store list
 *
 * @param cb
 */
module.exports.list = (cb) => {
  mysqlDB.query('select * from store', function (err, rows, fields) {
    // if (err) throw err;
    console.log('The result is: ', rows);
    // mysqlConn.end();
    cb(err, rows);
  })
};


/**
 *
 * get a store by Id
 *
 * @param data
 * @param cb
 */
module.exports.getStoreById = (data, cb) => {
  // data = {
  //   id: 6
  // }
  mysqlDB.query('select * from store where id = ?', [data.id], function (err, rows, fields) {
    // if (err) throw err;
    console.log('The result is: ', rows);
    // mysqlConn.end();
    cb(err, rows);
  })
};

/**
 *
 * create new store
 *
 * @param data
 * @param cb
 */
module.exports.create = (data, cb) => {
  // data = {
  //   name: 'bj-0002',
  //   owner: 'kaya',
  //   address: 'beijing city'
  // }
  mysqlDB.query('insert into store set ? ', data, function (err, result) {
    if (err) throw err;
    console.log(result.insertId);
    cb(err, result.insertId);
  })
}


/**
 *
 * delete store by id
 *
 * @param data
 * @param cb
 */
module.exports.delete = (data, cb) => {
  // data = {
  //   id: 6
  // }
  mysqlDB.query('delete from store where id = ? ', [data.id], function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows);
    cb(err, result.affectedRows);
  })
}

/**
 *
 * update store by id
 *
 * @param data
 * @param cb
 */
module.exports.update = (data, cb) => {
  // data = {
  //   id: 5,
  //   name: 'beijing-store-0002',
  //   owner: 'kaya',
  //   address: 'beijing city'
  // }
  mysqlDB.query('update store set ? where id = ? ', [data, data.id], function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows);
    cb(err, result.affectedRows);
  })
}




