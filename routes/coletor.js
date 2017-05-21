var express = require('express');
var router = express.Router();
var pool = require('../pool');

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) { throw err; }
    connection.query('SELECT * FROM modulo_coletor', function (error, results, fields) {
      connection.release();
      if (error) { throw error; }
      res.render('coletor', {page: 'coletor', coletores: results});
    });
  });
});
router.get('/incluir', function(req, res, next) {
  res.render('coletor_form', {page: 'coletor'});
});

module.exports = router;
