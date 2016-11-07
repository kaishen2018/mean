/*
*
* @Name: typeData
* @Description: this type data model stands for the type of Configuration Item,
*               it will identify a CI as Software/ Server/ Database, etc.
*
* @Author: Kaishen Yang
* @Date: 2016-11-06
*
* */

var mongoose = require('../datasources');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Schema = new Schema({
  name: {type: String, match: /[a-zA-Z]/, unique: true, required: true},
  description: {type: String, default: "", unique: true},
  createDate: {type: Date, default: Date.now},
  updateDate: {type: Date, default: Date.now}
});

Schema.pre('remove', function (next) {
  console.log('------> mogoose middleware remove of todoSchema: ', Schema);
  next();
});

Schema.pre('validate', function (next) {
  console.log('------> mogoose middleware validate of todoSchema: ', Schema);
  next();
});

Schema.post('init', function(doc) {
  console.log('%s has been initialized from the db', doc._id);
});

Schema.post('validate', function(doc) {
  console.log('%s has been validated (but not saved yet)', doc._id);
});

Schema.post('save', function(doc) {
  console.log('%s has been saved', doc._id);
});

Schema.post('remove', function(doc) {
  console.log('%s has been removed', doc._id);
});

// Statics: Adding static methods to a Model is simple as well. Continuing with our animalSchema:
Schema.statics.findByText = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

// Instance Method
// assign a function to the "methods" object of our animalSchema
Schema.methods.findSimilarTypes = function(cb) {
  return this.model('cm_type').find({ type: this.type }, cb);
};

/*
* reflect the table structure into MongoDB.
* */
var typeModel = mongoose.model('cm_type', Schema);
module.exports = typeModel;