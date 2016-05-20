/**
 * Created by kumardivyarajat on 19/05/16.
 */

var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Roles', new mongoose.Schema({
    name : {type: String, unique: true},
    acl : [{type: Schema.Types.ObjectId, ref: 'ACL'}]

}));