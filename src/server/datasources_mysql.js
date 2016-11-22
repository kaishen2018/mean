/**
 * Created by kaishen on 01/11/2016.
 */
var mysql = require('mysql');

/**
 *
 * Single Connection
 *
 * */

/**
 *
 * @param err
 */
function handleError (err) {
  if (err) {
    // 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connect();
    } else {
      console.error(err.stack || err);
    }
  }
}

/**
 * use local mysql server
 * */
/*var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'sbux_payment'
});*/

/**
 * this is a server in softtek server
 * @type {Connection}
 */
var db = mysql.createConnection({
  host     : '172.16.98.166',
  user     : 'sbux',
  password : 'sbux123',
  database : 'sbux_payment'
});

db.connect(handleError);
db.on('error', handleError);

module.exports = db;

/*
connection.connect();

connection.query('select * from invoice', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows);
});

connection.end();
*/


/**
 *
 * Connection pool
 *
 * */

/*

var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'sbux_payment',
  connectionLimit: 3,
  queueLimit: 10,
  waitForConnections: true,
  acquireTimeout: 10000
});

pool.on('connection', function (connection) {
  connection.query('----------> SET SESSION auto_increment_increment=1');
});

pool.on('enqueue', function () {
  console.log('---------->  Waiting for available connection slot');
});

pool.query('select * from store where id = ?', [1], function(err, rows, fields) {
  if (err) throw err;
  console.log('The result is: ', rows);

  pool.end()
});
*/
