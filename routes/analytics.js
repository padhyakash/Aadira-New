/**
 * Created by kumardivyarajat on 27/04/16.
 */
var express = require('express');
var router = express.Router();
var SentSms = require('../models/SentSms');

/* GET home page. */
router.get('/sms/sent', function (req, res, next) {

    // console.log(req);

     var perPage = 25
    , page = req.query.page > 0 ? req.query.page : 0;

    
    SentSms
    .find()
    .limit(perPage)
    .skip(perPage * page)
    .sort({ createdAt : "desc" })
    .exec(function (err,sms) {
    	// body...
    	 if(err) {
            return res.json({"response" : err.message});
        }
		res.json({code : 200, message : "Success", response : sms });
    });



});

module.exports = router;
