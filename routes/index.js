var express = require('express'),
    router = express.Router(),
    medico = require('../models/medico.js');

router.get('/', function(req, res) {
    res.render('index'); // Render 'index' view with 'medicos' data
});



module.exports = router;
