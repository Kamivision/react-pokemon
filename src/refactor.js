/* 
 * get pokemon that match more than one type! 
 * types: list of types as strings
 * firstPokemon: name of the pokemon to find similar types for
 */
const getSimilarPokemon = async (types, firstPokemon) => {
  console.log(`Getting pokemon of types: ${types.join(", ")}`);

  const pokemonOfEachType = [];
  // for each type on the original pokemon
  for (const type of types) {
    // setup url and get data
    const url = `${POKEAPI_BASE}/type/${type}`;
    const { data } = await axios.get(url);
    // add a list of all pokemon who share that type
    pokemonOfEachType.push(data.pokemon.map(pokemon => pokemon.pokemon.name));
  }

  // these are all the matches
  const pokemonWithSameTypes = []

  // for each pokemon in the first list
  for (const pokemon of pokemonOfEachType[0]) {
    let match = true;

    // is it in the other lists too?
    for (const typeList of pokemonOfEachType.slice(1)) {
      if (!typeList.includes(pokemon)) {
        match = false;
        break;
      };
    }

    // if it is, add it to our matches list
    if (match) pokemonWithSameTypes.push(pokemon);
  }

  console.log("Pokemon with same types: " + pokemonWithSameTypes.join(", "));
  
  // take out the original pokemon, grab the first 5, and then make cards for them
  pokemonWithSameTypes.filter(pokemon => pokemon !== firstPokemon).slice(0, 5).forEach(async pokemon => {
    createCard(await getDataByPokeNameOrId(pokemon));
  })
}