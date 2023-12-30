require('dotenv').config()
//require mongoose module
import mongoose from 'mongoose'

//require chalk module to give colors to console text
import chalk from 'chalk'

//require database URL from properties file
// const dbURL = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@ecommerce.f2agf.mongodb.net/main?retryWrites=true&w=majority`
// const dbURL ='mongodb+srv://QuanNhat:220802@cluster0.8xgsxg5.mongodb.net/TestDB?retryWrites=true&w=majority'
const dbURL = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.iyvjeov.mongodb.net/TestDB?retryWrites=true&w=majority`
const connected = chalk.bold.cyan
const error = chalk.bold.yellow
const disconnected = chalk.bold.red
const termination = chalk.bold.magenta

//export this function and imported by server.js
export const connectMongoDB = () => {
  mongoose.connect(dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })

  mongoose.connection.on('connected', function () {
    console.log(
      connected('Mongoose default connection is open to MongoDB Atlas')
    )
  })

  mongoose.connection.on('error', function (err) {
    console.log(
      error('Mongoose default connection has occured ' + err + ' error')
    )
  })

  mongoose.connection.on('disconnected', function () {
    console.log(disconnected('Mongoose default connection is disconnected'))
  })

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log(
        termination(
          'Mongoose default connection is disconnected due to application termination'
        )
      )
      process.exit(0)
    })
  })
}

export const isValidId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id)
}
