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

function getTypeIconTemplate(i){
    let typeContainer = "";
    for(let j=0; j<data[i].types.length; j++){
        typeContainer += /*html*/`<img class="type-icon" src="./img/${data[i].types[j].type.name}.svg" alt="" onclick="changeBackgroundColor(${i}, '${data[i].types[j].type.name}')">`
    }
    return typeContainer;
}

function getPokeDetailCardTemplate(i){
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
                    <img id="poke_detail_img" src="${data[i].sprites.other.home.front_shiny}" alt="">
            </div>
            <div class="poke-detail-card-info-div">
                <div class="poke-detail-card-info-nav">
                    <a href="">About</a>
                    <a href="">Base Stats</a>
                    <a href="">Evolution</a>
                    <a href="">Moves</a>
                </div>
                <div id="poke_detail_card_info">
                    ${getPoketDetailCardAboutTemplate(i)}
                </div>
            </div>
        </div>
    ` 
}

function getPoketDetailCardAboutTemplate(i){
    return /*html*/`
    <table class="poke-detail-card-info-table">
    <tr>
      <td>Species</td>
      <td></td>
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

function getGender(i){
  let genderRate = data[i].gender;
  let female = 100*(genderRate/8)
  let male = 100-female;
  return `&#9794 ` + male + " % &#9792 " + female + " %";
}

function getEggGroup(i){
  let eggGroupRef = "";
  for(let j=0; j<data[i].egg_group.length; j++){
    if(j<data[i].egg_group.length-1){
      eggGroupRef += capitalizeFirstLetter(data[i].egg_group[j]) + " ";
    } else {
      eggGroupRef += capitalizeFirstLetter(data[i].egg_group[j]);
    }   
  }
  return eggGroupRef.split(" ").join(", ");
}

function getEggCylce(i){
  let eggCycle = data[i].egg_cycle;
  return eggCycle;
}



