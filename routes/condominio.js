var express = require('express');
var router = express.Router();
var pool = require('../pool');

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) { throw err; }
    connection.query('SELECT *, DATE_FORMAT(dt_criacao, \'%d/%m/%Y\') as dt_criacao_formatada FROM condominio', function (error, results, fields) {
      if (error) { throw error; }
      res.render('condominio', {page: 'condominio', condominios: results});
    });
  });
});
router.get('/incluir', function(req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) { throw err; }
    connection.query('SELECT * FROM unidade', function (error, results) {
      if (error) { throw error; }
      res.render('condominio_form', {page: 'condominio', unidades: results});
    });
  });
});
router.post('/incluir', function(req, res, next) {
  console.log(req.body, res.body);
  pool.getConnection(function (err, connection) {
    if (err) { throw err; }
    var d = req.body;
    connection.query('INSERT INTO condominio VALUES (null, ?, ?, ?, ?)', [d.nome, d.endereco, new Date(), new Date()], function (error) {
      if (error) { throw error; }
      res.render('condominio_form', {page: 'condominio', success: true});
    });
  });
});

module.exports = router;
