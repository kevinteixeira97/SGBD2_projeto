var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    objectId = mongoose.Schema.ObjectId;





const especialidadeSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    especialidades: [{
        id_especialidade: { type: Number, required: true },
        nome: { type: String, required: true },
        descricao: { type: String, required: true }
    }]
}, { versionKey: false });




var especialidadeModel = mongoose.model('Especialidade', especialidadeSchema, 'especialidades')

module.exports = especialidadeModel;