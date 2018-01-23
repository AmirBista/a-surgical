jQuery(function() {
   
    /**
    * Set Language
    */
    var lang = loginLang,
        lblUsername = lang['lblUsername'],
        lblPassword = lang['lblPassword'];
    languageImplimentation();

    /**
    * Centralize Login Form
    */
    jQuery.fn.center = function () {
        this.css("position","absolute");
        this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
        this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
        return this;
    }
    $('.hideme').show();
    $( window ).resize(function() {
        $('.loginbox').center();
    });
    $('.loginbox').center();

    /**
    * Placeholder for password
    */
    var pass_hidden = $("#pass_hidden"),
        password = $("#password");
        pass_hidden.show();
        password.hide();
        pass_hidden.focus(function() {
            $(this).hide();  
            password.show();
            password.focus();  
        });
        password.blur(function() {
            if($(this).val().length == 0)
            {
                $(this).hide();  
                pass_hidden.show();
            }      
      });

    /**
    * Placeholder for input
    */
    $('input[type=text]').on({
        'focus': function(){ // clear the placeholder
        if( $(this).val() == $(this).attr('placeholder')){ $(this).val(''); }
        },
        'blur': function(){ // reset the placeholder
        if( $(this).val() == ''){ $(this).val($(this).attr('placeholder')); }
        }
    });

    /**
    * Show ToolTip
    */
    $( document ).tooltip({
      position: {
        my: "center bottom-3",
        at: "center top",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            // .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    });
    /**
    * Submit login Form
    */
    jQuery('#client_login').on('click',function(){
        var d = {},
            uname = $('#username'),
            pass = $('#password'),
            pass_hidden = $('#pass_hidden'),
            username = uname.val(),
            password = pass.val(),
            password_hidden = pass_hidden.val();
            $(".dialog-message").hide();
        if(username=='' || username==lblUsername){
            uname.addClass('redbg');
            uname.attr('title',lang['lblLoginFail']);
        }
        else{
            uname.removeClass('redbg');
            uname.attr('title','');
        }
        if(password=='' || password==lblPassword){
            pass.addClass('redbg');
            pass_hidden.addClass('redbg');
            pass.attr('title',lang['lblLoginFail']);
        }
        else{
            pass.removeClass('redbg');
            pass_hidden.removeClass('redbg');
            pass.attr('title','');
        }
        if(username=='' || password=='' || password==lblPassword || username==lblUsername) return;

        d['username'] = username;
        d['password'] = password;
        d['remember_me'] = $('#remember_me').is(":checked")?1:0;
         waitingDialog({});
        jQuery.ajax({
            type: "POST",
            url: "bizlayer/auth/login",
            data: d,
            success: function(msg){
                var dec = jQuery.parseJSON(msg);
                if(dec['success']){
                    window.location.reload();
                }
                else{
                    closeWaitingDialog();
                    $( ".dialog-message" ).show();

                    // $( ".dialog-message" ).dialog({
                    //   modal: true,
                    //   width: 315,
                    //   dialogClass: "custom_dialog",
                    //   buttons: {
                    //     Ok: function() {
                    //       $( this ).dialog( "close" );
                    //     }
                    //   }
                    // });
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                closeWaitingDialog();
            }  
        });
    });
    /**
    * Set enter key for login
    */
    $('input').keyup(function(e){
        if(e.keyCode == 13)
        {
            $('#client_login').trigger("click");
        }
    });

// create the loading window and set autoOpen to false
    $("#loadingScreen").dialog({
        autoOpen: false,    // set this to false so we can manually open it
        dialogClass: "loadingScreenWindow",
        closeOnEscape: false,
        draggable: false,
        width: 280,
        minHeight: 120,
        modal: true,
        buttons: {},
        resizable: false,
        open: function() {
            // scrollbar fix for IE
            $('body').css('overflow','hidden');
        },
        close: function() {
            // reset overflow
            $('body').css('overflow','auto');
        },
        dialogClass: "noclose"
        }); // end of dialog

});
function waitingDialog(waiting) { 
    var lang = loginLang
    $("#loadingScreen").html(waiting.message && '' != waiting.message ? waiting.message : lang['lblWaiting']);
    // $("#loadingScreen").dialog('option', 'title', waiting.title && '' != waiting.title ? waiting.title : 'Loading');
    $("#loadingScreen").dialog('open');
}
function closeWaitingDialog() {
    $("#loadingScreen").dialog('close');
}
function languageImplimentation(){
    var lang = loginLang,
        lblUsername = lang['lblUsername'],
        lblPassword = lang['lblPassword'],
        lblRememberMe = lang['lblRememberMe'],
        btnLogin = lang['btnLogin'];
    
    if ($('#username').val() == '')
    {
        $('#username').val(lblUsername);
    }
    $('#username').attr('placeholder',lblUsername);

    $('#pass_hidden').val(lblPassword);
    $('#pass_hidden').attr('placeholder',lblPassword);

    $('#password').attr('placeholder',lblPassword);
    $('#lblRememberMe').text(lblRememberMe);

    $('#btnLogin').text(btnLogin);
    // $('#headerLoginFail').attr('title',lang['appTitle']);
    $('#loginHeader').text(lang['lblLoginScreen']);

    $('#headerLoginFail .message').text(lang['lblLoginFail']);
}