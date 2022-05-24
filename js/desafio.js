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


let numero = prompt("Pokedex \n Ingrese el id \n (disponible del 1 al 9)");
numero = numero - 1;

let seccion = document.getElementById("section");
let container = document.createElement("div");
container.innerHTML = `<div>ID: ${arrayPokemon[numero].id}</div>
                     <div>Nombre: ${arrayPokemon[numero].nombre}</div>
                     <div>tipo: ${arrayPokemon[numero].tipo}</div>`
seccion.appendChild(container);




