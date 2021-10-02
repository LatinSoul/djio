const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')

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
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send("All input is required")
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({status:400, message: "Invalid Email or Password"});
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({status:400, message: "Invalid Email or Password"});
    
    const token = createToken(user._id)
    res.cookie('user', user, { httpOnly: true })
    res.status(200).json({ token })
   
    // const user = await User.findOne({ email })
    // console.log('comparing password validity...')
    // if (user && (await bcrypt.compare(password, user.password))) {
    //   const token = createToken(user._id)
    //   res.cookie('user', user, { httpOnly: true })
    //   res.status(200).json({ token })
    // } else {
    //   res.status(200).json({ token })
    // }
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