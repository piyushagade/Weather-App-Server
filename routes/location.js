var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Client = require('node-rest-client').Client;
var gl_url = "https://maps.googleapis.com/maps/api/geocode/json?address=";

// Get current weather
router.get('/:name', function(req, res, next) {
    var client = new Client();

    // registering remote methods
    client.registerMethod("jsonMethod", gl_url + req.params.name, "GET");

    client.methods.jsonMethod(function (data, response) {
        res.send(data);
    });
});

module.exports = router;
