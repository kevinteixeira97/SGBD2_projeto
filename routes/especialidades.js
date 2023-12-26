var express = require('express'),
    router = express.Router(),
    especialidade = require('../models/especialidade.js');



router.get('/', function(req, res) {
    especialidade.find({}, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('crudEspecialidadesRead', { especialidades: data }); // Render 'index' view with 'especialidades' data
    });
});

router.get('/create', function(req, res) {

    res.render('crudEspecialidadesCreate'); // Render 'index' view with 'medicos' data

});


router.get('/update', function(req, res) {
    especialidade.find({}, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('crudEspecialidadesUpdate', { especialidades: data });
    });
});

router.get('/delete', function(req, res) {
    especialidade.find({}, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('crudEspecialidadesDelete', { especialidades: data }); // Pass 'especialidades' data to the 'especialidades_delete' view
    });
});















router.get('/:id', function(req, res) {
    var id = req.params.id;
    especialidade.findOne({"especialidades.id_especialidade": id}, {'especialidades.$': 1}, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('crudEspecialidadesReadId', { especialidade: data.especialidades[0] });
    });
});

router.post("/create", function(req, res) {
    var obj = req.body;
    especialidade.findOne({ "especialidades.id_especialidade": obj.id_especialidade }, function(err, data) {
        if (err) {
            res.send("error");
            return;
        }
        if (data) {
            res.send(`
                <script>
                    alert("id_especialidade already exists");
                    window.location.href = '/especialidades';
                </script>
            `);
        }
        else {
            especialidade.findOneAndUpdate({}, { $push: { "especialidades": obj } }, { new: true, upsert: true }, function(err, data) {
                if (err) {
                    res.send("error");
                    return;
                }
                res.send(`
                    <script>
                        alert("criado com sucesso");
                        window.location.href = '/especialidades';
                    </script>
                `);
            });
        }
    });
});

router.post("/update", function(req, res) {
    var id_especialidade = req.body.id_especialidade;
    var obj = req.body;

    especialidade.findOneAndUpdate({"especialidades.id_especialidade": id_especialidade}, { $set: { "especialidades.$": obj } }, function(err, doc) {
        if (err) {
            res.send("error");
            return;
        }
        res.send(`
            <script>
                alert("atualizado com sucesso");
                window.location.href = '/especialidades';
            </script>
        `);
    })
});


router.post("/delete", function(req, res) {
    var id_especialidade = req.body.id_especialidade;

    especialidade.findOneAndUpdate({"especialidades.id_especialidade": id_especialidade}, { $pull: { "especialidades": { id_especialidade: id_especialidade } } }, function(err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.send(`
            <script>
                alert("apagado com sucesso");
                window.location.href = '/especialidades';
            </script>
        `);
    })
});



module.exports = router;
