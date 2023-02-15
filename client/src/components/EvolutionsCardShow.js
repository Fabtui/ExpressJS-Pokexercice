import React from "react";

export class EvolutionsCarShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemons: []
    }
  }

  showEvolve(chain) {
    let data = []
    if (chain.species) {
      const url = chain.species.url;
      data.push({name: chain.species.name, url: url})
    }
    if (chain.evolves_to[0]) {
      const url = chain.evolves_to[0].species.url;
      data.push({name: chain.evolves_to[0].species.name, url: url})

      if (chain.evolves_to[0].evolves_to[0]) {
        const url = chain.evolves_to[0].evolves_to[0].species.url;
        data.push({name: chain.evolves_to[0].evolves_to[0].species.name, url: url})

        if (chain.evolves_to[0].evolves_to[0].evolves_to[0]) {
          const url = chain.evolves_to[0].evolves_to[0].evolves_to[0].species.url;
          data.push({name: chain.evolves_to[0].evolves_to[0].evolves_to[0].species.name, url: url})
        }
      }
    } 
    return data
  }

  render() {
    const evolutions = this.props.evolutions
    const evolutionPokemons = this.showEvolve(evolutions.chain)
    console.log(evolutionPokemons);
    return (
            <div className="evolutions-card-show" >
            <h4>Evolutions: </h4>
              {evolutionPokemons.map(evo => evo.name).join(' => ')}
            </div>
    );
  }
}