const express = require('express')
const morgan = require('morgan')

const db = require('./db')

const PORT = process.env.PORT || 3000
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/founders', async (req, res) => {
  const founders = await db.select().from('founders')
  res.json(founders)
})

app.get('/founders/:id', async (req, res) => {
  const founder = await db.select('name').from('founders').where('id', req.params.id)
  res.send(founder)
})

app.post('/founders', async (req, res) => {
  const founder = await db('founders').insert({ name: req.body.name }).returning('*')
  res.json(founder)
})

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`))
