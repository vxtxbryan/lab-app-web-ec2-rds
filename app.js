require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json()); // para ler JSON no body das requisições

// Criando pool de conexões com MySQL RDS
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testando conexão ao iniciar
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erro ao conectar no MySQL RDS:', err);
    process.exit(1); // sai da aplicação se não conectar
  }
  console.log('✅ Conectado ao MySQL RDS');
  connection.release(); // devolve conexão ao pool
});

// Rota principal
app.get('/', (req, res) => {
  res.send('Aplicação rodando na EC2 com RDS!');
});

// Rota para listar todos os usuários
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('❌ Erro ao consultar banco:', err);
      return res.status(500).send('Erro ao consultar banco');
    }
    res.json(results);
  });
});

// Rota para criar um usuário via POST
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name e email são obrigatórios' });
  }

  db.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
    (err, results) => {
      if (err) {
        console.error('❌ Erro ao inserir usuário:', err);
        return res.status(500).send('Erro ao inserir usuário');
      }
      res.json({ id: results.insertId, name, email });
    }
  );
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Aplicativo rodando na porta ${PORT}`);
});

