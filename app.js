require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json()); // para ler JSON no body das requisições

// Conexão com o MySQL RDS
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) {
    console.error('❌ Erro ao conectar no MySQL RDS:', err);
    return;
  }
  console.log('✅ Conectado ao MySQL RDS');
});

// Rota principal
app.get('/', (req, res) => {
  res.send('Aplicação rodando na EC2 com RDS!');
});

// Rota para listar todos os usuários
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Erro ao consultar banco:', err);
      res.status(500).send('Erro ao consultar banco');
      return;
    }
    res.json(results);
  });
});

// Rota para criar um usuário via POST
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err);
      res.status(500).send('Erro ao inserir usuário');
      return;
    }
    res.json({ id: results.insertId, name, email });
  });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Aplicativo rodando na porta ${PORT}`);
});

