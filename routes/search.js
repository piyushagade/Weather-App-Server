var express = require('express');
var router = express.Router();

var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

var db = require('../db');

var searchSchema = new db.Schema({
        name: { type: String, required: true }
    },
    {
        collection: 'search'
    });

var searchModel = mongoose.model('search', searchSchema);


/* --------------------------------------------------------------------------------------------------------
                        Get, add, and remove searched cities
 -------------------------------------------------------------------------------------------------------- */

router.get('/', function(req, res, next) {
    searchModel.find()
        .then(function(doc){
            res.json(doc);
        });
});


router.get('/add/:name', function(req, res, next) {
    var item = {
        name: req.params.name,
    };

    var data = new searchModel(item);
    data.save().then()
    {
        res.end();
    }

});

router.get('/remove/:id', function(req, res, next) {
    searchModel.findByIdAndRemove(req.params.id).exec();

    res.end();
});


module.exports = router;
