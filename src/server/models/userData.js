/*
*
* @Name: userData
* @Description: this user data model stands for user info.
*
* @Author: Lemon Yang
* @Date: 2016-11-13
*
* */

var mongoose = require('../datasources');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Schema = new Schema({
    user_full_name: { type: String, default: "", required: true },
    gender: { type: Number, default: 0 },
    birthday: { type: Date, default: "" },
    telephone: { type: String, default: "" },
    mobile: { type: String, default: "" },
    is_active: { type: Number, default: 1},
    created_date: { type: Date, default: Date.now },
    created_by: { type: String, default: "" },
    last_updated_by: { type: String, default: "" },
    last_updated_date: { type: Date, default: Date.now }
});

Schema.pre('remove', function (next) {
    console.log('------> mogoose middleware remove of userSchema: ', Schema);
    next();
});

Schema.pre('validate', function (next) {
    console.log('------> mogoose middleware validate of userSchema: ', Schema);
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
    return this.model('cm_user_info').find({ type: this.type }, cb);
};

/*
* reflect the table structure into MongoDB.
* */
var typeModel = mongoose.model('cm_user_info', Schema);
module.exports = typeModel;