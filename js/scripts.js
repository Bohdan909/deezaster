document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

let $gameDemo = document.querySelector(".game-demo");
let $cubeWanted = document.querySelectorAll(".cube.wanted");

window.addEventListener("load", ()=> {
    "use strict";

    // Sections 
    document.querySelector(".section-top").classList.add("loaded");
    document.querySelector(".navigation").classList.add("loaded");


    // Game Demo
    $cubeWanted.forEach(function(item){

        item.addEventListener("click", function(){
            $gameDemo.classList.add("animate");
        });
    });

    // Map
    let $map   = document.querySelector(".map-wrap");
    let $hole  = document.querySelector(".hole");
    let $monet = document.querySelectorAll(".monet");
    let $desc  = document.querySelectorAll(".desc-block");
    

    $monet.forEach(function(monet){

        monet.addEventListener("click", function(){

            let index = this.getAttribute("data-index");

            monet.style = "z-index: 0";
            this.classList.add("hide");

            $desc.forEach( (descItem) => {
                descItem.classList.remove("show");
            });

            switch(index){
                case "4":
                    $map.style = "transform: translateY(-625px); -webkit-transform: translateY(-625px)";
                    $hole.style = "top: 885px; left: 10px";
                    monetFocus(1);
                    
                    document.querySelector(".desc-block[data-index='" + 3 + "'").classList.add("show");
                break;

                case "3":
                    $map.style = "transform: translateY(-1000px); -webkit-transform: translateY(-1000px)";
                    $hole.style = "top: 1165px; left: 455px";
                    monetFocus(2);
                    
                    document.querySelector(".desc-block[data-index='" + 2 + "'").classList.add("show");
                break;

                case "2":
                    $map.style = "transform: translateY(-1500px); -webkit-transform: translateY(-1500px)";
                    $hole.style = "top: 1744px; left: 253px";
                    monetFocus(3);

                    document.querySelector(".desc-block[data-index='" + 1 + "'").classList.add("show");
                break;

                case "1":
                    $map.style = "transform: translateY(-2130px); -webkit-transform: translateY(-2130px)";
                    $hole.classList.add("hide");
                    document.querySelector(".footer").classList.add("animate");
                break;
            }

            function monetFocus(i){
                setTimeout( () => {
                        $monet[i].style = "z-index: 100";
                    }, 950
                );
            }

        });
    });


    // Tel Hover
    let $btnDownload = document.querySelectorAll(".download");

    $btnDownload.forEach(function(btn){
        btn.addEventListener("mouseover", function(){
            let index = this.getAttribute("data-index");

            switch(index){
                case "1":
                    document.querySelector(".tel-2").classList.add("hover");
                break;
                
                case "2":
                    document.querySelector(".tel-1").classList.add("hover");
                break;    
            }
        });

        btn.addEventListener("mouseleave", function(){
            document.querySelectorAll(".tel").forEach(function(tel){
                tel.classList.remove("hover");
            });
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