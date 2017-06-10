var express = require('express');
var router = express.Router();
var db = require('../db');


var citiesSchema = new db.Schema({
        name: { type: String, required: true }
    },
    {
        collection: 'cities'
    });

var citiesModel = mongoose.model('cities', citiesSchema);


/* --------------------------------------------------------------------------------------------------------
                        Get, add, and remove favourite cities
 -------------------------------------------------------------------------------------------------------- */

router.get('/', function(req, res, next) {
    citiesModel.find()
        .then(function(doc){
            res.json(doc);
        });
});


router.get('/add/:name', function(req, res, next) {
    var item = {
        name: req.params.name,
    };

    var data = new citiesModel(item);
    data.save().then()
    {
        res.end();
    }

});

router.get('/remove/:id', function(req, res, next) {
    citiesModel.findByIdAndRemove(req.params.id).exec();

    res.end();
});


module.exports = router;
