var validation = (function () {

    // init module.
    var init = function () {
        _setUpListners();
    };
    
    // Listners events.
    var _setUpListners = function () {
        $('form').on('keydown', '.has-error', _removeError);           
    };

    var _removeError = function () {
        $(this).removeClass('has-error');
    }

    var clearForm = function (form) {
        var currentForm = $(form);        
        currentForm.find('input, textarea').trigger('hideTooltip').removeClass('has-error');
    };
    
    var _createQtip = function (element, position) {
        // position tooltip
        if(position === 'right') {
            position = {
                my: 'left center',
                at: 'right center'
            }
        } else {
            position = {
                my: 'right center',
                at: 'left center',
                adjust: {
                    method: 'shift none'
                }
            }
        }

        element.qtip({
            content: {
                text: function() {
                    return $(this).attr('qtip-content');
                }
            },
            show: {
                event: 'show'
            },
            hide: {
                event: 'keydown hideTooltip'
            },
            position: position,
            style: {
                classes: 'qtip-mystyle qtip-rounded',
                tip: {
                    height: 10,
                    width: 10
                }
            }
        }).trigger('show');
    }

    var validateForm = function(form) {
        console.log("<< Validate form >>");
        var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
            valid = true;

        $.each(elements, function (index, value) {
            var element = $(value),
                val = element.val(),
                pos = element.attr('qtip-position');                

            if(val.length === 0 ){
                element.addClass('has-error');
                _createQtip(element, pos);
                valid = false;
            }
        });

        return valid;    

    }

    // Return object - publics methods.
    return {
        init: init,
        validateForm: validateForm,
        clearForm: clearForm
    };
})();

validation.init();