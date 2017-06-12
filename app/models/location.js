var Client = require('node-rest-client').Client;
var config = require('../../config/constants');
var NodeCache = require( "node-cache" );
var cache = new NodeCache();

// Get coordinates (lat and lng only) for a location name
exports.getLocation = function getLocation(name, callback){
    var lat, lng;
    try{
        coordinates = cache.get(name, true );
        // Page hit
        lat = coordinates.lat;
        lng = coordinates.lng;
        callback({lat: lat, lng: lng, cache: true});

    } catch(err){
        // Page miss
        var client = new Client();
        client.registerMethod("jsonMethod", config.geocode.url_add + name, "GET");
        client.methods.jsonMethod(function (data, response) {
            lat = data.results[0].geometry.location.lat;
            lng = data.results[0].geometry.location.lng;
            if(cache.set(name, {lat: lat, lng: lng}), config.cache.location.ttl, function (err) {}){
                callback({lat: lat, lng: lng, cache: false});
            }
        });
    }
};

// Get suggestions / coordinates for a location name
exports.getSuggestions = function getCoordinates(name, callback){
    var client = new Client();
    client.registerMethod("jsonMethod", config.geocode.url_add + name, "GET");
    client.methods.jsonMethod(function (data, response) {
        callback(data);
    });
};

// Get location name from coordinates
exports.getCityName = function getCoordinates(lat, lng, callback){
    var client = new Client();
    client.registerMethod("jsonMethod", config.geocode.url_latlng + lat + ',' + lng, "GET");
    client.methods.jsonMethod(function (data, response) {
        callback(data);
    });
};