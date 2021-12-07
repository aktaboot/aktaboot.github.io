import tippy  from "tippy.js";
import villagerTtp from './aoe-assets/VillagerTooltip.png';
import data from "./data.json";

// IMPORT & PARSE JSON DATA
var aoedata= JSON.parse(JSON.stringify(data));
var image=document.createElement("img");

image.src = villagerTtp;
image.className="tooltip";
 
// IMPORT ICONS
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images["aoe-assets/civilizations/"+item.replace('./', '')] = r(item); });
  return images;
};
const images = importAll(require.context('./aoe-assets/civilizations/', true, /\.(png|jpe?g|svg)$/));

// BUTTON VARS
var btn_common = document.getElementById("select-common");
btn_common.addEventListener("click",selectCommon);
var btn_all = document.getElementById("select-all");
btn_all.addEventListener("click",selectAll);


function selectCommon(){
    insertCivIcons(8);
    console.log("select-common")
};

function selectAll(){
    insertAllCivIcons();
    console.log("select-all")
};

// This is still a template for testing. Only parses units
// The  actual function that should do this should *better* parse and query the database
function insertCivIcons(civ_number){
    var div= document.createElement("div");

    var units=aoedata.civilizations[civ_number].units
    var icon_dir=aoedata.civilizations[civ_number].icon_dir
    for (let i = 0; i < units.length; i++) {
        let u=units[i]
        var inlineCssBg='style="background: url(' + images[icon_dir+ u.icon.name] +');background-size: contain"';
        div.insertAdjacentHTML('beforeend','<div class=grid-item><button class="btn tippy ' 
        + u.name + '"'+ inlineCssBg +'>'+'</button></div>');
    }
    //clean the grid-container
    document.getElementsByClassName("grid-container")[0].innerHTML="";
    document.getElementsByClassName("grid-container")[0].appendChild(div);
};


function insertAllCivIcons(){
    var div= document.createElement("div");

    
    for (const [k,v] of Object.entries(images)){
        // console.log(k,v);
        var inlineCssBg='style="background: url(' + v + ');background-size: contain"';
        div.insertAdjacentHTML('beforeend','<div class=grid-item><button class="btn tippy ' 
        + k.replace(/\.[^/.]+$/, "") + '"'+ inlineCssBg +'>'+'</button></div>');
    }
    //clean the grid-container
    document.getElementsByClassName("grid-container")[0].innerHTML="";
    document.getElementsByClassName("grid-container")[0].appendChild(div);
};

tippy('.villager', {  
    content: () => image.cloneNode(true),
    allowHTML: true,
});


insertAllCivIcons();
