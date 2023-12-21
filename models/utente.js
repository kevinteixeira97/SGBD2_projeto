var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    objectId = mongoose.Schema.ObjectId;

/*
var pessoaSchema = new Schema({
    _id: { type: objectId, auto:true },
    nome: { type: String, required: true},
    apelido: { type: String, required: true},
    numtelemovel: { type: String, required: true},
    morada: { type: String, required: true}
}, { versionKey: false})
*/

var utenteSchema = new Schema({
    _id: { type: objectId, auto: true },
    id_utente: { type: Number, required: true },
    nome: { type: String, required: true},
    apelido: { type: String, required: true},
    idade: { type: Number, required: true},
    sexo: { type: String, required: true},
    localidade: { type: String, required: true},
    email: { type: String, required: true},
    numsaude: { type: Number, required: true}
}, { versionKey: false})



var utenteModel = mongoose.model('Utente', utenteSchema, 'utentes')

module.exports = utenteModel;