var express = require('express');
var router = express.Router();
var location = require('../models/location.js');

// Get suggestions/coordinates by location name
router.get('/:name', function(req, res, next) {
    location.getCoordinates(req.params.name, res);
});

module.exports = router;
