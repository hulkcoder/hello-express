const db = require('../db')

;(async () => {
  try {
    await db('users').insert({ name: 'Abhishek Sharma' })
    await db('users').insert({ name: 'Ruchi Purohit' })
    console.log('Added users!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
