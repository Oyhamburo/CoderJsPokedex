let bodyCaptura = document.getElementById('captura');
let buscar = document.getElementById('buscar');
let btnCapturar = document.getElementById(`divCapturar`);
let equip = JSON.parse(localStorage.getItem("equip"))
comenzar();
class favorito {
    constructor(cantidad,pokemon){
        this.cantidad = cantidad;
        this.pokemon = pokemon;
    }
}
function comenzar(){
    if(!equip){
        fetchPokemon(pokeRandom(),1);
    }else{
        fetchPokemon(pokeRandom(),equip);
    }
}

function fetchPokemon(enemy,trainer) {

    fetch(`https://pokeapi.co/api/v2/pokemon/${enemy}/`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        localStorage.setItem("enemy",JSON.stringify(data))
    }) 
    fetch(`https://pokeapi.co/api/v2/pokemon/${trainer}/`)
    .then((res) => res.json())
    .then((data) => {
        localStorage.setItem("trainer",JSON.stringify(data));
    })
    let pokemonTrainer = JSON.parse(localStorage.getItem("enemy"));
    let pokemonEnemy = JSON.parse(localStorage.getItem("trainer"));
    createTemplateCaptura(pokemonTrainer,pokemonEnemy)
}


function pokeRandom(){
    return Math.floor(Math.random() * 150);
}

function createTemplateCaptura(enemy,trainer){

    bodyCaptura.innerHTML = `
    <section class="captura__main__opciones">
        <article class="captura__main__opciones__pokebola">
            poekebolas
        </article>
        <article class="captura__main__opciones__menu">
            <div class="captura__main__opciones__menu_capturar" id="divCapturar">
                <button id="capturar">Capturar</button>
            </div>
            <div class="captura__main__opciones__menu__fav">
                <a href="./inventory.html"><button>Inventory</button></a>
            </div>
            <div class="captura__main__opciones__menu__pokedex">
                <a href="./index.html"><button>Pokedex</button></a>
            </div>
            <div class="captura__main__opciones__menu__buscar">
                <button id="buscar">buscar otro pokemon</button>
            </div>
        </article>
    </section>
    <main class="captura__main">
        <section class="captura__main__section">
            <article class="item10 captura__main__section__bar captura__main__section__bar__enemy">
                <div>ID: ${enemy.id}</div>
                <div>${enemy.name}</div>
            </article>
            <article class="item20 captura__main__section__img captura__main__section__img__enemy">
                <img src="${enemy.sprites.front_default}" alt="" id="enemyImg" class="item20 captura__main__section__img">
            </article>
            <article class="item30 captura__main__section__bar captura__main__section__bar__trainer">
                <div>ID: ${trainer.id}</div>
                <div>${trainer.name}</div>
            </article>
            <article class="item40 captura__main__section__img captura__main__section__img__trainer">
                <img src="${trainer.sprites.back_default}" alt="">
            </article>
            <article class="item50">OPCINES</article>
        </section>
    </main>
    `
    btnBuscar = document.getElementById(`buscar`);
    btnBuscar.onclick = () => {
        fetchPokemon(pokeRandom(),equip)
    }
    btnCapturar = document.getElementById(`capturar`);
    btnCapturar.onclick = () => {
        add(enemy);
    }
}




function add(pokemon) {
    let imagenPokemon = document.getElementById('enemyImg');
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
           
    swal("Good job!", `CAPTURASTE UN ${pokemon.name}`, "success");
    btnCapturar.innerHTML= "";
    btnCapturar.innerHTML= `<button id="capturar" disabled>Capturar</button>`;
    imagenPokemon.src =  ``;
    imagenPokemon.src =  `./img/pokebola.png`;
}