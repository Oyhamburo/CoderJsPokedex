const inventory = document.querySelector('.inventory');

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        createCard(data);
    })
}

let fav =JSON.parse(localStorage.getItem("favoritos"));
console.log(fav)

fav.forEach(element => {

    fetchPokemon(element);
    
});



function createCard(pokemon) {
    
    const name = pokemon.name;
    const url = pokemon.sprites.front_default;
    const card = document.createElement('article')
    card.classList.add('flip-card')
    card.innerHTML = `
    <div class="flip-card-inner">
                
        <div class="flip-card-front">
            <img src="${url}"  	style="width:300px;height:300px;">
        </div>
        
        <div class="flip-card-back">
            <h1>${name}</h1> 
            <p>planta</p> 
            <p>posion</p>
        </div>
    </div>
    `
    inventory.appendChild(card)
}


