var express = require('express'),
    router = express.Router(),
    medico = require('../models/medico.js');
const utente = require("../models/utente");

router.get('/', function(req, res) {
    medico.find({}, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('medicos', { medicos: data }); // Render 'index' view with 'medicos' data
        //res.send(data);
    });
});



router.get('/create', function(req, res) {

    res.render('medicos_create'); // Render 'index' view with 'medicos' data

});

router.get('/update', function(req, res) {
    res.render('medicos_update'); // Render 'index' view with 'medicos' data
});


router.get('/:id_medico', function(req, res) {
    var id_medico = req.params.id_medico; // Usando id_medico como parâmetro
    medico.findOne({ id_medico: id_medico }, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('medicos_id', { medico: data }); // Renderiza a pagina 'medicos_id' view com os dados do médico selecionado
    });
});


router.post("/", function(req, res) {
    var obj = req.body;
    var model = new medico(obj);
    model.save(function(err) {
        if (err) {
            res.send("error");
            return;
        }
        res.send("criado com sucesso");
    })
})


router.post("/:id_medico", function(req, res) {
    var id_medico = req.params.id_medico;
    var obj = req.body;

    medico.findOneAndUpdate({id_medico:id_medico}, obj, function(err) {
        if (err) {
            res.send("error");
            return;
        }
        res.send("actualizado com sucesso");
    })
})



router.delete("/:id", function(req, res) {
    var id = req.params.id;

    medico.findByIdAndRemove(id, function(err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.send(data);
    })
})

module.exports = router;
