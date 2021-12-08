import tippy  from "tippy.js";
import {delegate as tippyd} from 'tippy.js';
import ttip_bg from "./aoe-assets/hud-backgrounds/info_bg.png";

var villager_stats={
       health: 2400,
       mv_speed:1,
       melee_armor:3,
       ranged_armor:5,
       atk_dmg:4,
       atk_speed:1,
       atk_type: "melee",
       range:0,
       cost:{
           food:50,
           wood:0,
           stone:0,
           gold:0,
       }
};

var ttip= document.createElement("div");
ttip.style.backgroundColor= "rgb(0,0,0)" ;
ttip.className="tooltip";

var html = '<ul><li class="health">50</li><li class="armor">5</li></ul>'
ttip.innerHTML= html;
tippyd( '.grid-container', {
    target: '.villager',
    content: ttip,
    trigger: "click",
    // allowHTML: true,
});
