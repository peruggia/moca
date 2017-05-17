/* jshint esversion: 6 */
let express = require('express'),
  mysql = require('mysql'),
  app = express().set('view engine', 'pug'),
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'girafa',
    database: 'water'
  });

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.get('/consumo/:quantidade', function (req, res) {
  let quantidade = req.params.quantidade;
  connection.connect();
  connection.query(`INSERT INTO consumo (quantidade, dt_inicio, dt_fim, modulo_coletor_id) VALUES ('${quantidade}', NOW(), NOW(), 1);`, function (error, results, fields) {
    if (error) throw error;
    res.send(`A quantidade ${quantidade} foi adicionada com sucesso!`);
  });
  connection.end();
});

app.listen(3000);
