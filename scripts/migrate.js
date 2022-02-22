const db = require('../db')

;(async () => {
  try {
    await db.schema.dropTableIfExists('founders')
    await db.schema.withSchema('public').createTable('founders', (table) => {
      table.increments()
      table.string('name')
    })
    console.log('Created founders table!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
