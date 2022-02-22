const db = require('../db')

;(async () => {
  try {
    await db('founders').insert({ name: 'Abhishek Sharma' })
    await db('founders').insert({ name: 'Ruchi Purohit' })
    await db('founders').insert({ name: 'Roshan Alexander' })
    console.log('Added founders!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
