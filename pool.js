var mysql = require('mysql'),
  pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moca'
  });

module.exports = pool;