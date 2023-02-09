const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')

module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if (req.query.name) {
      const limit = parseInt(req.query.limit) || 100
      const name = req.query.name

      if (name.length < 2) {
        const message = 'query must contain at least 2 letters'
        return res.status(400).json({message})
      }

      return Pokemon.findAndCountAll({
        where: {
          name: { [Op.like]: `%${name}%` } // advanced sequelize db search
        },
        order: ['id'],
        limit: limit
      })
      .then(({count, rows}) => {
        const message = `${count} pokemons found for search: ${name}`
        res.json({message, data: rows})
      })
    }
    
    Pokemon.findAll({order: ['id']})
      .then(pokemons => {
        const message = 'Pokemons found'
        res.json({message, data: pokemons})
      })
      .catch(error => {
        const message = "Can't access to pokemon's list"
        res.status(500).json({message, data: error})
      })
  })
}