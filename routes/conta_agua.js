var express = require('express');
var router = express.Router();
var pool = require('../pool');
var connections = require('../utils/connections');

var monthToNumber = {
  'janeiro': 1,
  'fevereiro': 2,
  'março': 3,
  'abril': 4,
  'maio': 5,
  'junho': 6,
  'julho': 7,
  'agosto': 8,
  'setembro': 9,
  'outubro': 10,
  'novembro': 11,
  'dezembro': 12
};

// Dados usados para o rateio
var contaAgua, consumos, consumoTotal;

/* GET home page. */
router.get('/', function(req, res) {
  connections.getContasAgua(function (error, results) {
    if (error) { throw error; }
    res.render('conta_agua', {page: 'conta_agua', contas: results});
  });
});
router.get('/incluir', function(req, res) {
  pool.getConnection(function (err, connection) {
    if (err) { throw err; }
    connection.query('SELECT * FROM condominio', function (error, results) {
      connection.release();
      if (error) { throw error; }
      res.render('conta_agua_form', {page: 'conta_agua', condominios: results});
    });
  });
});
router.get('/rateio/:contaAguaId', function(req, res) {
  connections.getRateios(req.params.contaAguaId, function (error, results) {
    if (error) { throw error; }
    res.render('rateio', {page: 'conta_agua', rateios: results});
  });
});

// POSTS
router.post('/incluir', function(req, res) {
  pool.getConnection(function (err, connection) {
    if (err) { throw err; }
    var d = req.body;
    connection.query('INSERT INTO conta_agua VALUES (null, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)', [
      monthToNumber[d.mesReferencia.toLowerCase()],
      new Date(d.dtLeituraAnterior),
      new Date(d.dtFimLeitura),
      new Date(d.dtVencimento),
      d.valor,
      d.codigo,
      d.condominioUidpk
    ], function (error, result) {
      if (error) { throw error; }
      var contaAguaId = result.insertId;
      connection.query('SELECT * FROM condominio', function (error, results) {
        connection.release();
        if (error) { throw error; }
        res.render('conta_agua_form', {page: 'conta_agua', condominios: results, success: true});
        iniciaCalculoRateio(contaAguaId);
      });
    });
  });
});

function iniciaCalculoRateio(contaAguaId) {
  contaAgua = null;
  consumos = null;
  consumoTotal = null;
  connections.getContaAgua(contaAguaId, function (error, results) {
    if (error) { throw error; }
    contaAgua = results[0];
    formatDatas();
    connections.getTotalConsumoConta(contaAgua, function (error, results) {
      if (error) { throw error; }
      consumoTotal = parseFloat(results[0].total);
      calculaRateio();
    });
    connections.getConsumoUnidades(contaAgua, function (error, results) {
      if (error) { throw error; }
      consumos = results;
      calculaRateio();
    });
  });
}

function formatDatas() {
  contaAgua.dt_leitura_anterior = new Date(contaAgua.dt_leitura_anterior).toISOString();
  contaAgua.dt_fim_leitura = new Date(contaAgua.dt_fim_leitura).toISOString();
}

function calculaRateio() {
  if (contaAgua !== null && consumos !== null && consumoTotal !== null) {
    console.log('conta agua', contaAgua);
    console.log('consumoTotal', consumoTotal);
    console.log('consumos', consumos);
    var fc, frc, valor;
    consumos.forEach(function (consumo) {
      fc = parseFloat(consumo.quantidade) / consumoTotal;
      frc = fc + parseFloat(consumo.percentual_rateio);
      valor = parseFloat(contaAgua.valor) * (frc - 1);
      console.log('--------------- VALORES');
      console.log(valor);
      connections.setRateio({
        valor: valor,
        contaAguaUidpk: contaAgua.uidpk,
        unidadeUidpk: consumo.fk_consumo_unidade
      }, function () {});
    });
  }
}

module.exports = router;
