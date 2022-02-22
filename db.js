const knex = require('knex')

module.exports = knex({
  client: 'postgres',
  connection: {
    host: 'db',
    user: 'postgres-docker',
    password: '123456',
    database: 'postgres-docker',
  },
})
