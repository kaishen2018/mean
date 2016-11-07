/*
*
* refer to following URL to learn more mongoose:
*   ﻿http://mongoosejs.com/docs/guide.html
*   https://npm.taobao.org/package/mongoose
    http://mongoosejs.com/docs/index.html
    http://mongoosejs.com/docs/api.html
    http://mongoosejs.com/docs/queries.html
*
* */

var mongoose = require('../datasources');

// create mongo model
/*var todoModel = mongoose.model('todo', {
  text: String
});*/

function toLower(v) {
  return v.toLowerCase();
}

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var todoSchema = new Schema({
  id: {type: Number, min: 100000, max: 999999},
  text: {type: String, default: "text", match: /[a-z]/, unique: true},
  createDate: {type: Date, default: Date.now()},
});

// a setter
todoSchema.path('text').set(function (v) {
  console.log(' ------> mongoose setter of todoSchema: ', v);
  return v.toLowerCase();
});

//a getter method
todoSchema.path('text').get(function (v) {
  console.log(' ------> mongoose getter of todoSchema: ', v);
  return v.toUpperCase();
});

// middleware,
// refer to http://mongoosejs.com/docs/middleware.html
todoSchema.pre('init', function (next) {
  console.log('------> mongoose middleware init of todoSchema: ', todoSchema);
  next();
});

todoSchema.pre('save', function (next) {
  console.log('------> mogoose middleware save of todoSchema: ', todoSchema);
  next();
});

todoSchema.pre('remove', function (next) {
  console.log('------> mogoose middleware remove of todoSchema: ', todoSchema);
  next();
});

todoSchema.pre('validate', function (next) {
  console.log('------> mogoose middleware validate of todoSchema: ', todoSchema);
  next();
});

todoSchema.post('init', function(doc) {
  console.log('%s has been initialized from the db', doc._id);
});

todoSchema.post('validate', function(doc) {
  console.log('%s has been validated (but not saved yet)', doc._id);
});

todoSchema.post('save', function(doc) {
  console.log('%s has been saved', doc._id);
});

todoSchema.post('remove', function(doc) {
  console.log('%s has been removed', doc._id);
});

// Statics: Adding static methods to a Model is simple as well. Continuing with our animalSchema:
todoSchema.statics.findByText = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

// Instance Method
// assign a function to the "methods" object of our animalSchema
todoSchema.methods.findSimilarTypes = function(cb) {
  return this.model('Animal').find({ type: this.type }, cb);
};

var todoModel = mongoose.model('todo', todoSchema);
module.exports = todoModel;