// Includes
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');

// Controllers
var index = require('./app/controllers/index');
var favourites = require('./app/controllers/favourites');
var weather = require('./app/controllers/weather');
var location = require('./app/controllers/location');

// Manage CORS
app.use(function(req, res, next) {
    var allowedOrigins = ['http://localhost:4200', 'http://localhost:3000', 'https://skycast-pa-aws.firebaseapp.com', 'http://ec2-34-210-238-35.us-west-2.compute.amazonaws.com:9999'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

// Routes to use
app.use('/', index);
app.use('/favourites', favourites);
app.use('/weather', weather);
app.use('/locate', location);

// View engine
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'jade');

// Fav icon
app.use(favicon(path.join(__dirname, 'public', 'images', 'sky.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Statically set an assets folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
