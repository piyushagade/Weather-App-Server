var express = require('express');
var router = express.Router();
var favourites = require('../models/favourites.js');


/* --------------------------------------------------------------------------------------------------------
                        Get, add, and remove favourite cities
 -------------------------------------------------------------------------------------------------------- */

router.get('/:user', function(req, res, next) {
    favourites.getFavourites(req.params.user, res);
});

router.get('/', function(req, res, next) {
    favourites.getFavouritesAll(res);
});


router.get('/add/:user/:name', function(req, res, next) {
    favourites.addFavourite(req.params.user, req.params.name, res);
});

router.get('/remove/:id', function(req, res, next) {
    favourites.removeFavourite(req.params.id, res);
});


module.exports = router;
