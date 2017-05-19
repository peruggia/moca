var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('conta_agua');
});
router.get('/incluir', function(req, res, next) {
  res.render('conta_agua_form');
});
router.get('/rateio/:contaAguaId', function(req, res, next) {
  res.render('rateio');
});

module.exports = router;
