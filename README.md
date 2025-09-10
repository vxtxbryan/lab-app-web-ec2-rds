# lab-ap
# 🚀 Lab 2 – Aplicação Web Dinâmica na AWS (EC2 + RDS + CI/CD)

Este laboratório demonstra a implantação de uma aplicação **Node.js + Express** conectada a um banco **RDS MySQL** em uma instância **EC2**, com **CI/CD automatizado via GitHub Actions**.

---

## 🏗 Arquitetura

Navegador / Postman

v

EC2 (Node.js + PM2 + Nginx)

v

RDS MySQL

---

## 🛠 Serviços Utilizados

- **Amazon EC2** → Servidor web  
- **Amazon RDS (MySQL)** → Banco de dados gerenciado  
- **VPC & Security Groups** → Rede e firewall  
- **PM2** → Mantém a aplicação rodando
- **Nginx** → Reverse proxy
- **GitHub Actions** → CI/CD para deploy automático

---

## ⚙️ Pré-requisitos

- Conta AWS com EC2 e RDS configurados  
- Node.js e PM2 instalados na EC2
- PM2 instalado na EC2 (opcional, mas recomendado)  
- GitHub repository criado  
- SSH Key configurada na EC2 e adicionada como GitHub Secret  

---

## 🔑 Variáveis de Ambiente (.env)

Crie um arquivo `.env` baseado em `.env.example`:

```ini
DB_HOST=seu-endpoint-rds.amazonaws.com
DB_USER=seuusuario
DB_PASSWORD=sua_senha
DB_NAME=seudb
DB_PORT=suaport
```
---

## 🚦 Fluxo de Deploy
1. Alterações no branch **main** → push para o GitHub.
2. GitHub Actions roda build/test.
3. Workflow conecta via SSH à instância EC2.
4. Código é enviado para a pasta `/home/ubuntu/lab-app-web-ec2-rds`.
5. PM2 reinicia a aplicação automaticamente.

---

## 🔑 GitHub Secrets Necessários
- **EC2_HOST** → IP público ou DNS da EC2
- **EC2_USER** → `ubuntu` (para Ubuntu) ou `ec2-user` (Amazon Linux)
- **EC2_SSH_KEY** → chave privada SSH para conectar na EC2

---

## 📎 Testando a Aplicação
- `GET /` → retorna mensagem de status
- `GET /users` → lista usuários
- `POST /users` → cria novo usuário (`{ "name": "Victor", "email": "vxtxsilva@gmail.com" }`)

---

## 💡 Dicas
- Liberar portas 22 (SSH) e 3000 (Node.js) no Security Group da EC2
- Usar PM2 para manter aplicação rodando após fechar SSH
- Sempre usar .env.example no GitHub para segurança

---

✍️ Autor: Victor Oliveira



