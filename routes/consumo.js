var express = require('express');
var router = express.Router();
var pool = require('../pool');

/* GET home page. */
router.get('/:quantidade/sensor/:serial', function(req, res, next) {
  console.log(req.params);
  pool.getConnection(function (err, connection) {
    if (err) { throw err; }
    var d = req.params,
      query;
    if (d.quantidade === '0' || d.quantidade === '0_0' || d.quantidade === '0_00') {
      res.sendStatus(200);
      return;
    }
    d.quantidade = d.quantidade.replace('_', '.');
    query = 'INSERT INTO consumo VALUES (null, ?, NOW(), (SELECT uidpk FROM modulo_coletor WHERE modulo_coletor.serial = ?), (SELECT fk_modulo_coletor_unidade FROM modulo_coletor WHERE modulo_coletor.serial = ?))';
    connection.query(query, [d.quantidade, d.serial, d.serial], function (error) {
      if (error) { throw error; }
      res.sendStatus(200);
    });
  });
});

module.exports = router;
