let data = [];
let currentData = [];
let standbyData = [];
let loadIndex = 1;
let interimIndex;
let standbyIndex = 3;

async function init() {
    toggleStartLoadingAnimation();
    await fetchDataJson(loadIndex);
    toggleStartLoadingAnimation();
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

        await getAbilityData(i, pokeProfileAsJson);
    }
    await fetchStandbyData(loadIndex + 10);
    render();
}

async function getAbilityData(i, pokeProfileAsJson){
    currentData[i-1].effect = [];
    for(let j = 0; j<pokeProfileAsJson.abilities.length; j++){
        //console.log(pokeProfileAsJson.abilities[j].ability.name);
        let pokeAbility = await fetch(pokeProfileAsJson.abilities[j].ability.url);
        let pokeAbilityAsJson = await pokeAbility.json();

        for(let k=0; k<pokeAbilityAsJson.effect_entries.length; k++){
            if(pokeAbilityAsJson.effect_entries[k].language.name == "en"){
                currentData[i-1].effect[j] = pokeAbilityAsJson.effect_entries[k].effect;
            }
        }
    }
}

async function fetchStandbyData(startIndex) {
    standbyData = [];
    for (let j = startIndex; j < startIndex + 3; j++) {
        let standbyPokeProfile = await fetch(`https://pokeapi.co/api/v2/pokemon/${j}/`);
        let standbyPokeProfileAsJson = await standbyPokeProfile.json();
        standbyData.push(standbyPokeProfileAsJson);

        let standbyPokeSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${j}`);
        let standbyPokeSpeciesAsJson = await standbyPokeSpecies.json();
        getEvolutionChainIndexFromData(standbyData.length, standbyPokeSpeciesAsJson, standbyData); //standbyData.length weil immer dem letzten -1 der index hinzugefügt wird
    }
}

function getAdditionalData(i, pokeSpeciesAsJson) {
    getGenderFromData(i, pokeSpeciesAsJson);
    getEggGroupFromData(i, pokeSpeciesAsJson);
    getEggCycleFromData(i, pokeSpeciesAsJson);
    getHabitatFromData(i, pokeSpeciesAsJson);
    getEvolutionChainIndexFromData(i, pokeSpeciesAsJson, currentData);
}

function getEvolutionChainIndexFromData(i, pokeSpeciesAsJson, array) {
    let evolutionChainIndex = getLastNumberFromUrl(pokeSpeciesAsJson.evolution_chain.url);
    array[i - 1].evolution_chain_index = evolutionChainIndex;
}

function getLastNumberFromUrl(url) {
    let urlSplit = url.split("/");
    return urlSplit[urlSplit.length - 2];
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

function toggleStartLoadingAnimation(){
    document.getElementById("loading_spinner_big").classList.toggle("d-none");
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

function getTypes(i) {
    let typesArr = [];
    for (let j = 0; j < currentData[i].types.length; j++) {
        typesArr.push(capitalizeFirstLetter(currentData[i].types[j].type.name));
    }
    return `${typesArr.join(", ")}`;
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
        infoContainer.innerHTML = getAbilitiesTemplate(i);
    }
}

function searchPokemon() {
    let searchedPokemon = document.getElementById("search_input").value;
    let noResultMsg = document.getElementById("no_result");
    noResultMsg.classList.add("d-none");
    currentData = data;//currentdata muss zurückgesetzt werden, damit alle objekte betrachtet werden und nicht nur die, die davor auch drin waren
    if (searchedPokemon != "") { 
        currentData = currentData.filter(item =>
            item.name.toLowerCase().includes(searchedPokemon.toLowerCase())
        );
        displaySearchElements(noResultMsg);
    } else {
        clearContainer();
        interimIndex = loadIndex;
        loadIndex = 1;
        render();
        displayLoadButtons();
    }
}

function displaySearchElements(noResultMsg) {
    if (currentData.length != 0) {
        console.log("im if teil")
        clearContainer();
        interimIndex = loadIndex;
        loadIndex = 1;
        render();
        displayShowAllButton();
    } else {
        showNoResultMessage(noResultMsg);
    }
}

function showNoResultMessage(noResultMsg) {
    noResultMsg.classList.remove("d-none");
    document.getElementById("search_input").select();
    currentData = data;
}

function clearContainer() {
    let container = document.getElementById("poke_content");
    container.innerHTML = "";
}

function displayLoadButtons() {
    document.getElementById("load_button").classList.remove("d-none");
    document.getElementById("show_all_button").classList.add("d-none");
}

function displayShowAllButton() {
    document.getElementById("load_button").classList.add("d-none");
    document.getElementById("show_all_button").classList.remove("d-none");
}

function showAll() {
    currentData = data;
    document.getElementById("search_input").value = "";
    clearContainer();
    displayLoadButtons()
    render()
    loadIndex = interimIndex;
}

function getProgressBarColor(progress) {
    if (progress > 80) {
        return "#379c30";
    } else if (progress > 60) {
        return "#5aeb50";
    } else if (progress > 40) {
        return "#c9eb50";
    } else if (progress > 20) {
        return "#ECA351";
    } else {
        return "#eb5050";
    }
}

function totalStats(i) {
    let totalValue = 0;
    for (let j = 0; j < currentData[i].stats.length; j++) {
        totalValue += currentData[i].stats[j].base_stat;
    }
    return totalValue;
}

function getAbilities(){

}

