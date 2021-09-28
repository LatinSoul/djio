//Packages
const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express()

// MongoDB connexion
const dbURI = process.env.MONGO_DB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then((result) => { console.log('Successfully connected to DJIO database') })
    .catch((err) => console.log('db conn err:', err))

// Internal Resources
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
// const projectRoutes = require('./routes/projectRoutes')
// const contentRoutes = require('./routes/contentRoutes')
// const mailerRoutes = require('./routes/mailerRoutes')

// Middleware resources
app.use(cookieParser())
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
// app.use('/project', projectRoutes)
// app.use('/content', contentRoutes)
// app.use('/mailer', mailerRoutes)

module.exports = { path: '/api', handler: app }