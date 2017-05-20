var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('coletor', {page: 'coletor'});
});
router.get('/incluir', function(req, res, next) {
  res.render('coletor_form', {page: 'coletor'});
});

module.exports = router;
