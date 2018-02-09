document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '');

let $gameDemo = document.querySelector(".game-demo");
let $cubeWanted = document.querySelectorAll(".cube.wanted");

window.addEventListener("load", function(){
    "use strict";

    // Preloader
    document.querySelector("body").classList.add("page-loaded");

    // Sections 
    setTimeout(function(){
        document.querySelector(".section-top").classList.add("loaded");
    }, 200);
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
    let $help  = document.querySelector(".hole-socket .help-block");
    

    $monet.forEach(function(monet){

        monet.addEventListener("click", function(){

            var index = this.getAttribute("data-index");

            //monet.style = "z-index: 0";
            this.classList.add("hide");

            $desc.forEach( function(descItem){
                descItem.classList.remove("show");
            });

            switch(index){
                case "4":
                    $map.setAttribute("style", "transform: translateY(-625px); -webkit-transform: translateY(-625px)");
                    $hole.setAttribute("style", "top: 885px; left: 10px");
                    monetFocus(1);
                    $help.setAttribute("style", "opacity: 0");
                    
                    document.querySelector(".desc-block[data-index='" + 3 + "'").classList.add("show");
                break;

                case "3":
                    $map.setAttribute("style", "transform: translateY(-1000px); -webkit-transform: translateY(-1000px);");
                    $hole.setAttribute("style", "top: 1165px; left: 455px;");
                    monetFocus(2);
                    
                    document.querySelector(".desc-block[data-index='" + 2 + "'").classList.add("show");
                break;

                case "2":
                    $map.setAttribute("style", "transform: translateY(-1500px); -webkit-transform: translateY(-1500px)");
                    $hole.setAttribute("style", "top: 1744px; left: 253px;");
                    monetFocus(3);

                    document.querySelector(".desc-block[data-index='" + 1 + "'").classList.add("show");
                break;

                case "1":
                    $map.setAttribute("style", "transform: translateY(-2130px); -webkit-transform: translateY(-2130px)");
                    $hole.classList.add("hide");

                    setTimeout( function(){
                        document.querySelector(".footer").classList.add("animate");
                    }, 900);
                    
                break;
            }

            function monetFocus(i){
                setTimeout( function(){
                        $monet[i].setAttribute("style", "z-index: 100");
                    }, 950
                );
            }

        });
    });


    // Tel Hover
    var $btnDownload = document.querySelectorAll(".download, .tel-link");

    $btnDownload.forEach(function(btn){
        btn.addEventListener("mouseover", function(){
            var index = this.getAttribute("data-index");

            switch(index){
                case "1":
                    document.querySelector(".tel-link-2").classList.add("hover");
                break;
                
                case "2":
                    document.querySelector(".tel-link-1").classList.add("hover");
                break;    
            }
        });

        btn.addEventListener("mouseleave", function(){
            document.querySelectorAll(".tel-link").forEach(function(tel){
                tel.classList.remove("hover");
            });
        });
    });

    // Button More Animate
    var $btnMore = document.querySelectorAll(".no-touchevents .btn-arrow");

    $btnMore.forEach(function(btn){
        btn.addEventListener("mouseover", function(){
            this.classList.add("hover");
            this.classList.remove("unhover");
        });

        btn.addEventListener("mouseleave", function(){
            this.classList.add("unhover");
            this.classList.remove("hover");    
            
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

// forEach for IE
(function(){
    if ( typeof NodeList.prototype.forEach === "function" ) return false;
    NodeList.prototype.forEach = Array.prototype.forEach;
}());