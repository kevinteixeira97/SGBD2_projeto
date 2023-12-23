var express = require('express'),
    router = express.Router(),
    medico = require('../models/medico.js');

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


router.post("/:id", function(req, res) {
    var id = req.params.id;
    var obj = req.body;

    medico.findByIdAndUpdate(id, obj, function(err) {
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
