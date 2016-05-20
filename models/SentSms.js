/*
 * Created by kumardivyarajat on 26/04/16.
 */
var mongoose = require('mongoose');

var sentSmsSchema = new mongoose.Schema({

    agent: String,
    mobile: {
        type: String,
        maxlength: 10
    },
    statusCode: String,
    tag: String,
    meta: {
        key: String,
        value: String
    },
    message: String,
    deliveryStatus: {
        type: Number,
        enum: [0, 1, -1]
        /*
         *  0 -> Sent
         *  1 -> Delivered
         * -1 -> Failed  
         *
         */
    }


}, {timestamps: true});


var SentSms = mongoose.model('SentSms', sentSmsSchema);

module.exports = SentSms;
