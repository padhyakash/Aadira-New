var express = require('express');
var router = express.Router();
var path = require('path');


/* GET home page. */
router.get('/', function (req, res, next) {

    // console.log(req);
    res.sendFile('/index.html', {root: path.join(__dirname, '../public')});
});

module.exports = router;
