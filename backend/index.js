const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'password123',
  database: 'counterdb'
};

app.post('/increment', async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute(
    'UPDATE counter SET value = value + 1 WHERE id = 1'
  );
  const [result] = await connection.execute(
    'SELECT value FROM counter WHERE id = 1'
  );
  await connection.end();
  res.json({ value: result[0].value });
});

app.get('/counter', async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  const [result] = await connection.execute(
    'SELECT value FROM counter WHERE id = 1'
  );
  await connection.end();
  res.json({ value: result[0].value });
});

app.listen(3000, () => console.log('Backend running on port 3000'));