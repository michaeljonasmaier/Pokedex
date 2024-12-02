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
        let pokeProfile = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        let pokeProfileAsJson = await pokeProfile.json();
        data.push(pokeProfileAsJson);

        let pokeSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
        let pokeSpeciesAsJson = await pokeSpecies.json();
        getAdditionalData(i, pokeSpeciesAsJson);
    }
    render();
}

function getAdditionalData(i, pokeSpeciesAsJson){
    getGenderFromData(i, pokeSpeciesAsJson);
    getEggGroupFromData(i, pokeSpeciesAsJson);
    getEggCycleFromData(i, pokeSpeciesAsJson);
}

function getGenderFromData(i, pokeSpeciesAsJson) {
    data[i - 1].gender = pokeSpeciesAsJson.gender_rate;
}

function getEggGroupFromData(i, pokeSpeciesAsJson) {
    let eggArr = [];
    for (let j = 0; j < pokeSpeciesAsJson.egg_groups.length; j++) {
        eggArr.push(pokeSpeciesAsJson.egg_groups[j].name);
    }
    data[i - 1].egg_group = eggArr;
}

function getEggCycleFromData(i, pokeSpeciesAsJson) {
    data[i - 1].egg_cycle = pokeSpeciesAsJson.hatch_counter;
}

async function loadMore() {
    loadIndex += 10;
    toggleLoadingAnimation(true);
    await fetchDataJson(loadIndex);
    toggleLoadingAnimation(false);
}

function toggleLoadingAnimation(load) {
    let button = document.getElementById("load_button");
    if (load) {
        button.innerHTML = `<img class="loading-spinner" src="./img/loading.gif" alt="Laden..." />`
    } else {
        button.innerHTML = `LOAD MORE`
    }
}

function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function styleID(id) {
    return id.toString().padStart(3, '0');
}

function changeBackgroundColor(i, type) {
    let backgroundDiv = document.getElementById(`poke_img_div_${i}`);
    backgroundDiv.className = "poke-img-div";
    backgroundDiv.classList.add(type);
}

function openPokeDetailCard(i) {
    let dialogContainer = document.getElementById("poke_detail_card_dialog");
    dialogContainer.innerHTML = getPokeDetailCardTemplate(i);
    dialogContainer.showModal();
}

function closePokeDetailCard() {
    let dialogContainer = document.getElementById("poke_detail_card_dialog");
    dialogContainer.close();
}

function formatHeight(heigth) {
    let centimeters = heigth / 10;
    return centimeters.toFixed(2).replace('.', ',') + ' cm';
}

function formatWeight(weight) {
    let kg = Math.floor(weight / 10);
    let g = weight % 10;
    return `${kg},${g.toString().padEnd(2, '0')} kg`;
}

function getAbilities(i) {
    let abilitieArr = [];
    for (let j = 0; j < data[i].abilities.length; j++) {
        abilitieArr.push(capitalizeFirstLetter(data[i].abilities[j].ability.name));
    }
    return `${abilitieArr.join(", ")}`;
}

function bubblingProtection(event) {
    event.stopPropagation();
}

function nextPokemon(i){
    if(i==data.length-1){
        openPokeDetailCard(0);
    } else {
        openPokeDetailCard(i+1);
    }  
}

function previousPokemon(i){
    if(i==0){
        openPokeDetailCard(data.length-1);
    } else {
        openPokeDetailCard(i-1);
    }
    
}
