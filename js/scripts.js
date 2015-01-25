/**
 * Created by Dan on 10/21/14.
 */


$(document).ready(function(){
    /*
     *  Smooth Scroll
     */
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 400);
                    return false;
                }
            }
        });
    });

    $('#phoneForm')
        .bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                phoneNumber: {
                    validators: {
                        phone: {
                            country: 'US',
                            message: ' '
                        }
                    }
                }
            }
        });
    $('.validation-button').click(function(){
        $('#validationModal').modal().show();
        var checkComplete = setInterval(function(){
            var iFrame = $("#validation-iFrame");
            if (iFrame.contents().find("#closeModal").val() == "true"){
                $('#validationModal').modal('hide');
                clearInterval(checkComplete);
            }
        },300);

        var checkLoaded = setInterval(function(){
            var iFrame = $("#validation-iFrame");
            if (iFrame.contents().find(".sweetcaptcha img").length > 0){
                setTimeout(function(){
                    /* Get the second line of the message */
                    var oldMessage = iFrame.contents().find("p").html();
                    var firstLetter = oldMessage.indexOf("<br>")+4;
                    var newMessage = oldMessage.substring(firstLetter, 100);

                    /* Format and replace the instructions */
                    newMessage = newMessage.replace("Drag the", "Drag the<span>");
                    newMessage = newMessage.replace("to the", "</span>to the<span>");
                    newMessage = newMessage.concat('</span>');
                    iFrame.contents().find("p").html(newMessage);

                    clearInterval(checkLoaded);
                }, 1);

            }
        },5)


    });

    $('#validationModal').on('hidden.bs.modal', function () {
        $("#validation-iFrame").attr('src','about:blank');
        $('#phoneNumber').val("");
    });

    /*
     * Header stuff
     */

    var header = $('#top-nav');
    var distance = $('#store-badges').offset().top;
    var $window = $(window);
    var visible = false;
    $window.scroll(function() {
        if ( $window.scrollTop() >= 1 ) {
            if (!visible){
                visible = true;
                header.css('opacity','.99')
            }
        } else{
            if (visible){
                visible = false;
                header.css('opacity','0')
            }
        }
    });


    window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
        d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
        _.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute('charset','utf-8');
        $.src='//v2.zopim.com/?2cNYEojBfOTKQSTbKcu0XusKJk9DgG2p';z.t=+new Date;$.
            type='text/javascript';e.parentNode.insertBefore($,e)})(document,'script');
});

/*
 * iPad Stuff
 */
if($(window).width() <= 768) {
    var leftHeight = $('#splash .col-sm-7').height();
    var headingHeight = $('#splash  h1').height() + 30;
    $('#splash > .col-sm-5').height(leftHeight);
    $('#splash > .col-sm-5 img').css({
        'bottom': '-' + headingHeight + 'px',
        'position': 'absolute'
    });
}


/*
 * Phone Stuff
 */

$('.left').on('click',function(){
    console.log('clicked')
   window.location = 'http://teachers.whatsdueapp.com';
});
//$('.right').on('click', function(){
    var ua = navigator.userAgent.toLowerCase();
    var isIphone = ua.indexOf("iphone") > -1;
    var isIpad = ua.indexOf("ipad") > -1;
    var isAndroid = ua.indexOf("android") > -1;
    if(isIphone || isIpad) {
        window.location='https://itunes.apple.com/us/app/whatsdue-never-miss-another/id924662865';
    }else if (isAndroid){
        window.location = 'market://details?id=com.whatsdue.app';
    }
//});