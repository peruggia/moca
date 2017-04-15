let express = require('express'),
  mysql = require('mysql')
  app = express(),
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'girafa',
    database: 'water'
  });

app.get('/consumo/:quantidade', function (req, res) {
  //res.send('Hello World!');
  let quantidade = req.params['quantidade'];
  connection.connect();
  connection.query(`INSERT INTO consumo (quantidade, dt_inicio, dt_fim, modulo_coletor_id) VALUES ('${quantidade}', NOW(), NOW(), 1);`, function (error, results, fields) {
    if (error) throw error;
    res.send(`A quantidade ${quantidade} foi adicionada com sucesso!`);
  });
  connection.end();
});

app.listen(3000);
