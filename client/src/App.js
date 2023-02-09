import React, { useEffect, useState } from 'react'
import { PokeCard } from './components/PokeCard'
import { TypesCards } from './components/TypesCards'
import './style/index.css'
import './style/types.css'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {

    fetch('http://localhost:5000/api/pokemons')
      .then(res => res.json())
      .then(data => {setBackendData(data)})
  }, [])

  const handleChange = (e) => {
    const limit = document.querySelector('#limit').value || 3000
    fetch(`http://localhost:5000/api/pokemons?name=${e.currentTarget.value}&limit=${limit}`)
    .then(res => res.json())
    .then(data => {setBackendData(data)})
  }

  const handleTypeClick = (type) => {
    if (type === "X") {
      const limit = document.querySelector('#limit').value || 3000
      fetch(`http://localhost:5000/api/pokemons?limit=${limit}`)
      .then(res => res.json())
      .then(data => {setBackendData(data)})
    } else {
      const limit = document.querySelector('#limit').value || 3000
      fetch(`http://localhost:5000/api/pokemons?type=${type}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {setBackendData(data)})
    }
  }

  return (
    <div className='App'>
    <h1>Pokéshlag</h1>
      <p>Search</p>
      <input onChange={handleChange} type="text" id="fname" name="fname" placeholder='name: Pikachu'/>
      <input id="limit" type='number' min="1" placeholder='100'/>
      <TypesCards handleTypeClick={handleTypeClick}/>
      {( typeof backendData.data === 'undefined') ? (
        <p>Loading...</p> 
      ): (
        <div className='poke-cards'>
          {backendData.data.slice(0, 3000).map((data, i) => (
            <PokeCard key={i} data={data} i={i}/>
            )
          )}
        </div>
      )}
    
    </div>
  )
}

export default App