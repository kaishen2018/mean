/*
*
* @Name: servicerequestData
* @Description: 
*
* @Author: yejing
* @Date: 2016-11-19
*
* */

var mongoose = require('../datasources');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Schema = new Schema({
    request_num: { type: String, match: /[a-zA-Z]/, unique: true, required: true },
    status_id: { type: ObjectId, ref: "cm_status_def" },
    opened_date: { type: Date, default: Date.now },
    opened_by: { type: String },
    on_behalf_of: { type: String },
    planned_start_time: { type: Date, default: Date.now },
    planned_end_time: { type: Date, default: Date.now },
    actual_start_time: { type: Date, default: Date.now },
    actual_end_time: { type: Date, default: Date.now },
    config_item_id: { type: ObjectId, ref: "cm_config_item" },
    category_id: { type: ObjectId, ref: "cm_category" },
    sub_category_id: { type: ObjectId, ref: "cm_sub_category" },
    urgency: { type: Number },
    priority: { type: Number },
    workgroup_id: { type: ObjectId, ref: "cm_workgroup_def" },
    assigned_to: { type: String },
    short_description: { type: String },
    description: { type: String },
    workflow_id: { type: ObjectId, ref: "cm_workflow_def" },
    closure_id: { type: ObjectId, ref: "cm_closure" },
    created_by: { type: String, default: "admin" },
    created_date: { type: Date, default: Date.now },
    last_updated_by: { type: String, default: "admin" },
    last_updated_date: { type: Date, default: Date.now }
});

Schema.pre('remove', function (next) {
    console.log('------> mogoose middleware remove of todoSchema: ', Schema);
    next();
});

Schema.pre('validate', function (next) {
    console.log('------> mogoose middleware validate of todoSchema: ', Schema);
    next();
});

Schema.post('init', function (doc) {
    console.log('%s has been initialized from the db', doc._id);
});

Schema.post('validate', function (doc) {
    console.log('%s has been validated (but not saved yet)', doc._id);
});

Schema.post('save', function (doc) {
    console.log('%s has been saved', doc._id);
});

Schema.post('remove', function (doc) {
    console.log('%s has been removed', doc._id);
});

// Statics: Adding static methods to a Model is simple as well. Continuing with our animalSchema:
Schema.statics.findByText = function (name, cb) {
    return this.find({ name: new RegExp(name, 'i') }, cb);
};

// Instance Method
// assign a function to the "methods" object of our animalSchema
Schema.methods.findSimilarTypes = function (cb) {
    return this.model('cm_servicerequest_def').find({ type: this.type }, cb);
};

/*
* reflect the table structure into MongoDB.
* */
var typeModel = mongoose.model('cm_servicerequest_def', Schema);
module.exports = typeModel;