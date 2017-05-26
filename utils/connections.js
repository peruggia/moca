'use strict';
var pool = require('../pool');

module.exports = {
  getCondominios: function (callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      connection.query('SELECT * FROM condominio', function (error, results) {
        if (error) { throw error; }
        callback(error, results);
      });
    });
  },
  getColetores: function (callback) {
    pool.getConnection(function (err, connection) {
      if (err) { throw err; }
      connection.query('SELECT * FROM modulo_coletor', function (error, results) {
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
        if (error) { throw error; }
        callback(error, results);
      });
    });
  }
};