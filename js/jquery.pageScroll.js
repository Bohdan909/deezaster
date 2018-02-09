(function($) {
    var _elementStyle = document.createElement('div').style;
    var _vendor = (function() {
        var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
            transform,
            i = 0,
            l = vendors.length;

        for (; i < l; i++) {
            transform = vendors[i] + 'ransform';
            if (transform in _elementStyle) {
                return vendors[i].substr(0, vendors[i].length - 1);
            }
        }

        return false;
    })();

    function prefixStyle(style) {
        if (_vendor === false) {
            return false;
        }
        if (_vendor === '') {
            return style;
        }
        return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    }


    var defaults = {
        pageContainer: '.section',
        easing: 'ease',
        animationTime: 1000,
        pagination: true,
        keyboard: true,
        beforeMove: function() {},
        afterMove: function() {},
        loop: false
    };

    var $doc = $(document),
        _transform = prefixStyle('transform'),
        hasTransform = _transform in _elementStyle,
        _transition = prefixStyle('transition');

    $.fn.pageScroll = function(options) {

        var settings = $.extend({}, defaults, options),
            $el = $(this),
            $pages  = $el.find(settings.pageContainer),
            lastIndex = $pages.length - 1,
            topPos = 0,
            current = 0,
            lastAnimation = 0,
            quietPeriod = 500,
            paginationList = "";

        var $navLi  = $(".navigation ul li");
        var $char   = $(".navigation-char-wrap");
        var $charLi = $char.find("li");

        function transformPage(position, index) {
            var attrs = null;
            if (hasTransform) {
                attrs = {};
                attrs[_transform] = "";
                attrs[_transition] = "";
                $el.css(attrs);
                $el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                    settings.afterMove(index, $pages.eq(index));
                });
            } else {
                attrs = {
                    top: $el.height() / 100 * position + 'px'
                };
                $el.animate(attrs, settings.animationTime, function() {
                    settings.afterMove(index, $pages.eq(index));
                });
            }
        }

        var finIndex = 10;

        function handlerMove(preIndex, nowIndex) {
            settings.beforeMove(preIndex, $pages.eq(preIndex));
            $pages.eq(preIndex).removeClass("active");

            setTimeout(function(){ 
                $pages.eq(preIndex).removeClass("prev") 
            }, 800);

            if (settings.pagination){
                $pageList.eq(preIndex).removeClass("active");
                $pageList.eq(nowIndex).addClass("active");
            }
            
            //if (nowIndex <= 4 || nowIndex == finIndex){
            if (nowIndex <= 4){
                $navLi.removeClass("active");
                $navLi.eq(nowIndex).addClass("active");
            } else { // Inner Slider
                $navLi.removeClass("active");
                $navLi.eq(5).addClass("active");
            }

            // Final Section
            if (nowIndex == finIndex){
                $navLi.removeClass("active");
                $navLi.eq(6).addClass("active");

                //document.querySelector(".desc-block[data-index='4'").classList.add("show");
            }

            // Characters Nav    
            if (nowIndex >= 5 && nowIndex < finIndex){
               $char.delay(300).fadeIn(600);
               //$char.removeClass("hide");
               $charLi.eq(preIndex - 5).removeClass("active");
               $charLi.eq(nowIndex - 5).addClass("active");
            } else {
               $char.removeClass("show").fadeOut(250);
               //$char.addClass("hide");
               $charLi.removeClass("active");
            } 

            console.log("pre " + preIndex + "\n" + "NOW: " + nowIndex);

            $pages.eq(nowIndex).addClass("active prev");
            current = nowIndex;
        }

        // Navigation Custom
        $navLi.on("click", function(){
            var navIndex = $(this).index();

            if (navIndex == 6){
                moveTo(finIndex);
            } else {
                moveTo(navIndex);
            }
        });


        $charLi.on("click", function(){
            var navIndex = $(this).index() + 5;

            moveTo(navIndex);
        });

        // Buttons To
        var $btnTo = document.querySelectorAll(".btn-to");

        $btnTo.forEach( function(btn){
            btn.addEventListener("click", function() {
                var target = this.getAttribute("data-to") - 1;
                moveTo(target);
            });
        });

        // Move
        function moveDown() {
            var toPage = current + 1;

            if (toPage > lastIndex) {
                if (!settings.loop) {
                    return;
                }
                toPage = 0;
            }
            handlerMove(current, toPage);
        }

        function moveUp() {
            var toPage = current - 1;

            if (toPage < 0) {
                if (!settings.loop) {
                    return;
                }
                toPage = lastIndex;
            }
            handlerMove(current, toPage);
        }

        function moveTo(pageIndex) {
            if (pageIndex < 0 || pageIndex > lastIndex) {
                return;
            }
            handlerMove(current, pageIndex);
        }

        $.fn.moveToPage = moveTo;

        function initScroll(e, delta) {
            if (Math.abs(delta) < 10) {
                return;
            }
            var timeNow = new Date().getTime();
            if (timeNow - lastAnimation < quietPeriod + settings.animationTime) {
                e.preventDefault();
                return;
            }
            delta < 0 ? moveDown() : moveUp();
            lastAnimation = timeNow;
        }

        $pages.each(function(index) {
            var $this = $(this);
            $this.css({
                position: 'absolute',
                top: topPos + '%'
            });
            topPos = topPos + 0;
            if (settings.pagination) {
                paginationList += '<a data-index="' + index + '" href="javascript:;"></a>';
            }
        });

        $pages.show().eq(current).addClass('active');
        settings.afterMove(current, $pages.eq(current));

        if (settings.pagination) {
            var $pagination = $el.find('.page-pagination');
            if (!$pagination.length) {
                $pagination = $('<div class="page-pagination"></div>').html(paginationList);
                $('body').prepend($pagination);
            }
            var $pageList = $pagination.find('a');
            $pageList.eq(current).addClass('active');
            $pageList.on('click', function() {
                var $this = $(this);
                if ($this.hasClass('active')) {
                    return;
                }
                moveTo($this.data('index'));
            });
        }

        $(".page-pagination a").each(function(){
            $(this).text($(this).data("index"));
        });

        //mouse scroll
        $doc.on('mousewheel DOMMouseScroll MozMousePixelScroll', function(e) {
            e.preventDefault();
            var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
            if (!$("body").hasClass("disable-page-scroll")) {
                initScroll(e, delta);
            }
        });

        //touch swipe
        $el.on('touchstart', function(e) {
            if ($("body").hasClass("disable-page-scroll")) {
                return false;
            }
            var touches = e.originalEvent.touches;
            if (touches && touches.length) {
                var startY = touches[0].pageY;
                $doc.on('touchmove.page-scroll', function(ev) {
                    var touches2 = ev.originalEvent.touches;
                    ev.preventDefault();
                    if (touches2 && touches2.length) {
                        var deltaY = touches2[0].pageY - startY;
                        if (Math.abs(deltaY) >= 100) {
                            initScroll(ev, deltaY);
                            $doc.off('.page-scroll .page-scroll-end');
                        }
                    }
                });
                $doc.on('touchend.page-scroll-end', function() {
                    $doc.off('.page-scroll .page-scroll-end');
                });
            }
        });

        if (settings.keyboard) {
            $doc.on('keydown', function(e) {
                var tag = e.target.tagName.toLowerCase();
                if (tag === 'input' || tag === 'textarea' || $("body").hasClass("disable-page-scroll")) {
                    return;
                }
                switch (e.which) {
                    case 38:
                        moveUp();
                        break;
                    case 40:
                        moveDown();
                        break;
                    case 32:
                        moveDown();
                        break;
                    case 33:
                        moveUp();
                        break;
                    case 34:
                        moveDown();
                        break;
                    case 36:
                        moveTo(0);
                        break;
                    case 35:
                        moveTo(lastIndex);
                        break;
                    default:
                        return;
                }
            });
        }
        return false;
    }
})(window.jQuery);


(function(){
    if ( typeof NodeList.prototype.forEach === "function" ) return false;
    NodeList.prototype.forEach = Array.prototype.forEach;
}());