var express = require('express');
var router = express.Router();
var location = require('../models/location.js');

// Get suggestions/coordinates by location name
router.get('/:name', function(req, res, next) {
    location.getSuggestions(req.params.name, function(data){
        res.send(data);
    });
});

// Get city name from coordinates
router.get('/:lat/:lng', function(req, res, next) {
    location.getCityName(req.params.lat, req.params.lng, function(data){
        res.send(data);
    });
});

module.exports = router;