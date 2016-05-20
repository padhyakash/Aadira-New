var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var api = require('./routes/api');
var smsRoute = require('./routes/smsApi');
var sendSms = smsRoute.router;
var mailRoute = require('./routes/mailApi');
var sendMail = mailRoute.router;
var usersRoute = require('./routes/users');
var users = usersRoute.router;
// var ParseServer = require('parse-server').ParseServer;
var analytics = require('./routes/analytics');
var cors = require('cors');
var app = express();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config/config');
var mongoose = require('mongoose');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


try {
    mongoose.createConnection(config.database);
} catch (e) {
    console.log(e);
}
// connect to database
app.set('superSecret', config.secret);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());


// app.use('/bk', api_);
app.use('/api/send/mail', sendMail);
app.use('/api/send/sms', sendSms);
app.use('/api/analytics', analytics);
app.use('/api', api);
app.use('/users',usersRoute);
app.use('*', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// var api_ = new ParseServer({
//     databaseURI: 'mongodb://localhost:27017/aadira', // Connection string for your MongoDB database
//     // cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
//     appId: '123456789',
//     masterKey: '987654321', // Keep this key secret!
//     serverURL: 'http://localhost:1337/bk' // Don't forget to change to https if needed
// });

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;


// parse-dashboard --appId 123456789 --masterKey 987654321 --serverURL "http://localhost:3000/parse" 
