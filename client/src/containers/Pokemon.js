import React from "react";
import { PokemonCarShow } from "../components/PokemonCardShow";
import { EvolutionsCarShow } from "../components/EvolutionsCardShow";

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
                  <PokemonCarShow pokemon={this.state.pokemon}/>
                )
              }
              {( this.state.evolutions === null ) ? (
                  <p>Loading...</p> 
                ): (
                  <div>
                    <EvolutionsCarShow evolutions={this.state.evolutions}/>
                  </div>
                )
              }
            </div>
    );
  }
}