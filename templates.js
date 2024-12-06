function getPokecardTemplate(i) {
  return /*html*/`
    <div class="poke-card">
        <div class="poke-card-header">
            <h2>#${styleID(currentData[i].id)} ${capitalizeFirstLetter(currentData[i].name)}</h2>
        </div>
        <div id="poke_img_div_${i}" class="poke-img-div ${currentData[i].types[0].type.name}" onclick="openPokeDetailCard(${i}), bubblingProtection(event)">
            <img class="poke-img" src="${data[i].sprites.other.home.front_shiny}" alt="Image of ${currentData[i].name}">
        </div>
        <div class="poke-card-footer">
            ${getTypeIconTemplate(i)}
        </div>
    </div>`
}

function getTypeIconTemplate(i) {
  let typeContainer = "";
  for (let j = 0; j < currentData[i].types.length; j++) {
    typeContainer += /*html*/`<img class="type-icon" src="./img/${currentData[i].types[j].type.name}.svg" alt="" onclick="changeBackgroundColor(${i}, '${currentData[i].types[j].type.name}')">`
  }
  return typeContainer;
}

function getPokeDetailCardTemplate(i) {
  return /*html*/`
    
        <div id="poke_detail_card_div" class="poke-detail-card-div" onclick="bubblingProtection(event)">
            <div class="poke-detail-card-header">
                <img src="./img/pfeil.png" alt="" onclick="closePokeDetailCard()">
                <div class="poke-detail-card-title-div">
                    <h1 id="poke_detail_card_title">${capitalizeFirstLetter(currentData[i].name)}</h2>
                    <p id="poke_detail_card_id">#${styleID(currentData[i].id)}</p>
                </div>
                <div id="poke_detail_card_type_div">
                            
                </div>
            </div>
            <div id="poke_detail_img_div">
                    <img class="arrow" src="./img/previous_pokemon.png" alt="" onclick="previousPokemon(${i})">
                    <img id="poke_detail_img" src="${currentData[i].sprites.other.home.front_shiny}" alt="">
                    <img class="arrow" src="./img/next_pokemon.png" alt="" onclick="nextPokemon(${i})">
            </div>
            <div class="poke-detail-card-info-div">
                <div class="poke-detail-card-info-nav">
                    <span class="poke-detail-card-nav-link active" onclick="changeNavigation(this, 1, ${i})">About</span>
                    <span class="poke-detail-card-nav-link" onclick="changeNavigation(this, 2, ${i})">Base Stats</span>
                    <span class="poke-detail-card-nav-link" onclick="changeNavigation(this, 3, ${i})">Evolution</span>
                    <span class="poke-detail-card-nav-link" onclick="changeNavigation(this, 4, ${i})">Abilities</span>
                </div>
                <div id="poke_detail_card_info">
                    ${getAboutTemplate(i)}
                </div>
            </div>
        </div>
    `
}

function getAboutTemplate(i) {
  return /*html*/`
    <table class="poke-detail-card-info-table">
    <tr>
      <td>Habitat</td>
      <td>${getHabitat(i)}</td>
    </tr>
    <tr>
      <td>Height</td>
      <td>${formatHeight(currentData[i].height)}</td>
    </tr>
    <tr>
      <td>Weight</td>
      <td>${formatWeight(currentData[i].weight)}</td>
    </tr>
    <tr>
      <td>Types</td>
      <td>${getTypes(i)}</td>
    </tr>
  </table>
  <h2>Breeding</h2>
  <table class="poke-detail-card-info-table">
    <tr>
      <td>Gender</td>
      <td>${getGender(i)}</td>
    </tr>
    <tr>
      <td>Egg Groups</td>
      <td>${getEggGroup(i)}</td>
    </tr>
    <tr>
      <td>Egg Cycle</td>
      <td>${getEggCylce(i)}</td>
    </tr>
    </table>`
}

