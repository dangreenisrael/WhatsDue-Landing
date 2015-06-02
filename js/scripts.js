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
     * Form Stuff
     */

    function submitTeacherForm(){
        var teacherForm = $('#teacherForm');
        teacherForm.validate();
        valid = teacherForm.valid();
        console.log(valid);

        if (valid){
            $.ajax({
                type: "POST",
                url: "php/form_handler.php",
                data: teacherForm.serialize(),
                success: function(response) {
                    console.log(response);
                    $('#teacherModal').modal('hide');
                }
            });
        }
    }
    $('#teacherSubmit').on('click', submitTeacherForm);
    $('#teacherForm').on('keypress', function(e) {
        if(e.which == 13) {
            submitTeacherForm();
        }
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
 * Getting Local IP
 * Credit: https://github.com/diafygi/webrtc-ips
 * License: https://github.com/diafygi/webrtc-ips/blob/master/LICENSE
 */

//get the IP addresses associated with an account
function getIPs(callback){
    var ip_dups = {};

    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;

    //bypass naive webrtc blocking using an iframe
    if(!RTCPeerConnection){
        //NOTE: you need to have an iframe in the page right above the script tag
        //
        //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
        //<script>...getIPs called in here...
        //
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection
        || win.mozRTCPeerConnection
        || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }

    //minimal requirements for data connection
    var mediaConstraints = {
        optional: [{RtpDataChannels: true}]
    };

    //firefox already has a default stun server in about:config
    //    media.peerconnection.default_iceservers =
    //    [{"url": "stun:stun.services.mozilla.com"}]
    var servers = undefined;

    //add same stun server for chrome
    if(useWebKit)
        servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);

    function handleCandidate(candidate){
        //match just the IP address
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
        var ip_addr = ip_regex.exec(candidate)[1];

        //remove duplicates
        if(ip_dups[ip_addr] === undefined)
            callback(ip_addr);

        ip_dups[ip_addr] = true;
    }

    //listen for candidate events
    pc.onicecandidate = function(ice){

        //skip non-candidate events
        if(ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };

    //create a bogus data channel
    pc.createDataChannel("");

    //create an offer sdp
    pc.createOffer(function(result){

        //trigger the stun server request
        pc.setLocalDescription(result, function(){}, function(){});

    }, function(){});

    //wait for a while to let everything done
    setTimeout(function(){
        //read candidate info from local description
        var lines = pc.localDescription.sdp.split('\n');

        lines.forEach(function(line){
            if(line.indexOf('a=candidate:') === 0)
                handleCandidate(line);
        });
    }, 1000);
}

//Test: Print the IP addresses into the console
//getIPs(function(ip){console.log(ip);});