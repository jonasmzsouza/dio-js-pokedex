const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
let offset = 0;
const limit = 12;
const maxRecords = 1281;

function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon ${pokemon.mainType}">
      <span class="number">#${pokemon.order}</span>
      <span class="name">${pokemon.name}</span>

      <div class="detail">
        <ol class="types">
          ${pokemon.types.map(
            (type) => `<li class="type ${type}">${type}</li>`
          )}
        </ol>

        <img
          src="${pokemon.image}"
          alt="${pokemon.name}"
        />
      </div>
    </li>
  `;
}

function loadPokemonItens(offset, limit) {
  pokeApi
    .getPokemons(offset, limit)
    .then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join("");
      pokemonList.innerHTML += newHtml;
    })
    .catch((error) => console.log(error));
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  let qttRecordWithNextPage = offset + limit;
  if (qttRecordWithNextPage >= maxRecords) {
    let newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
