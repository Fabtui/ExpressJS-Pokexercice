import React from "react";

export class PokemonCarShow extends React.Component {
  render() {
    const pokemon = this.props.pokemon
    return (
            <div className="pokemon-card-show" id={pokemon.id}>
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
    );
  }
}