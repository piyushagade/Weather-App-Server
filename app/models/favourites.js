var db = require('../../config/db');

var citiesSchema = new db.Schema({
        name: { type: String, required: true },
        user: { type: String, required: true }
    },
    {
        collection: 'cities'
    });

var citiesModel = mongoose.model('cities', citiesSchema);

// Get favourites of a particular user
exports.getFavourites = function (user, res, callback) {
    citiesModel.find( { user: user } )
        .then(function(doc){
            callback(doc);
        });
};

// Get favourites of all users
exports.getFavouritesAll = function (res, callback) {
    citiesModel.find()
        .then(function(doc){
            callback(doc);
        });
};

// Add a favourite location
exports.addFavourite = function (user, name, res, callback) {
    var item = {
        name: name,
        user: user,
    };

    var data = new citiesModel(item);
    data.save().then()
    {
        callback({status: "success"});
    }
};

// Remove a favourite location
exports.removeFavourite = function (id, res, callback) {
    citiesModel.findByIdAndRemove(id).exec();

    citiesModel.find()
        .then(function(doc){
            callback({status: "success"});
        });
};