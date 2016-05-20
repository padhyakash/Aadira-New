/**
 * Created by kumardivyarajat on 19/05/16.
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');


module.exports = mongoose.model('ACL', new mongoose.Schema({
    for: {type: String},
    permissions: {
        read: {
            type: Boolean
        },
        write: {
            type: Boolean
        },
        delete: {
            type: Boolean
        }
    }

}));