/**
 * Created by kumardivyarajat on 19/05/16.
 */

var express = require('express');
var router = express.Router();
var ACL = require('../models/ACL');
var Roles = require('../models/Roles');
var User = require('../models/User');


router.get('/setup', function (req, res) {


    var acl = new ACL({
        for: "*",
        permissions: {
            read: true,
            write: true,
            delete: true
        }
    });

    acl.save(function (err1, result) {

        if (err1) {
            return res.json({response: err1});
        }

        var roles = new Roles({
            name: "Admin",
            acl: result._id
        });

        roles.save(function (err2, res2) {
            if (err2) {
                return res.json({response: err2});
            }
            res2.acl = [result];

            var user = new User({
                email: "rajat.ady@gmail.com",
                password: ".aartinandan16",
                passwordResetToken: "",
                passwordResetExpires: new Date(),
                tokens: [],
                mobile: "8147851623",
                profile: {
                    name: "Kumar Divya Rajat",
                    gender: "M"
                },
                role: res2._id
            });
            user.save(function (err3, res3) {
                if (err3) {
                    return res.json({response: err3});
                }
                res3.role = res2;
                res.json({response: res3})
            })

        });

    });
    // create a sample user
    // var nick = new User({
    //     name: 'Nick Cerminara',
    //     password: 'password',
    //     admin: true
    // });
    //
    // // save the sample user
    // nick.save(function (err) {
    //     if (err) throw err;
    //
    //     console.log('User saved successfully');
    //     res.json({success: true});
    // });
});

module.exports = router;
