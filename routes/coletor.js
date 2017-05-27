var express = require('express');
var router = express.Router();
var pool = require('../pool');
var connections = require('../utils/connections');
var condominios = [], unidades = [],
  selectedCondominio = 0;

/* GET home page. */
router.get('/', function(req, res) {
  pool.getConnection(function (err, connection) {
    if (err) { throw err; }
    connection.query('SELECT * FROM modulo_coletor', function (error, results) {
      connection.release();
      if (error) { throw error; }
      res.render('coletor', {page: 'coletor', coletores: results});
    });
  });
});
router.get('/incluir', function(req, res) {
  loadFormData(res, false);
});
router.get('/incluir/:condominioUidpk', function(req, res) {
  connections.getUnidades(req.params.condominioUidpk, function (error, results) {
    if (error) { throw error; }
    selectedCondominio = req.params.condominioUidpk;
    unidades = results;
    loadFormData(res, false);
  });
});

router.post('/incluir/:condominioUidpk', function(req, res) {
  console.log(req.body, res.body);
  pool.getConnection(function (err, connection) {
    if (err) { throw err; }
    var d = req.body;
    connection.query('INSERT INTO modulo_coletor VALUES (null, ?, ?, \'ativo\', NOW(), NOW(), NOW(), ?)', [d.nome, d.serial, d.unidadeUidpk], function (error) {
      if (error) { throw error; }
      loadFormData(res, true);
    });
  });
});

function loadFormData(res, success) {
  pool.getConnection(function (err) {
    if (err) { throw err; }
    connections.getCondominios(function (error, results) {
      if (error) { throw error; }
      condominios = results;
      renderForm(res, success);
    });
  });
}

function renderForm(res, success) {
  if (condominios) {
    res.render('coletor_form', {page: 'coletor',
    condominios: condominios,
    unidades: unidades,
    selectedCondominio: selectedCondominio,
    success: success});
  }
}

module.exports = router;
