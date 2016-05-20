/**
 * Created by kumardivyarajat on 19/05/16.
 */

var express = require('express');
var router = express.Router();
var dir = "./files/";
var WooCommerceAPI = require('woocommerce-api');
var fs = require('fs');
var Mobile = require('../models/PromoNumbers');
var mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/aadira");
var json2xls = require('json2xls');
router.use(json2xls.middleware);


router.get('/files', function (req, res, next) {
    readFiles(dir, function (err) {
        console.log(err);
    });

    // console.log(req);
    var s = req.query.num;

    console.log("S --->" + s);

    function readFiles(dirname, onError) {
        fs.readdir(dirname, function (err, filenames) {
            if (err) {
                onError(err);
                return;
            }
            var numbers = [];
            var num = [];
            var len = filenames.length;
            var counter = 1;
            filenames.forEach(function (filename) {
                console.log(filename);
                if (!filename.indexOf("data") > -1) {
                    fs.readFile(dirname + filename, 'utf-8', function (err, content) {
                        if (err) {
                            onError(err);
                            return;
                        }
                        // console.log(content);
                        var tr = content.split("\n");

                        var ar = [];

                        for (var i = 0; i < tr.length; i++) {
                            var t = tr[i];
                            if (t.indexOf("Message Sent") > -1 || t.indexOf("DELIVRD") > -1) {
                                var x = t.split('\t');
                                for (var j = 0; j < x.length; j++) {
                                    var a = x[j];
                                    // console.log(a);

                                    if (a.match(/^(91)\d{10}$/)) {
                                        var a1 = a.substring(2, 12);
                                        if (a1.length == 10)
                                            num.push(a1);

                                    }
                                }

                            }
                        }


                        console.log(counter + " != " + len);
                        if (counter == len) {
                            console.log(num.length);
                            num = uniq_fast(num);
                            num.sort();
                            console.log(num.length);
                            var set = parseInt(s);
                            var start = parseInt((set * num.length) / 10);
                            var end = ((set + 1) * num.length) / 10;
                            var fileName = (parseInt(set) + 1);
                            console.log("Start---->" + start + " | End --------------------->" + end);
                            for (var i = start; i < end; i++) {
                                var number = {sl: (i + 1), mobile: num[i]};
                                numbers.push(number);
                                // console.log(i);

                                var dbNumber = new Mobile({mobile: num[i]});
                                // console.log(dbNumber);
                                var j = start;
                                dbNumber.save(function (err, result) {
                                    console.log("Current---->" + j + " | End --------------------->" + end);
                                    if (j++ >= parseInt(end) - 1) {
                                        var xls = json2xls(numbers);

                                        console.log("Saving xl file");
                                        try {
                                            fs.writeFileSync(dirname + 'data' + fileName + '.xlsx', xls, 'binary');
                                        } catch (e) {
                                            console.log(e);
                                        }
                                        console.log("Sending back data");
                                        // res.xls('data.xlsx', numbers);
                                        res.json(numbers);
                                    }
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(result);
                                    }
                                });
                                // console.log(i)
                            }


                        }
                        counter++;
                    });
                }


            });
        })
    }
});


function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
        var item = a[i];
        if (seen[item] !== 1) {
            seen[item] = 1;
            out[j++] = item;
        }
    }
    return out;
}
