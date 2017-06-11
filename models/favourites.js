var db = require('../db');


var citiesSchema = new db.Schema({
        name: { type: String, required: true },
        user: { type: String, required: true }
    },
    {
        collection: 'cities'
    });

var citiesModel = mongoose.model('cities', citiesSchema);

// Get favourites of a particular user
exports.getFavourites = function (user, res) {
    citiesModel.find( { user: user } )
        .then(function(doc){
            res.json(doc);
        });
}

// Get favourites of all users
exports.getFavouritesAll = function (res) {
    citiesModel.find()
        .then(function(doc){
            res.json(doc);
        });
}

// Add a favourite location
exports.addFavourite = function (user, name, res) {
    var item = {
        name: name,
        user: user,
    };

    var data = new citiesModel(item);
    data.save().then()
    {
        res.json({status: "success"});
    }
}

// Remove a favourite location
exports.removeFavourite = function (id, res) {
    citiesModel.findByIdAndRemove(id).exec();

    citiesModel.find()
        .then(function(doc){
            res.json({status: "success"});
        });
}