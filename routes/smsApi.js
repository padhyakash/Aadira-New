var http = require('http');
var express = require('express');
var router = express.Router();
var user = 'reduxpress';
var pass = 'redux123';
var sender = 'RDXPRS';
var url = "";
var priority = 'ndnd';
var stype = 'normal';
var forward, agent, tag;
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/aadira");

var sentSms = require('../models/SentSms');
var meta = {};


var async;
// router.use(require('./tokenVerify.js'));
function smsApi(data, res) {
	console.log(url);
	http.get(url, function (response) {
		var buffer = ""
		if(response.statusCode >= 200 && response.statusCode <= 299) {
			response.on('data', function (chunk) {
				buffer += chunk;
			});
			response.on('end', function (error) {
				if (!error) {
					var sentSmsDetails = {
						mobile: data.mobile,
						message: data.message,
						statusCode: buffer,
						meta: meta,
						tag: tag,
						deliveryStatus: 0,
						agent: agent
					};
					var sent = new sentSms(sentSmsDetails);
					sent.save(function (err, result) {
						if (err) {
							console.log(err);
							if (async == "false")
								res.json({code : 510, message : "Error saving object to database", response : err.message });
						} else {
							if (async == "false")
								res.json({code : 200, message : "Success", response : result });
						}
					});

				}
			});
		} else {
			res.json({code : 501, message : "Internal Server error"});
		}
		
	});
}

function sendSms(data, res) {
	if (data.mobile != "" && data.message != "") {
		url += data.mobile;
		url += '&text=' + data.message;
		url += '&priority=' + priority;
		url += '&stype=' + stype;
	} else {
		return null;
	}
	smsApi(data, res);
}

function enumParser(status) {

}


router.post('/', function (request, response) {
	try {
		console.log(request.body);
		var errors =  [];
		forward = request.body.forward;
		if (forward == undefined) {
			errors.push({reason : 'required boolean parameter [forward] is required in body'})
		}
		async = request.body.async;
		if (async == undefined) {
			errors.push({reason : 'required boolean parameter [async] is required in body'})
		}
		agent = request.body.agent;
		if (!agent) {
			errors.push({reason : 'required string parameter [agent] is required in body'})
		}

		if(!request.body.mobile) {
			errors.push({reason : 'required string parameter [mobile] is required in body'})
		}

		if(!request.body.message) {
			errors.push({reason : 'required string parameter [message] is required in body'})
		}

		if(!request.body.mobile) {
			errors.push({reason : 'required string parameter [mobile] is required in body'})
		}

		if(request.body.mobile < 10) {
			errors.push({reason : 'A 10 digit mobile number is required'})
		}

		if(!request.body.meta) {
			errors.push({reason : 'formal JsonObject parameter [meta] with structure { key , value } is missing in body'})
		}

		if(!request.body.tag) {
			errors.push({reason : "formal string parameter [tag] is missing in body"})
		}

		if(!agent || !async || !forward || request.body.mobile.length < 10) {
			console.log("returning");
			return response.json({code : 101, message : "Parameters missing", response : errors });
		}

		if (request.body.mobile && request.body.message) {
			console.log("not returning");
			if (request.body.meta) {
				tag = request.body.tag;

				if(typeof(request.body.meta) == "string") {
					console.log(request.body.meta);
					var x = JSON.parse(request.body.meta);
					meta.key = x.key;
					meta.value = x.value;
				} else {
					meta.key = request.body.meta.key;
					meta.value = request.body.meta.value;
				}

			}
			url = "http://bhashsms.com/api/sendmsg.php?user=" + user + "&pass=" + pass + "&sender=" + sender + "&phone=";
			if (async == "true" || async) {
				sendSms({
					mobile: request.body.mobile,
					message: request.body.message
				}, response);

				var a  = {
					mobile: request.body.mobile,
					message: request.body.message,
					statusCode: "Queued",
					meta: meta,
					tag: tag,
					deliveryStatus: 0,
					agent: agent
				};
				response.json({code : 200, message : "Success", response : a });
			} else if (async == "false" || !async) {
				sendSms({
					mobile: request.body.mobile,
					message: request.body.message
				}, response);

			}
		}
	} catch(e) {
		console.log(e);
	}
	
});

module.exports.router = router;


// /api/sendmsg.php?user=.xyz&pass=xyz$sender=senderid$phone=mobileno$text=lmn&priority=p$stype=sms