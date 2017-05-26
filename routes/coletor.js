var express = require('express');
var router = express.Router();
var pool = require('../pool');
var connections = require('../utils/connections');
var condominios = [], unidades = [];

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
    unidades = results;
    loadFormData(res, false);
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
    res.render('coletor_form', {page: 'coletor', condominios: condominios, unidades: unidades, success: success});
  }
}

module.exports = router;
