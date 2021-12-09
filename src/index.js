import "./styles/index.scss";
import "./tooltip.js";
import data from "./data.json";

// IMPORT & PARSE JSON DATA
var aoedata= JSON.parse(JSON.stringify(data));

 
// IMPORT ICONS
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
};
const icons = importAll(require.context('./aoe-assets/civilizations/', true, /\.(png|jpe?g|svg)$/));
const flags = importAll(require.context('./aoe-assets/flags/', false, /\.(png|jpe?g|svg)$/));
const maps = importAll(require.context('./aoe-assets/maps/', false, /\.(png|jpe?g|svg)$/));

// BUTTON VARS
var btn_units = document.getElementById("select-units");
btn_units.addEventListener("click",selectUnits);
var btn_buildings = document.getElementById("select-buildings");
btn_buildings.addEventListener("click",selectBuildings);
var btn_upgrades = document.getElementById("select-upgrades");
btn_upgrades.addEventListener("click",selectUpgrades);
var btn_common = document.getElementById("common");
btn_common.addEventListener("click",selectCommon);

var btn_civs = document.getElementById("select-civs");
btn_civs.addEventListener("click",selectCivs);
var btn_maps = document.getElementById("select-maps");
btn_maps.addEventListener("click",selectMaps);

function selectCivs(){
    document.getElementsByClassName("grid-container").innerHTML="";
    document.getElementsByClassName("civ-bar")[0].style.display="none";
    insertFlags();
};
function selectMaps(){
    document.getElementsByClassName("grid-container").innerHTML="";
    document.getElementsByClassName("civ-bar")[0].style.display="none";
    insertMaps();
};

function selectCommon(){
    insertCivIcons(8);
};
function selectUnits(){
    document.getElementsByClassName("civ-bar")[0].style.display="flex";
    insertAllCivIcons('u');
};
function selectBuildings(){
    document.getElementsByClassName("civ-bar")[0].style.display="flex";
    insertAllCivIcons('b');
};
function selectUpgrades(){
    document.getElementsByClassName("civ-bar")[0].style.display="flex";
    insertAllCivIcons('p');
};


function selectAll(){
    insertAllCivIcons('a');
};

function insertFlags(){
    var div= document.createElement("div");
    
    for (const [k,v] of Object.entries(flags)){
        // console.log(k,v);
        var inlineCssBg='style="background: url(' + v + ');"';
        div.insertAdjacentHTML('beforeend','<div class=grid-item><button class="grid-flag '
        + k.replace("_flag.png","")+'"'+  inlineCssBg +'>'+'</button></div>');
    }
    //clean the grid-container and add to it
    document.getElementsByClassName("grid-container")[0].innerHTML="";
    document.getElementsByClassName("grid-container")[0].appendChild(div);

};

function insertMaps(){
    var div= document.createElement("div");
    
    for (const [k,v] of Object.entries(maps)){
        // console.log(k,v);
        var name= k.replace(".png","");
        var inlineCssBg='style="background: url(' + v + ');"';
        div.insertAdjacentHTML('beforeend','<div class=grid-item><button class="grid-map '+ name+'" '
        +'title="'+ name+'"'+  inlineCssBg +'>'+'</button></div>');
    }
    //clean the grid-container and add to it
    document.getElementsByClassName("grid-container")[0].innerHTML="";
    document.getElementsByClassName("grid-container")[0].appendChild(div);

};



// This is still a template for testing. Only parses units
// The  actual function that should do this should *better* parse and query the database
function insertCivIcons(civ_number){
    var div= document.createElement("div");
    
    var icon_dir=aoedata.civilizations[civ_number].icon_dir

    var units=aoedata.civilizations[civ_number].units
    var units_dir= icon_dir+"units/";
    for (let i = 0; i < units.length; i++) {
        let u=units[i];
        var inlineCssBg='style="background: url(' + icons[units_dir+ u.icon.name] +');"';
        div.insertAdjacentHTML('beforeend','<div class=grid-item><button class="btn icon ' 
        + u.name + '"'+ inlineCssBg +'>'+'</button></div>');
    }

    var buildings=aoedata.civilizations[civ_number].buildings 
    var buildings_dir=icon_dir+"buildings/"
    for (let i = 0; i < buildings.length; i++) {
        let b=buildings[i];
        var inlineCssBg='style="background: url(' + icons[buildings_dir+ b.icon.name] +');"';
        div.insertAdjacentHTML('beforeend','<div class=grid-item><button class="btn icon ' 
        + b.name + '"'+ inlineCssBg +'>'+'</button></div>');
    }
    //clean the grid-container
    document.getElementsByClassName("grid-container")[0].innerHTML="";
    document.getElementsByClassName("grid-container")[0].appendChild(div);
};

// this is a test function that just displays all the icons in the civilizations folder, nothing more
function insertAllCivIcons(i){
    var div= document.createElement("div");

    
    for (const [k,v] of Object.entries(icons)){
        // console.log(k,v);
        if( ( i=='p' && k.includes('upgrades')  )
        ||  ( i=='b' && k.includes('buildings') ) 
        ||  ( i=='u' && k.includes('units') )  
        ||    i=='a' ){
            var inlineCssBg='style="background: url(' + v + ');"';
            div.insertAdjacentHTML('beforeend','<div class=grid-item><button class="btn icon"'+  inlineCssBg +'>'+'</button></div>');
        }
    }
    //clean the grid-container and add to it
    document.getElementsByClassName("grid-container")[0].innerHTML="";
    document.getElementsByClassName("grid-container")[0].appendChild(div);
};
