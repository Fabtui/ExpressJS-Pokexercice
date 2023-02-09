import React from "react";

export class TypesCards extends React.Component {

  handleClick = (e) => {
    this.props.handleTypeClick(e.currentTarget.innerText)
  }

  render() {
    const validTypes = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']
    return (
      <div className="type-cards">
        {validTypes.map(type => <span key={type} onClick={this.handleClick} className={type}>{type}</span>)}
      </div>
    )
  }
}