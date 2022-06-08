const inventory = document.querySelector('.inventory');

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        createCard(data);
    })
}
let numero = parseInt(localStorage.getItem("id"))
fetchPokemon(numero)

function createCard(pokemon) {
    const name = pokemon.name;
    const url = pokemon.sprites.front_default;
    const card = document.createElement('article')
    card.classList.add('invetory__card')
    card.innerHTML = `
    <div class="inventory__card__imagen"><img src="${url}" alt="" class="inventory__card__img"></div>
        <div class="inventory__card__container">
            <br>
            <h2>${name}</h2>
            <p>tipo</p>
    </div>
    `
    inventory.appendChild(card)
}