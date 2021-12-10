import "./styles/index.scss";
import "./tooltip.js";
import Data from "./data.json";
// import Civsdata from "./Overview.json";
import civs from "./Overview.json";


var civ_names=["abbasid","delhi","hre", "rus", "mongols","chinese", "english", "french"];

// IMPORT & PARSE JSON DATA
var aoedata= JSON.parse(JSON.stringify(Data));
// var civs=JSON.parse(JSON.stringify(Civsdata));

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
createAllFlagModals();
document.getElementById("select-units").addEventListener("click",selectUnits);
document.getElementById("select-buildings").addEventListener("click",selectBuildings);
document.getElementById("select-upgrades").addEventListener("click",selectUpgrades);
document.getElementById("common").addEventListener("click",selectCommon);
document.getElementById("select-civs").addEventListener("click",selectCivs);
document.getElementById("select-maps").addEventListener("click",selectMaps);

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

function insertFlags(){
    var div= document.createElement("div");
    for (const [k,v] of Object.entries(flags)){
        var civ_name= k.replace("_flag.png","");
        
        var div2= document.createElement("div");
        div2.className="grid-item";
        var div3= document.createElement("div");
        div3.style.backgroundImage='url('+v+')';
        div3.className="grid-flag "+civ_name;
        
        div2.insertAdjacentElement("beforeend",div3);
        div.insertAdjacentElement("beforeend",div2);
    }
    //clean the grid-container and add to it
    document.getElementsByClassName("grid-container")[0].innerHTML="";
    document.getElementsByClassName("grid-container")[0].appendChild(div);

    //Add Events on flags
    for (let i = 0; i < civ_names.length; i++) {
        document.getElementsByClassName(civ_names[i])[0].addEventListener("click", () => {openCivModal(civ_names[i])});
    }
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


function createAllFlagModals(){
    for (let i = 0; i < civ_names.length; i++) {
        createCivModal(civ_names[i]);
    }
};

function createCivModal(civ_name){
    var id=civ_name+"-modal";
    var civ=civs[civ_name];
    var div= document.createElement("div");
    var div2= document.createElement("div");
    var span= document.createElement("span");
    div.id=id;
    div.className="w3-modal" ;
    div.style.display="none";

    div2.className="w3-modal-content w3-animate-zoom";
    span.className="w3-button w3-display-topright w3-large x-close";
    span.innerText="X";
    span.addEventListener("click",() => {closeModal(civ_name);})


    div2.insertAdjacentElement('beforeend',span);
    div2.insertAdjacentHTML('beforeend','<div><h1>'+civ[0]+'</h1></div>');
    // div2.insertAdjacentHTML('beforeend',html);
    
    // Add stuff to Modals here
    var fields=civs["fields"];
    var html="";
    var div3= document.createElement("div");
    for (let i = 1; i < civ.length; i++) {
        if(fields[i]=="") html+=civ[i];
        if(civ[i]=="") continue;
        else{
            div3.insertAdjacentHTML('beforeend',html);
            div2.insertAdjacentElement('beforeend',div3)
            var div3= document.createElement("div");
            div3.style.display="flex";
            html='<h3>'+fields[i]+"</h3></br>"+civ[i];
        }
        // html+='<h3>'+fields[i]+"</h3>"+civ[i]+'';
    }
    div.insertAdjacentElement('beforeend',div2)
    document.getElementsByClassName("modal-container")[0].appendChild(div);
}


function openCivModal(civ_name){
    document.getElementById(civ_name+"-modal").style.display="block";
};
function closeModal(civ_name){
    document.getElementById(civ_name+"-modal").style.display='none';
};

// console.log(civs[civ_names[0]][0]);
