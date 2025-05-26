const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Ajuste conforme seu ambiente
  password: "password", // Ajuste conforme sua senha
  database: "banco_teste_automacao",
});

// Conexão
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL!");
});

// ✅ Rota para popular a tabela com dados da API
app.get("/popular-usuarios", async (req, res) => {
  try {
    const response = await axios.get(
      "https://n8n.apptrix.app/webhook/a1841391-56ad-4a75-bfeb-e005b673c756"
    );
    const usuarios = response.data;

    for (const usuario of usuarios) {
      const { id, name, email, userName, Password } = usuario;

      const sql =
        "INSERT IGNORE INTO usuarios (id, name, email, userName, Password) VALUES (?, ?, ?, ?, ?)";
      db.query(sql, [id, name, email, userName, Password], (err, result) => {
        if (err) console.error("Erro ao inserir:", err);
      });
    }

    res.send("Tabela usuarios populada com sucesso!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao obter ou inserir dados.");
  }
});

// ✅ Rota para inserir um novo usuário
app.post("/usuarios", (req, res) => {
  const { id, name, email, userName, Password } = req.body;

  const sql =
    "INSERT INTO usuarios (id, name, email, userName, Password) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [id, name, email, userName, Password], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).send("Usuário já existe.");
      }
      console.error(err);
      return res.status(500).send("Erro ao inserir usuário.");
    }

    res.status(201).send("Usuário inserido com sucesso.");
  });
});

// ✅ Rota para deletar usuário
app.delete("/usuarios/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM usuarios WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao deletar usuário.");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Usuário não encontrado.");
    }

    res.send("Usuário deletado com sucesso.");
  });
});

// ✅ Rota para listar usuários
app.get("/usuarios", (req, res) => {
  const sql = "SELECT * FROM usuarios";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao buscar usuários.");
    }

    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// ✅ Rota para inserir pedido
app.post("/pedido", (req, res) => {
  const { numero_pedido, usuario_id, codigo_rastreamento } = req.body;

  const sql =
    "INSERT INTO Pedido (numero_pedido, usuario_id, codigo_rastreamento) VALUES (?, ?, ?)";

  db.query(
    sql,
    [numero_pedido, usuario_id, codigo_rastreamento],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir pedido:", err);
        return res.status(500).send("Erro ao inserir pedido.");
      }
      res.status(201).send("Pedido inserido com sucesso.");
    }
  );
});

// ✅ Rota para atualizar cor do produto
app.put("/produtos/:id/cor", (req, res) => {
  const id = req.params.id;
  const { COLOR } = req.body;

  if (!COLOR) {
    return res.status(400).send("Nova cor é obrigatória.");
  }

  const sql = "UPDATE produtos SET COLOR = ? WHERE IDMASSAS = ?";
  db.query(sql, [COLOR, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar cor:", err);
      return res.status(500).send("Erro ao atualizar cor do produto.");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Produto não encontrado.");
    }
    res.send("Cor do produto atualizada com sucesso.");
  });
});
