var express = require('express'),
    router = express.Router(),
    utente = require('../models/utente.js');
const medico = require("../models/medico");


router.get('/', function(req, res) {
    utente.find({}, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('crudUtentesRead', { utentes: data }); // Render 'index' view with 'utentes' data
    });
});

router.get('/:id_utente', function(req, res) {
    var id_utente = req.params.id_utente;
    utente.findOne({ id_utente: id_utente }, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('crudUtentesReadId', { utente: data }); // Renderiza a pagina 'utentes_id' view com os dados do utente selecionado
    });
});

router.get('/create', function(req, res) {
    res.render('crudUtentesCreate'); // Render 'index' view with 'medicos' data
});

router.get('/update', function(req, res) {
    utente.find({}, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('crudUtentesUpdate', { utentes: data }); // Pass 'utentes' data to the 'utentes_update' view
    });

});

router.get('/delete', function(req, res) {
    utente.find({}, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('crudUtentesDelete', { utentes: data }); // Pass 'utentes' data to the 'utentes_update' view
    });
});












router.post("/create", function(req, res) {
    var obj = req.body;
    utente.findOne({ id_utente: obj.id_utente }, function(err, existingUtente) {
        if (err) {
            res.send("error");
            return;
        }
        if (existingUtente) {
            res.send(`
                <script>
                    alert("Um utente com este id ja existe");
                    window.location.href = '/utentes/create';
                </script>
            `);
            return;
        }
        var model = new utente(obj);
        model.save(function(err) {
            if (err) {
                res.send("error");
                return;
            }
            res.send(`
                <script>
                    alert("criado com sucesso");
                    window.location.href = '/utentes';
                </script>
            `);
        });
    });
});

/*
router.post("/create", function(req, res) {
    var obj = req.body;
    var model = new utente(obj);
    model.save(function(err) {
        if (err) {
            res.send("error");
            return;
        }
        //res.send("criado com sucesso");
        res.send(`
            <script>
                alert("criado com sucesso");
                window.location.href = '/utentes';
            </script>
        `);
    })
})


*/


router.post("/update", function(req, res) {
    var id_utente = req.body.id_utente;
    var obj = req.body;

    utente.findOneAndUpdate({id_utente:id_utente}, obj, function(err, doc) {
        if (err) {
            res.send("error");
            return;
        }
        //res.send("actualizado com sucesso");
        res.send(`
            <script>
                alert("actualizado com sucesso");
                window.location.href = '/utentes';
            </script>
        `);
    })
})


router.post("/delete", function(req, res) {
    var id_utente = req.body.id_utente;

    utente.findOneAndRemove({id_utente:id_utente}, function(err, data) {
        if (err) {
            res.send("error");
            return;
        }
        //res.send("apagado com sucesso");
        res.send(`
            <script>
                alert("apagado com sucesso");
                window.location.href = '/utentes';
            </script>
        `);
    })
})

module.exports = router;
