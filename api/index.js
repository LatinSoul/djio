const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')
const { createToken } = require('./utils/jwt')
const errorHandler = require('./utils/errorHandler')
const User = require('./models/User')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

// MongoDB connexion
mongoose.connect(process.env.MONGO_DB_URI)
    .then((result) => { console.log('Successfully connected to DJIO database') })
    .catch((err) => console.log('db conn err:', err))

// Auth routes
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body
  try {
      const user = await User.create({ email, password })
      res.status(201).json({ user: user._id })
  } catch (err) {
      const errors = errorHandler(err)
      res.status(400).json({ errors })
  }
})
app.post('/api/login', async (req, res) => {
  const { email,password } = req.body
  try {
      const user = await User.findOne({ email })
      const token = createToken(user._id)
      res.cookie('user', user, { httpOnly: true })
      res.status(200).json({ token })
  } catch (err) {
      const errors = errorHandler(err)
      res.status(400).json({ errors })
  }
})
app.get('/api/logout', (req, res) => {
  res.status(200).json({ status: 'OK' })
})
app.get('/api/user', (req, res) => {
  const user = req.cookies['user']
  res.status(200).json({ user: user })
})

module.exports = app