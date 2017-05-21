var express = require('express');
var router = express.Router();
var pool = require('../pool');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
