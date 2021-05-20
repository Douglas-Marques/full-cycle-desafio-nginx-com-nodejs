const express = require('express')
const mysql = require('mysql')

const app = express()

const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const connection = mysql.createConnection(config)

connection.query("CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))")

const insertSQL = `INSERT INTO people(name) values('Douglas')`
connection.query(insertSQL)

app.get('/', (_, res) => {
  const selectSQL = `SELECT p.name FROM people p`
  connection.query(selectSQL, (err, results, _) => {
    if (err) res.send(`Error: ${err.message}`);

    res.send(`
      <h1>Full Cycle Rocks!</h1>

      <ul>
        ${results.map(result => `<li>${result.name}</li>`)}
      </ul>
    `)
  })
})

app.get('/close', () => {
  connection.end()

  res.send(`
    <h1>Full Cycle Rocks!</h1>
  
    <p>Connection closed<p>
  `);
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})
