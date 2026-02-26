import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './database.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post('/lista', (req, res) => {

  const { nomeLista } = req.body

  const sql = 'INSERT INTO listaDeTarefa (nomeLista) VALUES (?)'

  db.query(sql, [nomeLista], (err, result) => {

    if (err) return res.status(500).json(err)

    return res.status(201).json({
      id: result.insertId,
      nomeLista
    })

  })
})

app.get('/lista', (req, res) => {

  db.query('SELECT * FROM listaDeTarefa', (err, result) => {

    if (err) return res.status(500).json(err)

    res.json(result)

  })

})

app.put('/lista/:id', (req, res) => {
  const { id } = req.params;
  const { concluida, nomeLista } = req.body;

  const fields = [];
  const params = [];

  if (concluida !== undefined) {
    fields.push('concluida = ?');
    params.push(concluida);
  }

  if (nomeLista !== undefined) {
    fields.push('nomeLista = ?');
    params.push(nomeLista);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: 'Nenhum campo para atualizar' });
  }

  const sql = `UPDATE listaDeTarefa SET ${fields.join(', ')} WHERE id = ?`;
  params.push(id);

  db.query(sql, params, (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: 'Item atualizado' });
  });

});

app.delete('/lista/:id', (req, res) => {

  const { id } = req.params;

  const sql = 'DELETE FROM listaDeTarefa WHERE id = ?'

  db.query(sql, [id], (err, result) => {

    if (err) return res.status(500).json(err)

    return res.json({
      message: "Item deletado"
    })

  })

})

app.delete('/lista', (req, res) => {

  const sql = 'DELETE FROM listaDeTarefa'

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err)
    }

    return res.json({
      message: "Todos os itens foram deletados"
    })

  })

})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})