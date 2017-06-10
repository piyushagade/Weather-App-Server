mongoose = require('mongoose');
mongoose.connect('mongodb://piyushagade:sana7ufa@0.0.0.0:27017/admin/master', function(err) {
        if (err) console.log(err);
    },
    {auth:{authdb:"admin"}});

module.exports.Schema = mongoose.Schema;