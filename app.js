// Includes
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');

// Routes
var index = require('./routes/index');
var favourites = require('./routes/favourites');
var weather = require('./routes/weather');
var location = require('./routes/location');
var search = require('./routes/search');

// Manage CORS
app.use(function(req, res, next) {
    var allowedOrigins = ['http://localhost:4200', 'http://localhost:3000', 'https://skycast-pa-aws.firebaseapp.com', 'http://ec2-54-202-210-202.us-west-2.compute.amazonaws.com:9999'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});


// Handle routes
app.use('/', index);
app.use('/favourites', favourites);
app.use('/weather', weather);
app.use('/locate', location);
app.use('/search', search);


// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'images/sky.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'foobar',
    resave: true,
    saveUninitialized: true
}));

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
