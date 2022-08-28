const pokemonContainer = document.querySelector('.pokedex__pantalla');
const inventory = document.querySelector('.inventory');
const item4js = document.querySelector('.item4');
const item3js = document.querySelector('.item3');
const item2js = document.querySelector('.item2');
const item1js = document.querySelector('.item1');
class favorito {
    constructor(cantidad,pokemon){
        this.cantidad = cantidad;
        this.pokemon = pokemon;
    }
}

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        createPokemon(data);
        console.log(data);
    })
}

function createPokemon(pokemon){
    //item 4
    const id = document.querySelector('.item4-div');
    id.innerHTML = "ID: "+pokemon.id;
    item4js.appendChild(id);
    //item 3
    const imagen = document.querySelector('.pokedex__pantalla__img');
    imagen.src = pokemon.sprites.front_default;
    item3js.appendChild(imagen);
    //item2
    const tipo1 = document.querySelector('.tipo-1');
    tipo1.innerHTML = pokemon.types[0].type.name;
    item2js.appendChild(tipo1);
    const tipo2 = document.querySelector('.tipo-2');
    tipo2.innerHTML = pokemon.types[1] ? pokemon.types[1].type.name : "---";
    item2js.appendChild(tipo2);
    const fav = document.querySelector('.tipo-3');
    fav.innerHTML = "ADD favoritos";
    fav.setAttribute("id",`btn-${pokemon.id}`);
    item2js.appendChild(tipo2);
    //item 1
    const name = document.querySelector('.item1-div');
    name.innerHTML = pokemon.name;
    item1js.appendChild(name);
    fav.onclick = () => {
        add(pokemon);
    }    
}

fetchPokemon(1);

search_pokemonName.addEventListener("input", () => {
    fetchPokemon(search_pokemonName.value.toLowerCase());
});

function add(pokemon) {
    let inventario = JSON.parse(localStorage.getItem("favoritos")) || [];
    let nuevo = new favorito(1,pokemon);

    if(inventario.length > 0){
        let prueba = 0;
        inventario.forEach(element => {
            if(pokemon.name == element.pokemon.name){
                element.cantidad += 1;
                localStorage.setItem("favoritos",JSON.stringify(inventario));
                prueba = 1;
            };     
        });
        if(prueba == 0){
            inventario.push(nuevo);
            localStorage.setItem("favoritos",JSON.stringify(inventario));
        }
    }else{
        inventario.push(nuevo);
        localStorage.setItem("favoritos",JSON.stringify(inventario));
    }
           
    swal("Good job!", "Tienes un nuevo Pokémon favorito", "success");

}




