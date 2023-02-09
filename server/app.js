const express = require('express')
// const { success, geyUniqueId } = require('./helper')
const morgan = require('morgan')
const faveicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')

const app = express()
const port = 5000

//----------------MIDDLEWARE-------------------------

// app.use((err, req, res, next) => {
//   console.error(err)
//   console.log('date', Date.now());
//   next();
// })

// app.use((req, res, next) => {
//   console.log(`URL : ${req.url}`);
//   next()
// })

app
  .use(faveicon(__dirname + '/favicon.ico'))
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(cors())


//-------------------INIT SEQUELIZE DB---------------------------


sequelize.initDb()


//------------------------------ROUTES-------------------------

// // root
// app.get('/', (req, res) => {
//   res.send('Hello world')
// })

// //pokemon index
// app.get('/api/pokemons', (req, res) => {
//   const message = `${pokemons.length} found`
//   res.json(success(message, pokemons))
// })

// // pokemon show
// app.get('/api/api/pokemons/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemon = pokemons.find((pokemon) => pokemon.id === id)
//   const message = `pokemon n°${pokemon.name} found`
//   res.json(success(message, pokemon))
// })

// // pokemon create
// app.post('/api/pokemons', (req, res) => {
//   const id = geyUniqueId(pokemons)
//   const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
//   pokemons.push(pokemonCreated)
//   const message = `The pokemon ${pokemonCreated.name} has been created`
//   res.json(success(message, pokemonCreated ))
// })

// //pokemon update
// app.put('/api/api/pokemons/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemonUpdated =  {...req.body, id: id}
//   pokemons = pokemons.map(pokemon => {
//     return pokemon.id === id ? pokemonUpdated : pokemon
//   })
//   const message = `Pokemon ${pokemonUpdated.name} has been updated`
//   res.json(success(message, pokemonUpdated))
// })

// app.delete('/api/api/pokemons/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id)
//   pokemons.filter(pokemon => pokemon.id != id )
//   const message = `Pokemon ${pokemonDeleted.name} has been deleted`
//   res.json(success(message, pokemonDeleted))
// })

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

//------------------------------EAL WITH 404 ERRORS-------------------------
 app.use(({res}) => {
  const message = 'Page not found!'
  res.status(404).json(message)
})

app.listen(port, () => {console.log(`Hello from localhost:${port}`);})