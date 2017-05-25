var express = require('express');
var router = express.Router();
var pool = require('../pool');

var monthToNumber = {
  'janeiro': 1,
  'fevereiro': 2,
  'março': 3,
  'abril': 4,
  'maio': 5,
  'junho': 6,
  'julho': 7,
  'agosto': 8,
  'setembro': 9,
  'outubro': 10,
  'novembro': 11,
  'dezembro': 12
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('conta_agua', {page: 'conta_agua'});
});
router.get('/incluir', function(req, res) {
  pool.getConnection(function (err, connection) {
    if (err) { throw err; }
    connection.query('SELECT * FROM condominio', function (error, results) {
      if (error) { throw error; }
      res.render('conta_agua_form', {page: 'conta_agua', condominios: results});
    });
  });
});
router.get('/rateio/:contaAguaId', function(req, res) {
  res.render('rateio', {page: 'conta_agua'});
});

// POSTS
router.post('/incluir', function(req, res) {
  console.log(req.body, res.body);
  pool.getConnection(function (err, connection) {
    if (err) { throw err; }
    var d = req.body;
    connection.query('INSERT INTO conta_agua VALUES (null, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)', [
      monthToNumber[d.mesReferencia.toLowerCase()],
      new Date(d.dtLeituraAnterior),
      new Date(d.dtFimLeitura),
      new Date(d.dtVencimento),
      d.valor,
      d.codigo,
      d.condominioUidpk
    ], function (error) {
      if (error) { throw error; }
      connection.query('SELECT * FROM condominio', function (error, results) {
        if (error) { throw error; }
        res.render('conta_agua_form', {page: 'conta_agua', condominios: results, success: true});
      });
    });
  });
});

module.exports = router;
