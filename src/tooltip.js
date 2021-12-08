import tippy  from "tippy.js";
import {delegate as tippyd} from 'tippy.js';
// import ttip_bg from './aoe-assets/VillagerTooltip.png';


import data from "./data.json";


// var image=document.createElement("img");
// image.src = villagerTtp;
// image.className="tooltip";

// IMPORT & PARSE JSON DATA
var aoedata= JSON.parse(JSON.stringify(data));

 
// IMPORT ICONS
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images["aoe-assets/civilizations/"+item.replace('./', '')] = r(item); });
  return images;
};
const images = importAll(require.context('./aoe-assets/civilizations/', true, /\.(png|jpe?g|svg)$/));

// BUTTON VARS
var btn_common = document.getElementById("common");
btn_common.addEventListener("click",selectCommon);
var btn_all = document.getElementById("select-all");
btn_all.addEventListener("click",selectAll);
var btn_units = document.getElementById("select-units");
btn_units.addEventListener("click",selectUnits);
var btn_buildings = document.getElementById("select-buildings");
btn_buildings.addEventListener("click",selectBuildings);
var btn_upgrades = document.getElementById("select-upgrades");
btn_upgrades.addEventListener("click",selectUpgrades);

function selectCommon(){
    insertCivIcons(8);
    console.log("select-common")
};
function selectUnits(){
    insertAllCivIcons('u');
};
function selectBuildings(){
    insertAllCivIcons('b');
};
function selectUpgrades(){
    insertAllCivIcons('p');
};

function selectAll(){
    insertAllCivIcons('a');
    // console.log("select-all")
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
        var inlineCssBg='style="background: url(' + images[units_dir+ u.icon.name] +');"';
        div.insertAdjacentHTML('beforeend','<div class=grid-item><button class="btn icon ' 
        + u.name + '"'+ inlineCssBg +'>'+'</button></div>');
    }

    var buildings=aoedata.civilizations[civ_number].buildings 
    var buildings_dir=icon_dir+"buildings/"
    for (let i = 0; i < buildings.length; i++) {
        let b=buildings[i];
        var inlineCssBg='style="background: url(' + images[buildings_dir+ b.icon.name] +');"';
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

    
    for (const [k,v] of Object.entries(images)){
        // console.log(k,v);
        if( ( i=='p' && k.includes('upgrades')  )
        ||  ( i=='b' && k.includes('buildings') ) 
        ||  ( i=='u' && k.includes('units') )  
        ||    i=='a' ){
            var inlineCssBg='style="background: url(' + v + ');"';
            div.insertAdjacentHTML('beforeend','<div class=grid-item><button class="btn icon ' 
            + k.replace(/\.[^/.]+$/, "") + '"'+ inlineCssBg +'>'+'</button></div>');
        }
    }
    //clean the grid-container
    document.getElementsByClassName("grid-container")[0].innerHTML="";
    document.getElementsByClassName("grid-container")[0].appendChild(div);
};





// Tooltip stuff
import ttip_bg from "./aoe-assets/hud-backgrounds/info_bg.png";
var stats={
       armor:3,
       health: 2400,
};
console.log(ttip_bg)
var ttip= document.createElement("div");
// ttip.style.backgroundImage='url('+ttip_bg+')';
ttip.style.backgroundColor= "rgb(0,0,0)" ;
ttip.className="tooltip";

var html = '<ul><li class="health">50</li><li class="armor">5</li></ul>'
ttip.innerHTML= html;
tippyd( '.grid-container', {
    target: '.villager',
    content: ttip,
    trigger: "click",
    // content: () => image.cloneNode(true),
    allowHTML: true,
});
