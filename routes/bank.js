var express = require('express');
var path = require('path');
var bankService = require('../services/bankService');

var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', new Date());
    console.log('Request: ', req.method, ' | Data: ', req.body);
    next();
});

router.get('/', function(req, res) {
    res.send('{ "response":"Hello GET!!" }');
});

router.post('/', function(req, res) {
    bankService.save(req.body, function(err, objResponse) {
        objResponse.esito == 'KO' ? res.status(500).send('{ "error":"' + objResponse.info + '" }') : res.sendStatus(200);
    });
});

router.put('/', function(req, res) {
    res.send('{ "response":"Hello PUT!!" }');
});

router.delete('/', function(req, res) {
    res.send('{ "response":"Hello DELETE!!" }');
});

module.exports = router;
