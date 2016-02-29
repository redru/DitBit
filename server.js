var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.get('/bower_components/*', function(req, res) {
    debugger;
    res.sendFile(__dirname + req.url);
});

app.listen(3000, function () {
    console.log('DitBit listening at port 3000');
});