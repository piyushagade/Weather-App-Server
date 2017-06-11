module.exports = {

    'forecast' : {
        'key' : 'ae90bcca3fe03f309f261f05519b03f1',
        'url' : 'https://api.darksky.net/forecast/'
    },

    'geocode' : {
        'url' : 'https://maps.googleapis.com/maps/api/geocode/json?address='
    },

    'cache' : {
        'weather' : {
            // 10 minutes
            'ttl' : 10 * 60
        }
    }

};
