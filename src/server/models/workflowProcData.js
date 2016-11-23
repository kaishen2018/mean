/*
*
* @Name: workflowDefData
* @Description: definition of workflow process.
                workflow type(1=Serive request, 2=incident, 3=change, 4=design request)
*
* @Author: Kaishen Yang
* @Date: 2016-11-17
*
* */

var mongoose = require('../datasources');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Schema = new Schema({
  proc_code: {type: String, match: /[a-zA-Z0-9]/, unique: true, required: true},
  proc_name: {type: String, match: /[a-zA-Z]/, unique: true, required: true},
  proc_desc: {type: String, default: ""},
  proc_next_id: {type: Number},
  proc_prev_id: {type: Number},
  status_id: {type: Number},
  workflow_id: {type: Number},
  created_by: {type: String, default: "admin"},
  created_date: {type: Date, default: Date.now},
  last_updated_by: {type: String, default: "admin"},
  last_updated_date: {type: Date, default: Date.now}
});

Schema.pre('remove', function (next) {
  console.log('------> mogoose middleware remove of workflowSchema: ', Schema);
  next();
});

Schema.pre('validate', function (next) {
  console.log('------> mogoose middleware validate of workflowSchema: ', Schema);
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
var dataModel = mongoose.model('cm_workflow_def', Schema);
module.exports = dataModel;