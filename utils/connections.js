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
  }
};