var express = require('express'),
    router = express.Router(),
    utente = require('../models/utente.js');


router.get('/create', function(req, res) {

    res.render('utentes_create'); // Render 'index' view with 'medicos' data

});

router.get('/update', function(req, res) {

    res.render('utentes_update'); // Render 'index' view with 'medicos' data

});


router.get('/', function(req, res) {
    utente.find({}, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('utentes', { utentes: data }); // Render 'index' view with 'utentes' data
        //res.send(data);
    });
});








router.get('/:id_utente', function(req, res) {
    var id_utente = req.params.id_utente;
    utente.findOne({ id_utente: id_utente }, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('utentes_id', { utente: data }); // Renderiza a pagina 'utentes_id' view com os dados do utente selecionado
        //res.send(data);
    });
});


router.post("/", function(req, res) {
    var obj = req.body;
    var model = new utente(obj);
    model.save(function(err) {
        if (err) {
            res.send("error");
            return;
        }
        res.send("criado com sucesso");
    })
})


router.post("/:id_utente", function(req, res) {
    var id_utente = req.params.id_utente;
    var obj = req.body;

    utente.findOneAndUpdate({id_utente:id_utente}, obj, function(err) {
        if (err) {
            res.send("error");
            return;
        }
        res.send("actualizado com sucesso");
    })
})


router.delete("/:id", function(req, res) {
    var id = req.params.id;

    utente.findByIdAndRemove(id, function(err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.send(data);
    })
})

module.exports = router;
