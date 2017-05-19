var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('unidade', {page: 'unidade'});
});
router.get('/incluir', function(req, res, next) {
  res.render('unidade_form', {page: 'unidade'});
});

module.exports = router;
