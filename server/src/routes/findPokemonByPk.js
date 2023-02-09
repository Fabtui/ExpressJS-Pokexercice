const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if (pokemon === null) {
          const message = `The pokemon n°${req.params.id} doesn't exist`
          return res.status(404).json({message})
        }
        const message = 'Pokemon found'
        res.json({message, data: pokemon})
      })
      .catch(error => {
        const message = `Can't access to pokemon n°${req.params.id}, try again later`
        res.status(500).json({message, data: error})
      })
  })
}