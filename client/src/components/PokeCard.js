import React from "react";

export class PokeCard extends React.Component {
  render() {
    const data = this.props.data
    const i = this.props.i
    return (
            <div className="poke-card" key={i}>
              <p>#{data.id} - {data.name[0].toUpperCase() + data.name.substring(1)}</p>
              <div className='poke-types'>{data.types.map(d => <div key={d} className={d}>{d}</div>)}</div>
              <img src={data.picture}/>
            </div>
    );
  }
}