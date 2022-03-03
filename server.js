const express = require('express')
const morgan = require('morgan')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql
const { graphqlHTTP } = require('express-graphql')

const db = require('./db')

const PORT = process.env.PORT || 3000
const app = express()

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: GraphQLList(UserType),
      args: null,
      resolve(parent, args) {
        return db.select().from('founders')
      }
    },

    getUserbyID: {
      type: UserType,
      args: { id: {type: GraphQLInt}},
      resolve(parent, args){
        return db.select().from('founders').where('id',args.id)
      }  
    }
  }
})
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        db('founders').insert({ name: args.name }).returning('*')
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))
/*
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
})*/

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`))
