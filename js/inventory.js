const inventory = document.querySelector('.inventory');
let fav =JSON.parse(localStorage.getItem("favoritos"));

createTemplate();

function createTemplate(){
    fav.forEach((data) => {
        if(data.cantidad > 0){
            createCard(data);
        }
    });
}

function createCard(data) {
    const name = data.pokemon.name;
    const url = data.pokemon.sprites.front_default;
    const card = document.createElement('article')
    const type2 = data.pokemon.types[1] ? data.pokemon.types[1].type.name : "---";
    card.classList.add('flip-card')
    card.innerHTML = `
    <div class="flip-card-inner">
        <div class="flip-card-front">
            <img src="${url}"  	style="width:300px;height:300px;">
        </div>
        <div class="flip-card-back">
            <h1>${name}</h1> 
            <p>${data.pokemon.types[0].type.name}</p> 
            <p>${type2}</p>
            <p>Cantidad:${data.cantidad}</p>
            <button id="btn-delete-${data.pokemon.id}">delete</button>
            <button id="btn-equip-${data.pokemon.id}">equip</button>
        </div>
    </div>
    `
    inventory.appendChild(card);
    let btnDelete = document.getElementById(`btn-delete-${data.pokemon.id}`);
    btnDelete.onclick = () => {
        deleteCard(data);
    }
    let btnEquip = document.getElementById(`btn-equip-${data.pokemon.id}`);
    btnEquip.onclick = () => {
        console.log(data.pokemon.id)
        equip(data.pokemon.id);
    }
}

function deleteCard(data){
    console.log(data)
    data.cantidad -= 1;
    localStorage.setItem("favoritos",JSON.stringify(fav));
    inventory.innerHTML = '';
    createTemplate();
}

function equip(data){
    localStorage.setItem("equip",JSON.stringify(data));
}

function empty(){
    localStorage.removeItem("favoritos");
    inventory.innerHTML = '';
}