var main = (function () {

    // init module.
    var init = function () {
        _setUpListners();
    };
    
    // Listners events.
    var _setUpListners = function () {
        $('#js_bars').on('click', function (event) {
            event.preventDefault();
           /* $('.sidebar').slideToggle("medium");*/
           if($('.navigation').hasClass('visible')){
                $('.navigation ul').slideUp('',function(){
                    $('.navigation').removeClass('visible');
                });
            }else{
                $('.navigation').addClass('visible');
                $('.navigation ul').slideDown();
            }
        });
           
    };

   
    
    // Return object - publics methods.
    return {
        init: init
    };
})();

main.init();