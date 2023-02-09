// fetch('http://localhost:3000/')
//   .then((res) => res.json())
//   .then((res) => console.log(res))

// Get JWT Token

fetch('http://localhost:3000/login', {
  method: "PUT",
  body: JSON.stringify({ username: "a", password: "a" }),
  headers: { "Content-type": "application/json" }
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    return res.token;
  })
  .then((token) => fetchPokemonlist(token))

// Get list
const fetchPokemonlist = (token) => {
  fetch('http://localhost:3000/api/pokemons', { headers: { Autorization: `Bearer ${token}` } })
  .then((res) => res.json())
  .then((res) => console.log(res))
}