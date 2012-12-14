
//========================   BEGIN Page preload =============================

window.onload=function() {
    document.getElementById('preload').style.display='none';
}

//  END Page preload

//======================== BEGIN Header slider =============================

jQuery(function($){
    $.supersized({
        // Functionality
        slide_interval      : 5000,     // Length between transitions
        transition          : 1, 	// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
        transition_speed    : 500,	// Speed of transition

        // Components							
        slide_links         : 'false',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
        slides              : [	// Slideshow Images
        {
            image : 'img/slider/bg1.jpg'
        },  

        {
            image : 'img/slider/bg2.jpg'
        }, 

        {
            image : 'img/slider/bg3.jpg'
        }, 

        {
            image : 'img/slider/bg4.jpg'
        }, 

        {
            image : 'img/slider/bg5.jpg'
        }, 

        {
            image : 'img/slider/bg6.jpg'
        }, 
        ]
    });
});

//======================== END Header slider =============================

$(document).ready(function(){
    
    //======================== NAV MOVEMENT =============================

	$("nav").sticky({topSpacing: 0});
        
//    //======================== PAGE SCROLL =============================
	$('ul.menu').onePageNav();
	$('#sa a').smoothScroll();
//	
//	$('a.enter').mouseenter(function(e) {
//        $("a.enter").animate({padding:15+"px", opacity:0.7});
//    });
//	$('a.enter').mouseleave(function(e) {
//        $("a.enter").animate({padding:10+"px", opacity:1});
//    });
        

    //======================== BEGIN Parallax param =============================


    $('#parallax1').parallax("50%", 0.1);
    $('.bg1').parallax("50%", 0.3);

    $('#parallax2').parallax("50%", 0.1);
    $('.bg2').parallax("50%", 0.3);

    //======================== END Parallax param =============================



    //======================== BEGIN Header height resizer =============================
    function header() {
        var windowHeight = $(window).height();
        var windowHeight2 = $(window).height();
        var header = $("#header");
        var slider = $(".slider");

        var logo = $(".header-title");
        header.css("height",windowHeight+"px");
        slider.css("height",windowHeight+"px");
        logo.css("top",windowHeight/5+"px");

    }
    header();

    $(window).resize(function(){
        header();
        navi();
    });
    
    $(window).bind('scroll', function(){
        navi();
    });
	
    $('#nav').hide();
    $('#nav ul').fadeOut();
    $('#nav ul.social').fadeOut();
    $('.foot-social').fadeOut();
	
    function navi(){
        if ($(window).scrollTop() >= $(window).height()){
            if(!$('#nav').is(':animated')) {
			
                $('#nav').stop(true,true).slideDown(500, function(){
				
                    if($(window).width() < 767){
                        $('#nav ul.menu').fadeIn();
                        $('#nav ul.social').fadeOut(10);
                        $('.foot-social').fadeIn();	
                    }
                    else{
                        $('#nav ul').fadeIn();	
                        $('.foot-social').fadeOut();
                    }
                });
			
            }
        }else{
            if(!$('#nav').is(':animated')) {

                $('#nav ul').fadeOut(function(){
                    $('#nav').stop(true,true).slideUp(500);	
                });	
            }
        }
    }
    
    //======================== END Header height resizer =============================

    //======================== BEGIN Ajax gallery loader =============================

    $('#gallery').load('data/gallery.html');

    $('#return').live('click',function(){
        $('.gallery-loader').css('display','block');
        $('#gallery').animate({
            opacity: 0
        }, 500,function() {
            $('#gallery').load('data/gallery.html');
        });
        $('#gallery').animate({
            opacity: 1
        }, 500, function(){
            $('.gallery-loader').css('display','none');
        });
    });

    $('.view_gallery').live('click',function(){
        var gallery = $(this).attr('id');
        $('.gallery-loader').css('display','block');
        $('#gallery').animate({
            opacity: 0
        }, 500,function() {
            $('#gallery').load('data/'+gallery+'.html');
        });
        $('#gallery').animate({
            opacity: 1
        }, 500, function(){
            $('.gallery-loader').css('display','none');
        });
        return false; 
    });

    //======================== END Ajax gallery loader =============================



    /*
     *  Simple image gallery. Uses default settings
     */
    $('.fancybox').fancybox();
    /*
     *  Different effects
     */
    // Change title type, overlay closing speed
    $(".fancybox-effects-a").fancybox({
        helpers: {
            title : {
                type : 'outside'
            },
            overlay : {
                speedOut : 0
            }
        }
    });
    // Disable opening and closing animations, change title type
    $(".fancybox-effects-b").fancybox({
        openEffect  : 'none',
        closeEffect	: 'none',

        helpers : {
            title : {
                type : 'over'
            }
        }
    });
    // Set custom style, close if clicked, change title type and overlay color
    $(".fancybox-effects-c").fancybox({
        wrapCSS    : 'fancybox-custom',
        closeClick : true,
        openEffect : 'none',
        helpers : {
            title : {
                type : 'inside'
            },
            overlay : {
                css : {
                    'background' : 'rgba(238,238,238,0.85)'
                }
            }
        }
    });
    // Remove padding, set opening and closing animations, close if clicked and disable overlay
    $(".fancybox-effects-d").fancybox({
        padding: 0,
        openEffect : 'elastic',
        openSpeed  : 150,
        closeEffect : 'elastic',
        closeSpeed  : 150,
        closeClick : true,
        helpers : {
            overlay : null
        }
    });
});



function submitForm(){ // AJAX Send message to admin mail contact form
    $.ajax({
        url: "scripts/send_mail.php",
        type: "POST",
        dataType: "json",
        data: ({
            name : $('#yourname').val(),
            email : $('#email').val(),
            subject : $('#tele').val(),
            message : $('#message').val()
        }),
        success: function(data){
            var dataError = '<ul>';
            $.each(data.error, function(key , val){
                dataError +='<li>'+val+'</li>'
            });
            dataError +='</ul>';
            $('#error').append('<div class="alert alert-error">'+
                '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
                '<strong>Oh snap!</strong>'+dataError+
                '</div>'
                );
        }   
    });
}