var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

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

    //open connection
    mongoose.connect('mongodb://AM-VELEONETTI/bank'); //port 27017
    var db = mongoose.connection;
    db.on('error', function() {
        console.log("Error! Exiting... Must start MongoDB first");
        process.exit(1);
    });
    db.once('open', function() {
        // we're connected!
        console.log('Connection mongodb success');
    });
});
