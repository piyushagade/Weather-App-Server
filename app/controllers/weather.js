var express = require('express');
var router = express.Router();
var weather = require("../models/weather.js");
var location = require("../models/location.js");

// Get current and history weather by location name
router.get('/:name', function(req, res, next) {
    // Get coordinates of the location
    var coordinates = location.getLocation(req.params.name, function (coordinates) {
        // Get complete weather info
        weather.getWeather(coordinates.lat, coordinates.lng, coordinates.cache, res, next);
    });
});

// Get current and history weather by coordinates
router.get('/:lat/:lng', function(req, res, next) {
    weather.getWeather(req.params.lat, req.params.lng, false, res);
});

module.exports = router;
