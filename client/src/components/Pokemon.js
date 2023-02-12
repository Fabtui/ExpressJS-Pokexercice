import React from "react";

export class Pokemon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemon: null
    }
  }

  componentWillMount() {
    fetch(`http://localhost:5000/api/pokemons/${this.props.id}`)
    .then(res => res.json())
    .then(data => this.setState({pokemon: data.data}))
  }

  render() {
    const pokemon = this.state.pokemon ? this.state.pokemon : null
    return (
            <div className="pokemon-show">
              {( this.state.pokemon === null ) ? (
                  <p>Loading...</p> 
                ): (
                  <p>pokemon : {this.state.pokemon.name}</p>
                )
              }
            </div>
    );
  }
}