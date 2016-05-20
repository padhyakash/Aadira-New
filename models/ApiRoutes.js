/**
 * Created by kumardivyarajat on 19/05/16.
 */
var mongoose = require('mongoose');

var apiRoutesSchema = new mongoose.Schema({

    endpoint: String,
    method: String,
    description: String,
    request: String,
    response: String

}, {timestamps: true});


var ApiRoutes = mongoose.model('ApiRoutes', apiRoutesSchema);

module.exports = SentSms;
