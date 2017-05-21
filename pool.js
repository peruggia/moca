var mysql = require('mysql'),
  pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moca'
  });

module.exports = pool;