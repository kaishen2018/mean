/*var mongoose = require('mongoose');
// connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/mean');*/

var mongoose = require('../datasources');

// create mongo model
var todoModel = mongoose.model('todo', {
  text: String
});

module.exports = todoModel;