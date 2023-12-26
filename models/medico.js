var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    objectId = mongoose.Schema.ObjectId;



var medicoSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    id_medico: { type: Number, required: true},
    nome: { type: String, required: true},
    apelido: { type: String, required: true},
    idade: { type: Number, required: true},
    sexo: { type: String, required: true},
    localidade: { type: String, required: true},
    email: { type: String, required: true},
    especialidade_id: { type: Number, required: true}
}, { versionKey: false});



var medicoModel = mongoose.model('Medico', medicoSchema, 'medicos')

module.exports = medicoModel;