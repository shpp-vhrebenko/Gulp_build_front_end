$(function(){
    var wrapper = $( ".fileupload-lable" ),
        inp = wrapper.find( ".fileupload" ),
        btn = wrapper.find( ".button-fileupload" ),
        lbl = wrapper.find( ".input-filename" );

    // Crutches for the :focus style:
/*    inp.focus(function(){
        wrapper.addClass( "focus" );
    }).blur(function(){
        wrapper.removeClass( "focus" );
    });*/

    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    inp.change(function(){
        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] )
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( "C:\\fakepath\\", '' );

        if( ! file_name.length )
            return;

        if( lbl.is( ":visible" ) ){
            lbl.val( file_name );
        }else
            btn.text( file_name );
    }).change();

});

$( window ).resize(function(){
    $( ".file_upload input" ).triggerHandler( "change" );
});
