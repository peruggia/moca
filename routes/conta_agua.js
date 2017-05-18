var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('conta_agua');
});
router.get('/incluir', function(req, res, next) {
  res.render('conta_agua_form');
});

module.exports = router;
