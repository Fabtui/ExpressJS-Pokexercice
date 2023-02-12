import React from "react";

export class Pokemon extends React.Component {

  // useEffect(() => {

  //   fetch('http://localhost:5000/api/pokemons')
  //     .then(res => res.json())
  //     .then(data => {setBackendData(data)})
  // }, [])

  // const handleChange = (e) => {
  //   const limit = document.querySelector('#limit').value || 3000
  //   fetch(`http://localhost:5000/api/pokemons?name=${e.currentTarget.value}&limit=${limit}`)
  //   .then(res => res.json())
  //   .then(data => {setBackendData(data)})
  // }

  // const handleTypeClick = (type) => {
  //   if (type === "X") {
  //     const limit = document.querySelector('#limit').value || 3000
  //     fetch(`http://localhost:5000/api/pokemons?limit=${limit}`)
  //     .then(res => res.json())
  //     .then(data => {setBackendData(data)})
  //   } else {
  //     const limit = document.querySelector('#limit').value || 3000
  //     fetch(`http://localhost:5000/api/pokemons?type=${type}&limit=${limit}`)
  //     .then(res => res.json())
  //     .then(data => {setBackendData(data)})
  //   }
  // }


  componentWillMount() {
    fetch(`http://localhost:5000/api/pokemons/${this.props.id}`)
    .then(res => res.json())
    .then(data => console.log(data))
  }

  render() {
    return (
            <div className="pokemon-show">
              <p>pokemon {this.props.id}</p>
            </div>
    );
  }
}