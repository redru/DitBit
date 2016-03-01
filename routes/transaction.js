var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function(req, res) {
    res.send('Test GET');
});

router.post('/', function(req, res) {
    res.send('Test POST');
});

router.put('/', function(req, res) {
    res.send('Test PUT');
});

router.delete('/', function(req, res) {
    res.send('Test DELETE');
});

module.exports = router;