function getStatsTemplate(i) {
  return /*html*/`
  <table class="poke-detail-card-stat-table">
    <tr>
      <td>HP</td>
      <td>${currentData[i].stats[0].base_stat}</td>
      <td>${generateProgressBar(currentData[i].stats[0].base_stat, 255)}</td>
    </tr>
    <tr>
      <td>Attack</td>
      <td>${currentData[i].stats[1].base_stat}</td>
      <td>${generateProgressBar(currentData[i].stats[1].base_stat, 180)}</td>
    </tr>
    <tr>
      <td>Defense</td>
      <td>${currentData[i].stats[2].base_stat}</td>
      <td>${generateProgressBar(currentData[i].stats[2].base_stat, 250)}</td>
    </tr>
    <tr>
      <td>Special<br> Attack</td>
      <td>${currentData[i].stats[3].base_stat}</td>
      <td>${generateProgressBar(currentData[i].stats[3].base_stat, 252)}</td>
    </tr>
    <tr>
      <td>Special<br> Defense</td>
      <td>${currentData[i].stats[4].base_stat}</td>
      <td>${generateProgressBar(currentData[i].stats[4].base_stat, 230)}</td>
    </tr>
    <tr>
      <td>Speed</td>
      <td>${currentData[i].stats[5].base_stat}</td>
      <td>${generateProgressBar(currentData[i].stats[5].base_stat, 200)}</td>
    </tr>
    <tr>
      <td>Total</td>
      <td>${totalStats(i)}</td>
      <td>${generateProgressBar(totalStats(i), 1367)}</td>
    </tr>
  </table>`
}

function generateProgressBar(value, maxValue) {
  let progress = 100 / maxValue * value;
  let progressContainer = /*html*/`
    <div class="progress-container">
        <div class="progress-bar" id="progressBar" style="width: ${progress}%; background-color: ${getProgressBarColor(progress)}"></div>
    </div>`
  return progressContainer;
}

function getEvolutionTemplate(i) {
  let evolutionIndex = currentData[i].evolution_chain_index;
  let container = "";
  let counter = 0;
  for (let j = 0; j < currentData.length; j++) {
    if (currentData[j].evolution_chain_index == evolutionIndex) {
      counter++;
      container +=/*html*/`
        <div class="evolution-chain-item">
          <img class="evolution-chain-image" id="evolution_chain_image${counter}" src="${currentData[j].sprites.other.home.front_shiny}" alt="">
          <p>${capitalizeFirstLetter(currentData[j].name)}</p>
        </div>`
    }
    
  }
  for(let k=0; k<standbyData.length; k++){
    if (standbyData[k].evolution_chain_index == evolutionIndex) {
      counter++;
      container +=/*html*/`
        <div class="evolution-chain-item">
          <img class="evolution-chain-image" id="evolution_chain_image${counter}" src="${standbyData[k].sprites.other.home.front_shiny}" alt="">
          <p>${capitalizeFirstLetter(standbyData[k].name)}</p>
        </div>`
    }
  }
  return /*html*/`
  <div>
    <h3>Evolution Chain:</h2>
    <div class="evolution-chain-div">
      ${container}
    </div>
  </div>`;
}

function getMovesTemplate(i) {
  return /*html*/`
  <p>Moves</p>`
}

function getGender(i) {
  let genderRate = currentData[i].gender;
  let female = 100 * (genderRate / 8)
  let male = 100 - female;
  return `&#9794 ` + male + " % &#9792 " + female + " %";
}

function getEggGroup(i) {
  let eggGroupRef = "";
  for (let j = 0; j < currentData[i].egg_group.length; j++) {
    if (j < currentData[i].egg_group.length - 1) {
      eggGroupRef += capitalizeFirstLetter(currentData[i].egg_group[j]) + " ";
    } else {
      eggGroupRef += capitalizeFirstLetter(currentData[i].egg_group[j]);
    }
  }
  return eggGroupRef.split(" ").join(", ");
}

function getEggCylce(i) {
  let eggCycle = currentData[i].egg_cycle;
  return eggCycle;
}

function getHabitat(i) {
  let habitat = currentData[i].habitat;
  return capitalizeFirstLetter(habitat);
}



