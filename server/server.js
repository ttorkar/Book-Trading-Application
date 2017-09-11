
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose.js');
var express = require('./config/express.js');

var port = process.env.PORT || 9000;

var db = mongoose();
var app = express();

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});
