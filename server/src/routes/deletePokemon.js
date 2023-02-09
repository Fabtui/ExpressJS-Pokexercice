const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.delete('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      if (pokemon === null) {
        const message = `The pokemon n°${req.params.id} doesn't exist`
        return res.status(404).json({message})
      }
      const pokemonDeleted = pokemon
      return Pokemon.destroy({
        where: {id: pokemon.id}
      })
      .then(_ => {
        const message = `${pokemonDeleted.name} has been deleted`
        res.json({message, data: pokemonDeleted})
      })
      .catch(error => {
        const message = `Can't delete this pokemon`
        res.status(500).json({message, data: error})
      })
    })
  })
}