var express = require('express');
var path = require('path');
var router = express.Router();

var APP_DIRECTORY = path.dirname(require.main.filename) + '/app';

router.use(function timeLog(req, res, next) {
    console.log('Time: ', new Date());
    next();
});

router.get('/', function(req, res, next) {
    req.url != '/' ? next() : res.sendFile(APP_DIRECTORY + '/index.html');
});

router.get('/*.*', function(req, res) {
    res.sendFile(APP_DIRECTORY + req.url);
});

module.exports = router;
