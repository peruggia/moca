var express = require('express');
var router = express.Router();
var pool = require('../pool');

/* GET home page. */
router.get('/', function(req, res, next) {

  pool.getConnection(function (err, connection) {
    if (err) { throw err; }
    connection.query('SELECT u.*, c.nome AS condominio FROM unidade u, condominio c WHERE u.fk_unidade_condominio = c.uidpk', function (error, results, fields) {
      if (error) { throw error; }
      console.log(results);
      res.render('unidade', {page: 'unidade', unidades: results});
    });
  });

});
router.get('/incluir', function(req, res, next) {
  res.render('unidade_form', {page: 'unidade'});
});

module.exports = router;
