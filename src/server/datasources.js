/**
 * Created by kaishen on 01/11/2016.
 */
var mongoose = require('mongoose');
// connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/mean');

module.exports = mongoose;