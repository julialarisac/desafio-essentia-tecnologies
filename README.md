## Sobre o projeto.

Esse desafio me fez perceber como eu gosto de programar. 

Não tenho experencia com node, já tinha visto algumas coisas em cursos, mas nunca tinha feito um projeto. 
Segui vários vídeos no youtube de como fazer a integração (incrivelmente não existe 1 com angular) então fiz de uma maneira que julguei ser a mais correta com base no que vi, pode ser que para vocês não faça muito sentido, mas para mim fez.
Não me arrisquei fazendo várias funcionalidades pois eu só tinha tempo para fazer de noite, então fiz algo simples mas funcional. Pensei em todos os casos que poderia dar erro, que o usuário pudesse fazer errado e tentei contornar.
A parte do angular e do MySQL foi mais fácil para mim, já trabalhei com os dois quando era estágiaria, o desafio mesmo foi me adaptar a nova versão do angular, trabalhei por muito tempo com a versão 11, devo admitir que gostei bastante de como ele está agora.

A parte que mais tive dificuldade foi incrivelmente no angular, o meu lista.ts deu alguns bugs e demorei bastante para resolver eles, até que percebi que meu get pendentes estava incorreto, além do HTML do lista.html.

Se tivesse mais tempo eu não faria os alerts, usaria modals. Faria mais validações e iria incrementar mais funcionalidades como um campo de data e descrição da tarefa.

De qualquer forma, me diverti bastante fazendo o desafio, espero que gostem!

Ps: Sei que não sou muito boa criando nome de variavel, comecei com o português e do nada ia pro inglês, fora que fiz o front todo primeiro e depois percebi um erro no ListaItens.interface.ts e tive que tratar para poder ir corretamente pro meu backend.

## Como instalar o projeto Angular:

Abra um terminal na pasta do projeto (pasta que contém o `angular.json`) — no seu caso:

```powershell
cd "C:\Users\Pichau\Desktop\Lista Telefonica\lista-de-tarefas"
```

Em seguida instale as dependências:

```bash
npm install
```

## Rodar em modo de desenvolvimento

```bash
ng serve
```

## Node.js:
# Backend - Lista de Tarefas

API REST para gerenciar listas de tarefas com Node.js e MySQL.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v16 ou superior) - [Download](https://nodejs.org/)
- **MySQL Server** - [Download](https://www.mysql.com/downloads/)
- **npm** (vem com Node.js)

## 🚀 Como Rodar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=listaDeTarefa_db
PORT=3000
```

**Nota:** Substitua `sua_senha_aqui` pela senha do MySQL que você configurou.

### 3. Criar o Banco de Dados

Abra o MySQL e execute:

```sql
CREATE DATABASE listaDeTarefa_db;

USE listaDeTarefa_db;

CREATE TABLE listaDeTarefa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nomeLista VARCHAR(255) NOT NULL,
  concluida BOOLEAN DEFAULT FALSE,
  dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Iniciar o Servidor

Para desenvolvimento com auto-reload:

```bash
npm run dev
```

Ou simplesmente rodar:

```bash
node server.js
```

O servidor estará rodando em: **http://localhost:3000**

## 📡 Endpoints Disponíveis

### Criar Lista
- **POST** `/lista`
- Body: `{ "nomeLista": "Minha Lista" }`

### Listar Todas
- **GET** `/lista`

### Atualizar Lista
- **PUT** `/lista/:id`
- Body: `{ "nomeLista": "Novo Nome", "concluida": true }`

### Deletar Uma Lista
- **DELETE** `/lista/:id`

### Deletar Todas
- **DELETE** `/lista`

## 🔧 Scripts Disponíveis

```bash
npm start     # Roda o servidor normalmente
npm run dev   # Roda com nodemon (auto-reload)
```

## ⚠️ Troubleshooting

**Erro: "ECONNREFUSED"**
- Certifique-se de que o MySQL está rodando
- Verifique as credenciais no `.env`

**Erro: "ER_BAD_DB_ERROR"**
- O banco de dados não existe. Execute os comandos SQL na seção "Criar o Banco de Dados"

**Erro: "MODULE_NOT_FOUND"**
- Rode `npm install` para instalar as dependências

## 📦 Dependências

- **express** - Framework web
- **cors** - Habilita requisições cross-origin
- **mysql2** - Driver MySQL
- **dotenv** - Carrega variáveis de ambiente
- **nodemon** - Auto-reload em desenvolvimento (dev)

---

**Autor:** Backend Lista Telefonica  
**Versão:** 1.0.0
