const inventory = document.querySelector('.inventory');

function fetchPokemon(id,index) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        createCard(data,index);
    })
}

let fav =JSON.parse(localStorage.getItem("favoritos"));
console.log(fav)

createTemplate();

function createTemplate(){
    fav.forEach((element,index) => {
        fetchPokemon(element,index);
    });
}


function createCard(pokemon,index) {
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
            <button id="btn-delete-${index}">delete</button>
        </div>
    </div>
    `
    inventory.appendChild(card);
    let btnDelete = document.getElementById(`btn-delete-${index}`);
    btnDelete.onclick = () => {
        deleteCard(index);
    }
}

function deleteCard(index) {
    fav.splice(index,1);
    localStorage.setItem("favoritos",JSON.stringify(fav));
    let queso = document.querySelector('.inventory');
    queso.innerHTML = '';
    createTemplate();

}


//var fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi"];

//fruits.splice(0,1);// el primero es q quiero borrar dsp poner 1
