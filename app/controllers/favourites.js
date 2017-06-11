var express = require('express');
var router = express.Router();
var favourites = require('../models/favourites.js');

// Get favourite cities of a particular user
router.get('/:user', function(req, res, next) {
    favourites.getFavourites(req.params.user, res);
});

// Get favourite cities of all users
router.get('/', function(req, res, next) {
    favourites.getFavouritesAll(res);
});

// Add a favourite city
router.get('/add/:user/:name', function(req, res, next) {
    favourites.addFavourite(req.params.user, req.params.name, res);
});

// Remove a favourite city
router.get('/remove/:id', function(req, res, next) {
    favourites.removeFavourite(req.params.id, res);
});

module.exports = router;
