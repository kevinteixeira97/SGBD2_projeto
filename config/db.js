var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/tp09', { useNewUrlParser: true });

module.exports = connection;