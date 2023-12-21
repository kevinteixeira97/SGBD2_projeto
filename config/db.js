var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb+srv://admin:<4QmkXoIoXLiCiOf9>@cluster0.50hiiro.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

module.exports = connection;