var contactMe = (function () {

    // init module.
    var init = function () {
        _setUpListners();
    };
    
    // Listners events.
    var _setUpListners = function () {
        $('#contact-me').on('submit', _submitForm);
        $('form').on('reset', _clearFormContactMe);    
    };

    var _clearFormContactMe = function () {
        validation.clearForm('#contact-me');
    }

    var _submitForm = function(event) {
        console.log("<< Submit form >>")
        event.preventDefault();

        var form = $(this),
            url = 'contactme.php',
            defObj = _ajaxForm(form, url);
    };

    var _ajaxForm = function (form, url) {
        console.log("<< AJAX form >>")
        if(validation.validateForm(form)) return false;

        //do AJAX form contact me and show message user
    };
    
    // Return object - publics methods.
    return {
        init: init
    };
})();

contactMe.init();