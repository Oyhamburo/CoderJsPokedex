let bodyCaptura = document.getElementById('captura');
let buscar = document.getElementById('buscar');
let btnCapturar = document.getElementById(`divCapturar`);
let equip = JSON.parse(localStorage.getItem("equip"))
comenzar();
class favorito {
    constructor(cantidad, pokemon) {
        this.cantidad = cantidad;
        this.pokemon = pokemon;
    }
}
class HealthBar {
    constructor(x, y, w, h, maxHealth, color) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h/2;
      this.maxHealth = maxHealth;
      this.maxWidth = w;
      this.health = maxHealth;
      this.color = color;
    }
  
    show(context) {
      context.lineWidth = 4;
      context.strokeStyle = "#333";
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.w, this.h);
      context.strokeRect(this.x, this.y, this.maxWidth, this.h);
    }
  
    updateHealth(val) {
      if (val > 0) {
        this.health = val;
        this.w = (this.health / this.maxHealth) * this.maxWidth;
      }
      else{
        swal ( "Ganaste!" ,  "Felicidades!" ,  "success" )
        .then ((value) => {
            comenzar();
        })
        
      }
    }
  }


function comenzar() {
    if (!equip) {
        pokemon(pokeRandom(), 1);
    } else {
        pokemon(pokeRandom(), equip);
    }
}




async function pokemon(id1, id2) {
    let enemy = await getPokemons(id1);
    let trainer = await getPokemons(id2);
    console.log(enemy);
    createTemplateCaptura(enemy, trainer);
}
async function getPokemons(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let data = await response.json();
    return data;
}

function pokeRandom() {
    return Math.floor(Math.random() * 150);
}


function attackRandom() {
    return Math.floor(Math.random() * 20);
}

function createTemplateCaptura(enemy, trainer) {

    bodyCaptura.innerHTML = `
    <section class="captura__main__opciones">
        <article class="captura__main__opciones__pokebola">
            <button id="ataqueUno">${trainer.moves[attackRandom()].move.name}</button>
            <br>
            <button id="ataqueDos">${trainer.moves[attackRandom()].move.name}</button>
            <br>
            <button id="ataqueTres">${trainer.moves[attackRandom()].move.name}</button>
            <br>
            <button id="ataqueCuatro">${trainer.moves[attackRandom()].move.name}</button>
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
            <div class="margenBarra">
                <canvas id="canvas"></canvas>                       
            </div>
            <div class="facu">
                <div class="hola">ID: ${enemy.id}</div>
                <div class="hola">${enemy.name}</div>
            </div>
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
    const canvas = document.getElementById("canvas");
    console.log(canvas);
    const context = canvas.getContext("2d");
    const width = canvas.width = 320;
    const height = canvas.height = 480;


    let health = 100;
    const healthBarWidth = 200;
    const healthBarHeight = 30;
    const x = width / 2 - healthBarWidth / 2;
    const y = height / 2 - healthBarHeight / 2;

    const healthBar = new HealthBar(x, y, healthBarWidth, healthBarHeight, health, "green");

    const frame = function () {
        context.clearRect(0, 0, width, height);
        healthBar.show(context);
        requestAnimationFrame(frame);
    }

    canvas.onclick = function () {
        health -= 10;
        healthBar.updateHealth(health);
    };

    frame();
    btnBuscar = document.getElementById(`buscar`);
    btnBuscar.onclick = () => {
        pokemon(pokeRandom(), equip)
    }
    btnCapturar = document.getElementById(`capturar`);
    btnCapturar.onclick = () => {
        add(enemy);
    }
    btnAtacarUno = document.getElementById(`ataqueUno`);
    btnAtacarUno.onclick = () => {
        health -= attackRandom();
        healthBar.updateHealth(health);
    }
    btnAtacarDos = document.getElementById(`ataqueDos`);
    btnAtacarDos.onclick = () => {
        health -= attackRandom();
        healthBar.updateHealth(health);
    }
    btnAtacarTres = document.getElementById(`ataqueTres`);
    btnAtacarTres.onclick = () => {
        health -= attackRandom();
        healthBar.updateHealth(health);
    }
    btnAtacarCuatro = document.getElementById(`ataqueCuatro`);
    btnAtacarCuatro.onclick = () => {
        health -= attackRandom();
        healthBar.updateHealth(health);
    }
}






function add(pokemon) {
    let imagenPokemon = document.getElementById('enemyImg');
    let inventario = JSON.parse(localStorage.getItem("favoritos")) || [];
    let nuevo = new favorito(1, pokemon);

    if (inventario.length > 0) {
        let prueba = 0;
        inventario.forEach(element => {
            if (pokemon.name == element.pokemon.name) {
                element.cantidad += 1;
                localStorage.setItem("favoritos", JSON.stringify(inventario));
                prueba = 1;
            };
        });
        if (prueba == 0) {
            inventario.push(nuevo);
            localStorage.setItem("favoritos", JSON.stringify(inventario));
        }
    } else {
        inventario.push(nuevo);
        localStorage.setItem("favoritos", JSON.stringify(inventario));
    }

    swal("Good job!", `CAPTURASTE UN ${pokemon.name}`, "success");
    btnCapturar.innerHTML = "";
    btnCapturar.innerHTML = `<button id="capturar" disabled>Capturar</button>`;
    imagenPokemon.src = ``;
    imagenPokemon.src = `./img/pokebola.png`;
}



