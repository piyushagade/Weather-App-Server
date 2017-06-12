var Client = require('node-rest-client').Client;
var config = require('../../config/constants');
var NodeCache = require( "node-cache" );
var cache = new NodeCache();

//Get current and history of the weather
exports.getWeather = function getWeather(lat, lng, location_cache, callback){
    var current;
    var history = [];
    var currentTime;
    var factor = [1, 7, 30, 180, 365, 1825, 3650, 7300];
    var key = lat.toString().substr(0, 5) + lng.toString().substr(0, 5);
    try {
        weather = cache.get(key, true);
        // Page hit
        callback({"cache": {location: location_cache, weather: true}, "current": weather.current, "history": weather.history});
    }
    catch(err){
        // Page miss
        var client = new Client();
        client.registerMethod("jsonMethod", config.forecast.url + config.forecast.key + "/" + lat + "," + lng, "GET");
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
                    if(count == 8) {
                        cache.set(key, {"cache": {location: location_cache, weather: false}, "current": current, "history": history}, config.cache.weather.ttl);
                        callback({"cache": {location: location_cache, weather: false}, "current": current, "history": history});
                    }
                });
            }
        });
    }
}


function getHistory(client, currentTime, factor, lat, lng, callback) {
    var time = currentTime - 86400 * factor;
    client.registerMethod("jsonMethod", config.forecast.url + config.forecast.key + "/" + lat + "," + lng + "," + time, "GET");
    client.methods.jsonMethod(function (data, response) {
        callback(data);
    });
}

exports.flushCache = function flushCache(){
    cache.flushAll();
}