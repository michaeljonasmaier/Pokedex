let data = [];
let currentData = [];
let loadIndex = 1;
let interimIndex;

function init() {
    fetchDataJson(loadIndex);
}

function render() {
    let container = document.getElementById("poke_content");
    for (let i = loadIndex - 1; i < currentData.length; i++) {
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
        currentData = data;
        getAdditionalData(i, pokeSpeciesAsJson);
    } 
    render();
}

function getAdditionalData(i, pokeSpeciesAsJson) {
    getGenderFromData(i, pokeSpeciesAsJson);
    getEggGroupFromData(i, pokeSpeciesAsJson);
    getEggCycleFromData(i, pokeSpeciesAsJson);
    getHabitatFromData(i, pokeSpeciesAsJson);
}

function getHabitatFromData(i, pokeSpeciesAsJson) {
    currentData[i - 1].habitat = pokeSpeciesAsJson.habitat.name;
}

function getGenderFromData(i, pokeSpeciesAsJson) {
    currentData[i - 1].gender = pokeSpeciesAsJson.gender_rate;
}

function getEggGroupFromData(i, pokeSpeciesAsJson) {
    let eggArr = [];
    for (let j = 0; j < pokeSpeciesAsJson.egg_groups.length; j++) {
        eggArr.push(pokeSpeciesAsJson.egg_groups[j].name);
    }
    currentData[i - 1].egg_group = eggArr;
}

function getEggCycleFromData(i, pokeSpeciesAsJson) {
    currentData[i - 1].egg_cycle = pokeSpeciesAsJson.hatch_counter;
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
    for (let j = 0; j < currentData[i].abilities.length; j++) {
        abilitieArr.push(capitalizeFirstLetter(currentData[i].abilities[j].ability.name));
    }
    return `${abilitieArr.join(", ")}`;
}

function bubblingProtection(event) {
    event.stopPropagation();
}

function nextPokemon(i) {
    if (i == currentData.length - 1) {
        openPokeDetailCard(0);
    } else {
        openPokeDetailCard(i + 1);
    }
}

function previousPokemon(i) {
    if (i == 0) {
        openPokeDetailCard(currentData.length - 1);
    } else {
        openPokeDetailCard(i - 1);
    }
}

function changeNavigation(element, id, i) {
    let navLinks = document.getElementsByClassName("poke-detail-card-nav-link");
    let infoContainer = document.getElementById("poke_detail_card_info");
    infoContainer.innerHTML = "";
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
    }
    element.classList.add("active");

    if (id == 1) {
        infoContainer.innerHTML = getAboutTemplate(i);
    } else if (id == 2) {
        infoContainer.innerHTML = getStatsTemplate(i);
    } else if (id == 3) {
        infoContainer.innerHTML = getEvolutionTemplate(i);
    } else {
        infoContainer.innerHTML = getMovesTemplate(i);
    }
}

function searchPokemon(){
    let searchedPokemon = document.getElementById("search_input").value;
    let noResultMsg = document.getElementById("no_result");
    noResultMsg.classList.add("d-none");
    currentData = currentData.filter(item =>
        item.name.toLowerCase().includes(searchedPokemon.toLowerCase())
      );
      if(currentData.length!=0){
        clearContainer();
        interimIndex = loadIndex;
        loadIndex = 1;
        render();
        changeButtons();
      } else {
        showNoResultMessage(noResultMsg);    
      }
}

function showNoResultMessage(noResultMsg){
    noResultMsg.classList.remove("d-none");
    document.getElementById("search_input").select();
    currentData = data;
}

function clearContainer(){
    let container = document.getElementById("poke_content");
    container.innerHTML = "";
}

function changeButtons(){
    document.getElementById("load_button").classList.toggle("d-none");
    document.getElementById("show_all_button").classList.toggle("d-none");
}

function showAll(){
    currentData = data;
    clearContainer();
    changeButtons();
    render()
    loadIndex = interimIndex;
}
