var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('condominio', {page: 'condominio'});
});
router.get('/incluir', function(req, res, next) {
  res.render('condominio_form', {page: 'condominio'});
});

module.exports = router;
