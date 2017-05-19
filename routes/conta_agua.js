var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('conta_agua', {page: 'conta_agua'});
});
router.get('/incluir', function(req, res, next) {
  res.render('conta_agua_form', {page: 'conta_agua'});
});
router.get('/rateio/:contaAguaId', function(req, res, next) {
  res.render('rateio', {page: 'conta_agua'});
});

module.exports = router;
