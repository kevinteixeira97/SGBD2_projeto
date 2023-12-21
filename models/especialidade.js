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

var especialidadeSchema = new Schema({
    _id: { type: objectId, auto: true },
    id_especialidade: { type: Number, required: true },
    nome: { type: [String], required: true }
}, { versionKey: false})



var especialidadeModel = mongoose.model('Especialidade', especialidadeSchema, 'especialidades')

module.exports = especialidadeModel;