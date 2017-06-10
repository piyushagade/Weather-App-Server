var express = require('express');
var router = express.Router();
var config = require('../config/api');
var Client = require('node-rest-client').Client;
var fc_url = config.forecast.url + config.forecast.key + "/";
var gl_url = "https://maps.googleapis.com/maps/api/geocode/json?address=";


router.get('/:name', function(req, res, next) {
    var lat, lng;
    var client = new Client();
    // client.registerMethod("jsonMethod", gl_url + req.params.name, "GET");
    // client.methods.jsonMethod(function (data, response) {
        // lat = data.results[0].geometry.location.lat;
        // lng = data.results[0].geometry.location.lng;

        lat = 29.6516344;
        lng = -82.32482619999999;

        getWeather(lat, lng, res, next);
    // });
});

// Get current and history weather by coordinates
router.get('/:lat/:lng', function(req, res, next) {
    getWeather(req.params.lat, req.params.lng, res, next);
});

function getWeather(lat, lng, res, next){
    var current;
    var history = [];
    var currentTime;
    var factor = [1, 7, 30, 180, 365, 1825, 3650, 7300];

    var client = new Client();
    client.registerMethod("jsonMethod", fc_url + lat + "," + lng, "GET");
    client.methods.jsonMethod(function (data, response) {
        current = data;
        currentTime = data.currently.time;

        // Acquire weather history for current coordinates after current weather is obtained
        var client = new Client();
        var count = 0;

        for(var i = 0; i < factor.length; i++){
            getHistory(client, currentTime, factor[i], lat, lng, function(item) {
                history.push(item.currently);
                count++;

                if(count == 8) res.send({"current": current, "history": history});
            });
        }
    });
}

// Get current weather only by coordinates
router.get('/current/:lat/:lng', function(req, res, next) {
    var client = new Client();
    client.registerMethod("jsonMethod", fc_url + req.params.lat + "," + req.params.lng, "GET");
    client.methods.jsonMethod(function (data, response) {
        res.send(data)
    });
});


function getHistory(client, currentTime, factor, lat, lng, callback) {
    var time = currentTime - 86400 * factor;
    client.registerMethod("jsonMethod", fc_url + lat + "," + lng + "," + time, "GET");
    client.methods.jsonMethod(function (data, response) {
        callback(data);
    });
}


// Get weather history only by coordinates
router.get('/history/:lat/:lng/:time', function(req, res, next) {
    var client = new Client();
    client.registerMethod("jsonMethod", fc_url + req.params.lat + "," + req.params.lng + "," + req.params.time, "GET");
    client.methods.jsonMethod(function (data, response) {
        res.send(data);
    });
});




module.exports = router;
