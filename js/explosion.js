$(function (){

    // $('.monet').on('click', function(e){
    //     explode(e.pageX, e.pageY);
    // });

    $("#main").on('click', function(e){
        explode(e.pageX, e.pageY);
    });



    $('.cube.alight').on('click', function(e){

        $(this)
            .parents(".game-demo-block")
            .find(".to-hide")
            .fadeOut(200)
            .end()
            .find(".to-show").delay(300)
            .fadeIn(500)
            .end()
            .find(".btn-circle")
            .delay(400)
            .fadeIn(800);

        $(".person-sad").fadeOut(1100);
        $(".person-joyful").fadeIn(900);
    });

    function explode(x, y){

        var particles = 12,
            explosion = $('<div class="explosion"></div>');

        $('body').append(explosion);

        explosion.css('left', x - explosion.width() / 2);
        explosion.css('top', y - explosion.height() / 2);

        for (var i = 0; i < particles; i++){

           var x = (explosion.width() / 2) + rand(80, 50) * Math.cos(2 * Math.PI * i / rand(particles - 10, particles + 10)),
               y = (explosion.height() / 2) + rand(80, 50) * Math.sin(2 * Math.PI * i / rand(particles - 10, particles + 10)),
               color = "255,255,255", 
          
            elm = $('<div class="particle" style="' +
                'background-color: rgb(' + color + ') ;' +
                'top: ' + y + 'px; ' +
                'left: ' + x + 'px"></div>');

            if (i == 0) { 
                elm.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
                    explosion.remove(); 
                });
            }

            explosion.append(elm);
        }
    }

    function rand(min, max){
        return Math.floor(Math.random() * (max + 1)) + min;
    }

});