'use strict';
var pool = require('../pool');

module.exports = {
  getCondominios: function (callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      connection.query('SELECT * FROM condominio', function (error, results) {
        connection.release();
        if (error) { throw error; }
        callback(error, results);
      });
    });
  },
  getColetores: function (callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      connection.query('SELECT * FROM modulo_coletor', function (error, results) {
        connection.release();
        if (error) { throw error; }
        callback(error, results);
      });
    });
  },
  getUnidades: function (condominioUidpk, callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      var sql = 'SELECT * FROM unidade';
      if (condominioUidpk) {
        sql += ' WHERE fk_unidade_condominio = ' + condominioUidpk;
      }
      connection.query(sql, function (error, results) {
        connection.release();
        if (error) { throw error; }
        callback(error, results);
      });
    });
  },
  getContasAgua: function (callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      var sql = `SELECT *,
        DATE_FORMAT(dt_leitura_anterior, \'%d/%m/%Y\') as dt_leitura_anterior,
        DATE_FORMAT(dt_fim_leitura, \'%d/%m/%Y\') as dt_fim_leitura,
        DATE_FORMAT(dt_ventimento, \'%d/%m/%Y\') as dt_ventimento
        FROM conta_agua`;
      connection.query(sql, function (error, results) {
        connection.release();
        if (error) { throw error; }
        callback(error, results);
      });
    });
  },
  getRateios: function (contaAguaId, callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      var sql = `SELECT r.*, u.nome FROM rateio r, unidade u WHERE r.fk_rateio_conta_agua = ${contaAguaId} AND r.fk_rateio_unidade = u.uidpk`;
      connection.query(sql, function (error, results) {
        connection.release();
        if (error) { throw error; }
        callback(error, results);
      });
    });
  },
  getTotalUnidades: function (condominioUidpk, callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      var sql = 'SELECT count(uidpk) as total FROM unidade WHERE tipo = \'residencia\' AND fk_unidade_condominio = ' + condominioUidpk;
      connection.query(sql, function (error, results) {
        connection.release();
        if (error) { throw error; }
        callback(error, results);
      });
    });
  },
  getTotalPercentualRateio: function (condominioUidpk, callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      var sql = 'SELECT sum(percentual_rateio) as total FROM unidade WHERE tipo = \'residencia\' AND fk_unidade_condominio = ' + condominioUidpk;
      connection.query(sql, function (error, results) {
        connection.release();
        if (error) { throw error; }
        callback(error, results);
      });
    });
  },
  setUnidade: function (unidade, callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      var sql = `UPDATE unidade SET percentual_rateio = ${unidade.percentual_rateio} WHERE uidpk = ${unidade.uidpk};`;
      connection.query(sql, function (error, results) {
        connection.release();
        if (error) { throw error; }
        callback(error, results);
      });
    });
  },
  getContaAgua: function (contaUidpk, callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      var sql = `SELECT * FROM conta_agua WHERE uidpk = ${contaUidpk};`;
      connection.query(sql, function (error, results) {
        connection.release();
        if (error) { throw error; }
        callback(error, results);
      });
    });
  },
  getTotalConsumoConta: function (contaAgua, callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      var sql = `
      SELECT SUM(c.quantidade) total
      FROM consumo c, unidade u
      WHERE c.dt_criacao > '${contaAgua.dt_leitura_anterior}'
      AND c.dt_criacao < '${contaAgua.dt_fim_leitura}'
      AND c.fk_consumo_unidade = u.uidpk
      AND u.fk_unidade_condominio = ${contaAgua.fk_conta_agua_condominio}
      `;
      console.log(sql);
      connection.query(sql, function (error, results) {
        connection.release();
        if (error) { throw error; }
        callback(error, results);
      });
    });
  },
  getConsumoUnidades: function (contaAgua, callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      var sql = `
      SELECT SUM(c.quantidade) quantidade, c.fk_consumo_unidade, u.percentual_rateio
      FROM consumo c, unidade u
      WHERE c.dt_criacao > '${contaAgua.dt_leitura_anterior}'
      AND c.dt_criacao < '${contaAgua.dt_fim_leitura}'
      AND u.tipo = 'residencia'
      AND c.fk_consumo_unidade = u.uidpk
      AND u.fk_unidade_condominio = ${contaAgua.fk_conta_agua_condominio}
      GROUP BY c.fk_consumo_unidade
      `;
      connection.query(sql, function (error, results) {
        connection.release();
        if (error) { throw error; }
        callback(error, results);
      });
    });
  },
  setRateio: function (rateio, callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      var sql = `INSERT INTO rateio VALUES (null, ${rateio.valor}, NOW(), ${rateio.contaAguaUidpk}, ${rateio.unidadeUidpk})`;
      connection.query(sql, function (error, results) {
        connection.release();
        if (error) { throw error; }
        callback(error, results);
      });
    });
  },
  getDashboard: function (callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      var sql = `
        SELECT c.*, u.nome, DATE_FORMAT(c.dt_criacao, '%H:%i:%s') time FROM consumo c, unidade u
        WHERE c.dt_criacao >= NOW() - INTERVAL 1 DAY
        AND c.fk_consumo_unidade = u.uidpk
      `;
      connection.query(sql, function (error, results) {
        connection.release();
        if (error) { throw error; }
        callback(error, results);
      });
    });
  }
};