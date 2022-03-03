const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

const { graphqlHTTP } = require('express-graphql')

const schema = require('./Schemas')


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`))