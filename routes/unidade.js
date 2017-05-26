var express = require('express');
var router = express.Router();
var pool = require('../pool');
var connections = require('../utils/connections');
var condominios, coletores;

/* GET home page. */
router.get('/', function(req, res) {

  pool.getConnection(function (err, connection) {
    if (err) { throw err; }
    connection.query('SELECT u.*, c.nome AS condominio FROM unidade u, condominio c WHERE u.fk_unidade_condominio = c.uidpk', function (error, results) {
      if (error) { throw error; }
      console.log(results);
      res.render('unidade', {page: 'unidade', unidades: results});
    });
  });

});
router.get('/incluir', function(req, res) {
  loadFormData(res, false);
});

// POSTS
router.post('/incluir', function(req, res) {
  console.log(req.body, res.body);
  pool.getConnection(function (err, connection) {
    if (err) { throw err; }
    var d = req.body;
    connection.query('INSERT INTO unidade VALUES (null, ?, ?, ?, NOW(), NOW(), ?)', [
      d.nome,
      d.tipo,
      parseInt(d.percentualRateio) / 100,
      d.condominioUidpk
    ], function (error) {
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
    connections.getColetores(function (error, results) {
      if (error) { throw error; }
      coletores = results;
      renderForm(res, success);
    });
  });
}

function renderForm(res, success) {
  if (condominios && coletores) {
    res.render('unidade_form', {page: 'unidade', condominios: condominios, coletores: coletores, success: success});
  }
}

module.exports = router;
