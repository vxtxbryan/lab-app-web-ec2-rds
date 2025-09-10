require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) {
    console.error('❌ Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('✅ Conectado ao MySQL com sucesso!');
});

app.get('/', (req, res) => {
  res.send('Aplicação rodando na EC2 com RDS!');
});

app.listen(3000, () => {
  console.log('🚀 App rodando na porta 3000');
});
