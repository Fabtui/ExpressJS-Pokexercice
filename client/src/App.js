import React, { useEffect, useState } from 'react'
import { PokeCard } from './components/PokeCard'
import './index.css'

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

  return (
    <div className='App'>
    <h1>Home</h1>
      <p>Search</p>
      <input onChange={handleChange} type="text" id="fname" name="fname" placeholder='Pikachu'/>
      <input id="limit" type='number' min="1" placeholder='100'/>
      {( typeof backendData.data === 'undefined') ? (
        <p>Loading</p> 
      ): (
        <div className='poke-cards'>
          {backendData.data.slice(0, 200).map((data, i) => (
            <PokeCard key={i} data={data} i={i}/>
            )
          )}
        </div>
      )}
    
    </div>
  )
}

export default App