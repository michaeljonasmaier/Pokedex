function getPokecardTemplate(i) {
    return /*html*/`
    <div class="poke-card">
        <div class="poke-card-header">
            <h2>#${styleID(data[i].id)} ${capitalizeFirstLetter(data[i].name)}</h2>
        </div>
        <div id="poke_img_div_${i}" class="poke-img-div ${data[i].types[0].type.name}">
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