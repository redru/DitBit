var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

/* Dependency routing */
app.get('/bower_components/*', function(req, res) {
    res.sendFile(__dirname + req.url);
});

/* Application REST routing */
app.use('/ditbit/transaction', require('./routes/transaction'));

/* Application REST routing */
app.use('/ditbit/bank', require('./routes/bank'));

/* Application routing */
app.use('/ditbit', require('./routes/ditbit'));

/* Application startup */
app.listen(3000, function () {
    console.log('DitBit listening at port 3000');
});
