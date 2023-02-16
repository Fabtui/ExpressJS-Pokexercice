import React from "react";

export class EvolutionsCarShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ids: [],
      pokemons: []
    }
  }

  componentWillMount() {
    this.showEvolve(this.props.evolutions.chain)
  }

  showEvolve(chain) {
    let data = []
    if (chain.species) {
      const id = chain.species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');
      data.push(parseInt(id))
    }
    if (chain.evolves_to[0]) {
      const id = chain.evolves_to[0].species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');
      data.push(parseInt(id))

      if (chain.evolves_to[0].evolves_to[0]) {
        const id = chain.evolves_to[0].evolves_to[0].species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');
        data.push(parseInt(id))

        if (chain.evolves_to[0].evolves_to[0].evolves_to[0]) {
          const id = chain.evolves_to[0].evolves_to[0].evolves_to[0].species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');
          data.push(parseInt(id))
        }
      }
    }

    this.setState({
      ids : data
    })
    data.forEach(id => {
      fetch(`http://localhost:5000/api/pokemons/${id}`)
        .then(res => res.json())
        .then(data =>{ 
          this.setState({
            pokemons: [...this.state.pokemons, data.data]
          })
      });
    })
  }

  render() {
    const pokemons = this.state.pokemons
    return (
            <div className="evolutions-card-show" >
            <h4>Evolutions: </h4>

            {( pokemons.length != this.state.ids.length ) ? (
              <p>Loading...</p> 
            ): (
              <div className="evo-chain-container">
                {pokemons.map(evo =>
                <a href={`/pokemon/${evo.id}`}>
                  <div className="evo-chain-card" key={evo.id}>
                    <p>{evo.name}</p>
                    <img src={evo.picture}/>
                  </div>
                </a>
                )}
              </div>
            )}

            </div>
    );
  }
}