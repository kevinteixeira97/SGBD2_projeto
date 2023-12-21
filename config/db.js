var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb+srv://admin:4QmkXoIoXLiCiOf9@cluster0.50hiiro.mongodb.net/clinica_medica?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = connection;
