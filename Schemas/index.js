const graphql = require('graphql')
const db = require('../db')

const { 
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList } = graphql; 

const UserType = require("./TypeDefs/UserType")


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      getAllUsers: {
        type: GraphQLList(UserType),
        args: null,
        resolve(parent, args) {
          return db.select().from('users')
        }
      },
  
      getUserbyID: {
        type: UserType,
        args: { id: {type: GraphQLInt}},
        resolve(parent, args){
          return db.select().from('users').where('id',args.id)
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
          db('users').insert({ name: args.name }).returning('*')
        }
      }
    }
  })
  
  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
  })