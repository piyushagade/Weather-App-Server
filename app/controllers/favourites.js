var express = require('express');
var router = express.Router();
var favourites = require('../models/favourites.js');

// Get favourite cities of a particular user
router.get('/:user', function(req, res, next) {
    req.assert('user', 'user id is required').notEmpty();
    var errors = req.validationErrors();
    if(!errors) {
        favourites.getFavourites(req.params.user, res, function(data){
            res.send(data);
        });
    }
    else{
        res.send({validation_error: errors});
    }
});

// Get favourite cities of all users
router.get('/', function(req, res, next) {
    favourites.getFavouritesAll(res, function(data){
        res.send(data);
    });
});

// Add a favourite city
router.get('/add/:user/:name', function(req, res, next) {
    favourites.addFavourite(req.params.user, req.params.name, res, function(data){
        res.send(data);
    });
});

// Remove a favourite city
router.get('/remove/:id', function(req, res, next) {
    favourites.removeFavourite(req.params.id, res, function (data){
        res.send(data);
    });
});

module.exports = router;
