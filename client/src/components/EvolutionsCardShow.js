import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import '../style/evo-chain.css'

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

  getId(chain) {
    const id = chain.species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');
    return parseInt(id)
  }

  showEvolve(chain) {
    let data = []
    if (chain.species) {
      const id = this.getId(chain)
      data.push(parseInt(id))
      
      if (chain.evolves_to[0]) {
        const id = this.getId(chain.evolves_to[0])
        data.push(parseInt(id))
  
        if (chain.evolves_to[0].evolves_to[0]) {
          const id = this.getId(chain.evolves_to[0].evolves_to[0])
          data.push(parseInt(id))
  
          if (chain.evolves_to[0].evolves_to[0].evolves_to[0]) {
            const id = this.getId(chain.evolves_to[0].evolves_to[0].evolves_to[0])
            data.push(parseInt(id))
          }
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
                <div  key={evo.id} className="evo-chain-content">
                  <a href={`/pokemon/${evo.id}`}>
                    <div className="evo-chain-card">
                      <p>{evo.name}</p>
                      <img src={evo.picture}/>
                    </div>
                  </a>
                  <div className="next-arrow">
                    <p><FontAwesomeIcon icon={faArrowRight} /></p>
                  </div>
                </div>
                )}
              </div>
            )}

            </div>
    );
  }
}