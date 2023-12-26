var express = require('express'),
    router = express.Router(),
    medico = require('../models/medico.js');
const utente = require("../models/utente");
var especialidadeModel = require('../models/especialidade');


router.get('/', function(req, res) {
    medico.find({}, async function (err, medicos) {
        if (err) {
            res.send("error");
            return;
        }
        for (let medico of medicos) {
            await especialidadeModel.findOne({ "especialidades.id_especialidade": medico.especialidade_id }, function(err, data) {
                if (err) {
                    console.log("error");
                    return;
                }
                var especialidade = data.especialidades.find(e => e.id_especialidade === medico.especialidade_id);
                medico.especialidade_descricao = especialidade.descricao;
                medico.especialidade_nome = especialidade.nome;
            });
        }
        res.render('crudMedicosRead', { medicos: medicos }); // Pass 'medicos' data to the 'medicos' view
    });
});

router.get('/:id_medico', function(req, res) {
    var id_medico = req.params.id_medico; // Using id_medico as parameter
    medico.findOne({ id_medico: id_medico }, async function (err, medicoData) {
        if (err) {
            res.send("error");
            return;
        }
        await especialidadeModel.findOne({ "especialidades.id_especialidade": medicoData.especialidade_id }, function(err, especialidadeData) {
            if (err) {
                res.send("error");
                return;
            }
            var especialidade = especialidadeData.especialidades.find(e => e.id_especialidade === medicoData.especialidade_id);
            medicoData.especialidade_nome = especialidade.nome;
            medicoData.especialidade_descricao = especialidade.descricao;
        });
        res.render('crudMedicosReadId', { medico: medicoData }); // Render 'medicos_id' view with the selected medico's data
    });
});

/*
router.get('/:id_medico', function(req, res) {
    var id_medico = req.params.id_medico; // Usando id_medico como parâmetro
    medico.findOne({ id_medico: id_medico }, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('crudMedicosReadId', { medico: data }); // Renderiza a pagina 'medicos_id' view com os dados do médico selecionado
    });
});
*/

router.get('/create', function(req, res) {

    res.render('crudMedicosCreate'); // Render 'index' view with 'medicos' data

});

router.get('/update', function(req, res) {
    medico.find({}, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('crudMedicosUpdate', { medicos: data }); // Pass 'utentes' data to the 'utentes_update' view
    });
});

router.get('/delete', function(req, res) {
    medico.find({}, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.render('crudMedicosDelete', { medicos: data }); // Pass 'utentes' data to the 'utentes_update' view
    });
});









router.post("/create", function(req, res) {
    var obj = req.body;
    medico.findOne({ id_medico: obj.id_medico }, function(err, existingMedico) {
        if (err) {
            res.send("error");
            return;
        }
        if (existingMedico) {
            res.send(`
                <script>
                    alert("Um medico com este id ja existe");
                    window.location.href = '/medicos/create';
                </script>
            `);
            return;
        }
        var model = new medico(obj);
        model.save(function(err) {
            if (err) {
                res.send("error");
                return;
            }
            res.send(`
                <script>
                    alert("criado com sucesso");
                    window.location.href = '/medicos';
                </script>
            `);
        });
    });
});



router.post("/update", function(req, res) {
    var id_medico = req.body.id_medico;
    var obj = req.body;

    medico.findOneAndUpdate({id_medico:id_medico}, obj, function(err, doc) {
        if (err) {
            res.send("error");
            return;
        }
        //res.send("actualizado com sucesso");
        res.send(`
            <script>
                alert("atualizado com sucesso");
                window.location.href = '/medicos';
            </script>
        `);
    })
})

router.post("/delete", function(req, res) {
    var id_medico = req.body.id_medico;

    medico.findOneAndRemove({id_medico:id_medico}, function(err, data) {
        if (err) {
            res.send("error");
            return;
        }
        //res.send("apagado com sucesso");
        res.send(`
            <script>
                alert("apagado com sucesso");
                window.location.href = '/medicos';
            </script>
        `);
    })
})


module.exports = router;
