import React from "react";

export class Pokemon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemon: null,
      species: null,
      evolutions: null
    }
  }

  componentWillMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.id}`)
    .then(res => res.json())
    .then(data =>{ 
      this.setState({pokemon: data})
      return fetch(data.species.url)
    })
    .then(res => res.json())
    .then(data => {
      this.setState({species: data})
      return fetch(data.evolution_chain.url)
    })
    .then(res => res.json())
    .then(data => {
      this.setState({evolutions: data})
    })
  }

  render() {
    const pokemon = this.state.pokemon ? this.state.pokemon : null
    return (
            <div className="pokemon-show">
              {( pokemon === null ) ? (
                  <p>Loading...</p> 
                ): (
                  <div>
                    <p>#{pokemon.id} : {pokemon.name}</p>
                    <img src={pokemon.sprites.other["official-artwork"].front_default} />
                    {pokemon.types.map(type => <p key={type.type.name} className={`${type.type.name}-type type-label`}>{type.type.name}</p>)}
                    <p>abilities:</p>
                    <ul>
                      {pokemon.abilities.map(ability => <li key={ability.ability.name}>{ability.ability.name}</li>)}
                    </ul>
                    <p>height: {pokemon.height}</p>
                    <p>weight: {pokemon.weight}</p>
                    <p>base stats:</p>
                    <ul>
                      {pokemon.stats.map(stat => <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>)}
                    </ul>
                  </div>
                )
              }
            </div>
    );
  }
}