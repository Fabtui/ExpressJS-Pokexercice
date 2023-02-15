import React from "react";

export class EvolutionsCarShow extends React.Component {

  showEvolve(chain) {
    let data = []
    if (chain.species) {
      data.push(chain.species.name)
      console.log(chain.species.url);
    }
    if (chain.evolves_to[0]) {
      data.push(chain.evolves_to[0].species.name)
      if (chain.evolves_to[0].evolves_to[0]) {
        data.push(chain.evolves_to[0].evolves_to[0].species.name)
        if (chain.evolves_to[0].evolves_to[0].evolves_to[0]) {
          data.push(chain.evolves_to[0].evolves_to[0].evolves_to[0].species.name)
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
              {evolutionPokemons.join(' => ')}
            </div>
    );
  }
}