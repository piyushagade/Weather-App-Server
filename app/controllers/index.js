var express = require('express');
var router = express.Router();

// Index location
router.get('/', function(req, res, next) {
    res.render('index', { title: 'SkyCast API'});
});

module.exports = router;
