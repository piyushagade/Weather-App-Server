var Client = require('node-rest-client').Client;
var config = require('../config/constants');
var NodeCache = require( "node-cache" );
var cache = new NodeCache();

// Get coordinates for a location name
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
        client.registerMethod("jsonMethod", config.geocode.url + name, "GET");
        client.methods.jsonMethod(function (data, response) {
            lat = data.results[0].geometry.location.lat;
            lng = data.results[0].geometry.location.lng;
            if(cache.set(name, {lat: lat, lng: lng})){
                callback({lat: lat, lng: lng, cache: false});
            }
        });
    }



}

// Get suggestions / coordinates for a location name
exports.getCoordinates = function getCoordinates(name, res){
    var client = new Client();
    client.registerMethod("jsonMethod", config.geocode.url + name, "GET");
    client.methods.jsonMethod(function (data, response) {
        res.send(data);
    });
}