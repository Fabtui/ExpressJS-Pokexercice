const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader) {
    const message = 'Not authorized'
    return res.status(401).json({message})
  }

  const token = authorizationHeader.split(' ')[1]  // authorization: Bearer 23nkfen345vejfirjgrlg
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      const message = 'user not autorized'
      return res.status(401).json({message})
    }

    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      const message = 'user not autorized'
      return res.status(401).json({message})
    } else {
      next()
    }
  })
}