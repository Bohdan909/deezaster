document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

let $gameDemo = document.querySelector(".game-demo");
let $cubeWanted = document.querySelectorAll(".cube.wanted");

window.addEventListener("load", ()=> {
    "use strict";

    // Sections 
    document.querySelector(".section-top").classList.add("loaded");
    document.querySelector(".navigation").classList.add("loaded");

    // document.querySelectorAll(".section").forEach(function (item){
    //     item.classList.add("loaded");
    // });


    // Game Demo
    $cubeWanted.forEach(function(item){

        item.addEventListener("click", function(){
            $gameDemo.classList.add("animate");
        });
    });

    


    


    winResize();
    window.addEventListener("resize", winResize);

});


function winResize(){
    let winWidth = window.innerWidth;

    gameScale();
}

// Game Scale
function gameScale(){
    let winWidth = window.innerWidth;
    let ratio = (winWidth - 50)/510;
    let transScale = "transform: scale(" + ratio + "); -webkit-transform: scale(" + ratio + "); -ms-transform: scale(" + ratio + ")";

    if (winWidth <= 767){
        $gameDemo.style = transScale;
    } else {
        $gameDemo.style = "";
    }
}