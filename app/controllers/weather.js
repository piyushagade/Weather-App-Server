var express = require('express');
var router = express.Router();
var weather = require("../models/weather.js");
var location = require("../models/location.js");

// Get current and history weather by location name
router.get('/:name', function(req, res, next) {
    // Get coordinates of the location
    location.getLocation(req.params.name, function (coordinates) {
        // Get complete weather info
        weather.getWeather(coordinates.lat, coordinates.lng, coordinates.cache, function(data){
            res.send(data);
        });
    });
});

// Get current and history weather by coordinates
router.get('/:lat/:lng', function(req, res, next) {
    req.assert('lat', 'Invalid latitude').notEmpty().isFloat();
    req.assert('lng', 'Invalid longitude').notEmpty().isFloat();
    var errors = req.validationErrors();

    if(!errors) {
        weather.getWeather(req.params.lat, req.params.lng, false, function(data){
            res.send(data);
        });
    }
    else{
        res.send({validation_error: errors});
    }
});

// Flush cache
router.get('/', function(req, res, next) {
     weather.flushCache();
     res.send({status: "success"});
});

module.exports = router;