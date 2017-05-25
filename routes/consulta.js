var express = require('express');
var router = express.Router();
var pool = require('../pool');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('consulta', {page: 'consulta'});
});

module.exports = router;
