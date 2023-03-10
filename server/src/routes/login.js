const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (app) => {
  app.put('/login', (req, res) => {
    User.findOne({where: {username: req.body.username}})
    
    .then(user => {
  
      if (!user) {
        const message = 'User does not exist'
        return res.status(404).json({message})
      }

      bcrypt.compare(req.body.password, user.password)
      .then(isPasswordValid => {
        if (!isPasswordValid) {
          const message = 'Incorrect password'
          return res.status(401).json({message})
        }

        const token = jwt.sign(
          { userId: user.id },
          privateKey,
          { expiresIn: '24h' }
        )

        const message = 'Login successfully'
        return res.json({message: message, data: user, token})
      })
    })
    .catch(error => {
      const message = 'Login failed'
      return res.json({message, data: error}) 
    })
  })
} 