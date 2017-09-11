var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var compress = require('compression');
var expressValidator = require('express-validator');
var cors = require('cors');
var config = require('./config.js');

module.exports = function() {
    var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(cors());

    app.use(expressValidator());

    if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    } else {
        app.use(morgan('dev'));
    }

    require('../app/routes/router.js')(app);

    app.get('/favicon.ico', function(req, res) {
        res.status(204).send();
    });

    app.use(express.static('./build'));

    app.get('/*', function(req, res) {
        res.sendFile('./build/index.html');
    });

    return app;
};




