const pokemonContainer = document.querySelector('.pokedex__pantalla');
const item4js = document.querySelector('.item4');
const item3js = document.querySelector('.item3');
const item2js = document.querySelector('.item2');
const item1js = document.querySelector('.item1');
function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        createPokemon(data);
    })
}

function createPokemon(pokemon){
    //item 4
    const id = document.querySelector('.item4-div');
    id.textContent = ('ID: ')+(pokemon.id);
    item4js.appendChild(id);
    //item 3
    const imagen = document.querySelector('.pokedex__pantalla__img');
    imagen.src = pokemon.sprites.front_default;
    item3js.appendChild(imagen);
    //item2
    const tipo1 = document.querySelector('.tipo-1');
    tipo1.textContent = pokemon.types[0].type.name;
    item2js.appendChild(tipo1);
    const tipo2 = document.querySelector('.tipo-2');
    tipo2.textContent = pokemon.types[1].type.name;
    item2js.appendChild(tipo2);
    //item 1
    const name = document.querySelector('.item1-div');
    name.textContent = pokemon.name;
    item1js.appendChild(name);


}
fetchPokemon(1);
search_pokemonName.addEventListener("input", () => {
    fetchPokemon(search_pokemonName.value.toLowerCase());
  });



// Desafio ARRAY
function pokemon(nombre, id, tipo){
    this.nombre = nombre;
    this.id = id;
    this.tipo = tipo;
}
const pokemon01 = new pokemon ('bulbasaur', 1, 'planta');
const pokemon02 = new pokemon ('ybasaur', 2, 'planta');
const pokemon03 = new pokemon ('venasaur', 3, 'planta');
const pokemon04 = new pokemon ('charmander', 4, 'fuego');
const pokemon05 = new pokemon ('charmeleon', 5, 'fuego');
const pokemon06 = new pokemon ('charizard', 6, 'fuego');
const pokemon07 = new pokemon ('squirtle', 7, 'agua');
const pokemon08 = new pokemon ('wartortle', 8, 'agua');
const pokemon09 = new pokemon ('blastoise', 9, 'agua');


const arrayPokemon = [ pokemon01, pokemon02, pokemon03, pokemon04, pokemon05, pokemon06, pokemon07, pokemon08, pokemon09];


let busqueda = prompt("Pokedex \n Ingrese el id \n (disponible del 1 al 9)");


for (let i=0; i<=busqueda; i++){
    suma = busqueda - 1;
    if(i === suma){
        alert("nombre: "+arrayPokemon[i].nombre);
        alert("tipo: "+arrayPokemon[i].tipo);
    }
}





