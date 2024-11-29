let data = [];
let loadIndex = 1;

function init() {
    fetchDataJson(loadIndex);
}

function render() {
    let container = document.getElementById("poke_content");
    for (let i = loadIndex - 1; i < data.length; i++) {
        container.innerHTML += getPokecardTemplate(i);
    }
}

async function fetchDataJson(loadIndex) {
    for (let i = loadIndex; i < loadIndex + 10; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        let responseAsJson = await response.json();
        data.push(responseAsJson);
    }
    render();
}

function loadMore() {
    loadIndex += 10;
    fetchDataJson(loadIndex);
}

function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function styleID(id){
    return id.toString().padStart(3, '0');
}

function changeBackgroundColor(i, type){
    let backgroundDiv = document.getElementById(`poke_img_div_${i}`);
    backgroundDiv.className = "poke-img-div";
    backgroundDiv.classList.add(type);   
}

function openPokeDetailCard(i){
    let dialogContainer = document.getElementById("poke_detail_card_dialog");
    dialogContainer.innerHTML = getPokeDetailCardTemplate(i); 
    dialogContainer.showModal();
}

function formatHeight(heigth){
    let centimeters = heigth / 10;
    return centimeters.toFixed(2).replace('.', ',') + ' cm';
}

function formatWeight(weight){
  let kg = Math.floor(weight / 10);
  let g = weight % 10;
  return `${kg},${g.toString().padEnd(2, '0')} kg`;
}

function getAbilities(i){
    let abilitieArr = [];
    for(let j=0; j<data[i].abilities.length; j++){
        abilitieArr.push(capitalizeFirstLetter(data[i].abilities[j].ability.name));
    }
    return `${abilitieArr.join(", ")}`;
}
