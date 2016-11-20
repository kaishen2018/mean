/*
*
* @Name: workgroupData
* @Description: 
*
* @Author: yejing
* @Date: 2016-11-09
*
* */

var mongoose = require('../datasources');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Schema = new Schema({
    workgroup_name: { type: String, match: /[a-zA-Z]/, unique: true, required: true },
    workgroup_desc: { type: String, default: "" },
    owner: { type: String, default: "admin" },
    created_by : { type: String, default: ""},
    created_date: { type: Date, default: Date.now },
    last_updated_by: { type: String, default: ""},
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
    return this.model('cm_workgroup_def').find({ type: this.type }, cb);
};

/*
* reflect the table structure into MongoDB.
* */
var typeModel = mongoose.model('cm_workgroup_def', Schema);
module.exports = typeModel;