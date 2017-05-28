var express = require('express');
var router = express.Router();
var connections = require('../utils/connections');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('consulta', {page: 'consulta'});
});

router.get('/dashboard', function(req, res) {
  connections.getDashboard(function (error, results) {
    if (error) { throw error; }
    //res.render('consulta', {page: 'consulta'});
    res.json(results);
  });
});

module.exports = router;
