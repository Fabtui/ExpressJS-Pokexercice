const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./pokemons')
const bcryp = require('bcrypt')

const sequelize = new Sequelize(
  'nodejs2',
  'root',
  '02Janvier1952',
  {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2'
    }, 
    logging: false
  }
)

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  sequelize.sync({force: true})
  .then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create(
        {
          name: pokemon.name,
          hp: pokemon.hp,
          cp: pokemon.cp,
          picture: pokemon.picture,
          types: pokemon.types,
         }
      )
      // .then(pokemon => console.log('db initialized'))
    })

    bcryp.hash('a', 10)
      .then(hash => {
        User.create({
          username: 'a',
          password: hash
        })
        .then(user => console.log(user.toJSON()))
      })
  })

}

module.exports = { initDb, Pokemon, User }