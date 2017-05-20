var express = require('express');
var router = express.Router();
var connection = require('../connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM modulo_coletor', function (error, results, fields) {
    if (error) { throw error; }
    console.log(results);
    res.render('coletor', {page: 'coletor', coletores: results});
  });
});
router.get('/incluir', function(req, res, next) {
  res.render('coletor_form', {page: 'coletor'});
});

module.exports = router;
