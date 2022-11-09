const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers
    if(!authorization) throw new Error("Not authorized, No token !")

    const token = authorization.split(" ")[1]
    
    const decodedToken = jwt.verify(JSON.parse(token), "bella123")
    const userId = decodedToken.userId
    req.auth = { userId }

    next()
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}
