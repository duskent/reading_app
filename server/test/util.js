import dotenv from 'dotenv'
dotenv.load()

import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

process.env.NODE_ENV = 'test'

const config = {
  db: {
    test: process.env.TEST_DB,
  },
  connection: null,
}

function connect() {
  return new Promise((resolve, reject) => {
    if (config.connection) {
      return resolve()
    }

    const mongoUri = process.env.TEST_DB

    mongoose.Promise = Promise

    const options = {
      server: {
        auto_reconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
      },
    }

    mongoose.connect(mongoUri, options)

    config.connection = mongoose.connection

    config.connection
      .once('open', resolve)
      .on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
          console.log(e)

          mongoose.connect(mongoUri, options)
        }

        console.log(e)
        reject(e)
      })
  })
}

function clearDatabase() {
  return new Promise(resolve => {
    let cont = 0
    let max = Object.keys(mongoose.connection.collections).length
    for (const i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {
        cont++
        if(cont >= max) {
          resolve()
        }
      })
    }
  })
}

const setupTest = async () => {
  await connect()
  await clearDatabase()
}

export default setupTest
