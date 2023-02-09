// const jsonMaker = (data) => {
  //   console.log(data);
  //   const pokeType = data.types.map(type => type.type.name)
  //   const newHash = {
  //     name: data.name,
  //     num: data.id,
  //     picture: data.sprites.other["official-artwork"].front_default,
  //     types: pokeType,

  //   }
  //   return newHash
  // }

  // const explode = (data) => {
  //   const url = data.map(d => d.url);
  //   const pokemons = []
  //   url.forEach(u => {
  //     fetch(u)
  //     .then(res => res.json())
  //     .then(data => pokemons.push(jsonMaker(data)))
  //     .then(pokemon => console.log(JSON.stringify(pokemons)));
  //   });
  // }

  // fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')
  // .then(res => res.json())
  // .then(data => explode(data.results))
