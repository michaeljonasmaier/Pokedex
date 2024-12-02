function getPokecardTemplate(i) {
  return /*html*/`
    <div class="poke-card">
        <div class="poke-card-header">
            <h2>#${styleID(data[i].id)} ${capitalizeFirstLetter(data[i].name)}</h2>
        </div>
        <div id="poke_img_div_${i}" class="poke-img-div ${data[i].types[0].type.name}" onclick="openPokeDetailCard(${i}), bubblingProtection(event)">
            <img class="poke-img" src="${data[i].sprites.other.home.front_shiny}" alt="Image of ${data[i].name}">
        </div>
        <div class="poke-card-footer">
            ${getTypeIconTemplate(i)}
        </div>
    </div>`
}

function getTypeIconTemplate(i) {
  let typeContainer = "";
  for (let j = 0; j < data[i].types.length; j++) {
    typeContainer += /*html*/`<img class="type-icon" src="./img/${data[i].types[j].type.name}.svg" alt="" onclick="changeBackgroundColor(${i}, '${data[i].types[j].type.name}')">`
  }
  return typeContainer;
}

function getPokeDetailCardTemplate(i) {
  return /*html*/`
    
        <div id="poke_detail_card_div" class="poke-detail-card-div" onclick="bubblingProtection(event)">
            <div class="poke-detail-card-header">
                <img src="./img/pfeil.png" alt="" onclick="closePokeDetailCard()">
                <div class="poke-detail-card-title-div">
                    <h1 id="poke_detail_card_title">${capitalizeFirstLetter(data[i].name)}</h2>
                    <p id="poke_detail_card_id">#${styleID(data[i].id)}</p>
                </div>
                <div id="poke_detail_card_type_div">
                            
                </div>
            </div>
            <div id="poke_detail_img_div">
                    <img class="arrow" src="./img/previous_pokemon.png" alt="" onclick="previousPokemon(${i})">
                    <img id="poke_detail_img" src="${data[i].sprites.other.home.front_shiny}" alt="">
                    <img class="arrow" src="./img/next_pokemon.png" alt="" onclick="nextPokemon(${i})">
            </div>
            <div class="poke-detail-card-info-div">
                <div class="poke-detail-card-info-nav">
                    <span class="poke-detail-card-nav-link active" onclick="changeNavigation(this, 1, ${i})">About</span>
                    <span class="poke-detail-card-nav-link" onclick="changeNavigation(this, 2, ${i})">Base Stats</span>
                    <span class="poke-detail-card-nav-link" onclick="changeNavigation(this, 3, ${i})">Evolution</span>
                    <span class="poke-detail-card-nav-link" onclick="changeNavigation(this, 4, ${i})">Moves</span>
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
      <td>${formatHeight(data[i].height)}</td>
    </tr>
    <tr>
      <td>Weight</td>
      <td>${formatWeight(data[i].weight)}</td>
    </tr>
    <tr>
      <td>Abilities</td>
      <td>${getAbilities(i)}</td>
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

function getStatsTemplate(i){
  return /*html*/`
  <p>Stats</p>` 
}

function getEvolutionTemplate(i){
  return /*html*/`
  <p>Evolution</p>` 
}

function getMovesTemplate(i){
  return /*html*/`
  <p>Moves</p>` 
}

function getGender(i) {
  let genderRate = data[i].gender;
  let female = 100 * (genderRate / 8)
  let male = 100 - female;
  return `&#9794 ` + male + " % &#9792 " + female + " %";
}

function getEggGroup(i) {
  let eggGroupRef = "";
  for (let j = 0; j < data[i].egg_group.length; j++) {
    if (j < data[i].egg_group.length - 1) {
      eggGroupRef += capitalizeFirstLetter(data[i].egg_group[j]) + " ";
    } else {
      eggGroupRef += capitalizeFirstLetter(data[i].egg_group[j]);
    }
  }
  return eggGroupRef.split(" ").join(", ");
}

function getEggCylce(i) {
  let eggCycle = data[i].egg_cycle;
  return eggCycle;
}

function getHabitat(i){
  let habitat = data[i].habitat;
  return capitalizeFirstLetter(habitat);
}



