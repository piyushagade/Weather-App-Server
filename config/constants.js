module.exports = {

    'forecast' : {
        'key' : 'ae90bcca3fe03f309f261f05519b03f1',
        'url' : 'https://api.darksky.net/forecast/'
    },

    'geocode' : {
        'url_add' : 'https://maps.googleapis.com/maps/api/geocode/json?address=',
        'url_latlng' : 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
    },

    'cache' : {
        'weather' : {
            // 10 minutes
            'ttl' : 10 * 60
        },
        'location' : {
            // 20 minutes
            'ttl' : 20 * 60
        }
    }

};
