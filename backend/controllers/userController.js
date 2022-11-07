const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
  const { email, password } = req.body
  const hash = await bcrypt.hash(password, 10)

  const userCreated = await UserModel.create({ email, password: hash })

  res.json({ user: userCreated })
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if(!email || !password) {
      res.status(400)
      throw new Error("Please add all fields")
    }

    const user = await UserModel.findOne({ email })
    
    if(!user) {
      res.status(401)
      throw new Error("Credentials are not correct")
    }

    const hash = await bcrypt.compare(password, user.password)

    if(!hash) {
      res.status(401)
      throw new Error("Credentials are not correct")
    }
  
    res.status(200)
    res.json({ userId: user._id, token: jwt.sign({ userId: user._id }, "bella123", { expiresIn: '24h' }) })
    
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message })
  }
}

module.exports = {
  signup,
  login
}
