var http = require('http');
var express = require('express');
var router = express.Router();
var user = 'reduxpress';
var pass = 'redux123';
var sender = 'RDXPRS';
var url = "http://bhashsms.com/api/sendmsg.php?user=" + user + "&pass=" + pass + "&sender=" + sender + "&phone=";
var priority = 'ndnd';
var stype = 'normal';

// router.use(require('./tokenVerify.js'));
function sendSms(data, res) {

    if (data.mobile && data.message && data.mobile != "" && data.message != "") {
        url += data.mobile;
        url += '&text=' + data.message;
        url += '&priority=' + priority;
        url += '&stype=' + stype;
        console.log(url);
        http.get(url, function (response) {
            var buffer = "";
            response.on('data', function (chunk) {
                buffer += chunk;
            });
            console.log("Url :-" + url);
            response.on('end', function (error) {
                if (!error) {
                    var sentSmsDetails = {
                        mobile: data.mobile,
                        message: data.message,
                        statusCode: buffer
                    };
                // sentSms.create(sentSmsDetails, function (error, data) {
                //     console.log("2");
                //     console.log(sentSmsDetails);
                //     if (error) {
                //         console.dir(error);
                //         return false;
                //         //throw error;
                //     }
                //     console.log(data);
                //     return true;
                // });
                console.log(sentSmsDetails);
                res.json({
                    "response": sentSmsDetails
                });
            }
        });
        });
    } else {
        console.log("Error");
        res.json({"response" : "Mobile number or message missing or inappropriate."});
    }

}


router.post('/', function (request, response) {
    console.log(request.body);
    if (request.body.mobile && request.body.message) {
        console.log(request.body.mobile + "  --->  " + request.body.message);
        sendSms({
            mobile: request.body.mobile,
            message: request.body.message
        }, response);
    }
});

module.exports.router = router;


// /api/sendmsg.php?user=.xyz&pass=xyz$sender=senderid$phone=mobileno$text=lmn&priority=p$stype=sms