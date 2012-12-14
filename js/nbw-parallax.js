/*
Demo: Despiration Tutorial Parallax Demo
Author: Elias Ghosn - Despiration.com
Author URL: http://www.despiration.com/
Tutorial URL: http://www.ianlunn.co.uk/blog/code-tutorials/recreate-nikebetterworld-parallax/

License: http://creativecommons.org/licenses/by-sa/3.0/ (Attribution Share Alike). Please attribute work to Despiration.com simply by leaving these comments in the source code or if you'd prefer, place a link on your website to http://www.despiration.com/.

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

$(document).ready(function() { //when the document is ready...


	//save selectors as variables to increase performance
	var $window = $(window);
	var $firstBG = $('#parallax1');
	var bg1 = $("#parallax1 .bg1");
	var $secondBG = $('#parallax2');
	var bg2 = $("#parallax2 .bg2");
	var $thirdBG = $('#parallax3');
	var bg3 = $("#parallax3 .bg3");
	
	var windowHeight = $window.height(); //get the height of the window
	
	
	//apply the class "inview" to a section that is in the viewport
	$('#parallax1,#parallax2,#parallax3').bind('inview', function (event, visible) {
			if (visible == true) {
			$(this).addClass("inview");
			} else {
			$(this).removeClass("inview");
			}
		});
	
			
	//function that places the navigation in the center of the window
	function RepositionNav(){
		var windowHeight = $window.height(); //get the height of the window
		//var navHeight = $('#nav').height() / 2;
		var windowCenter = (windowHeight / 2); 
		//var newtop = windowCenter - navHeight;
		//$('#nav').css({"top": newtop}); //set the new top position of the navigation list
	}
	
	//function that is called for every pixel the user scrolls. Determines the position of the background
	/*arguments: 
		x = horizontal position of background
		windowHeight = height of the viewport
		pos = position of the scrollbar
		adjuster = adjust the position of the background
		inertia = how fast the background moves in relation to scrolling
	*/
	function newPos(x, windowHeight, pos, adjuster, inertia){
		return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
	}
	
	//function to be called whenever the window is scrolled or resized
	function Move(){ 
		var pos = $window.scrollTop(); //position of the scrollbar

		//if the first section is in view...
		if($firstBG.hasClass("inview")){
			//call the newPos function and change the background position
			$firstBG.css({'backgroundPosition': newPos(0, windowHeight, pos, 1500, 0)}); 
			//call the newPos function and change the second background position
			bg1.css({'backgroundPosition': newPos(50, windowHeight, pos, 2950, 0.2)});
		}
		
		//if the second section is in view...
		if($secondBG.hasClass("inview")){
			//call the newPos function and change the background position
			$secondBG.css({'backgroundPosition': newPos(0, windowHeight, pos, 1400, 0)});
			//$secondBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 1550, 0.3)});
			bg2.css({'backgroundPosition': newPos(50, windowHeight, pos, 4410, 0.2)});
			//call the newPos function and change the second background position
		}
		
		if ($thirdBG.hasClass("inview")){
			//call the newPos function and change the background position
			$thirdBG.css({'backgroundPosition': newPos(0, windowHeight, pos, 2000, 0)});
			//$secondBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 1550, 0.3)});
			bg3.css({'backgroundPosition': newPos(50, windowHeight, pos, 5510, 0.2)});
			//call the newPos function and change the second background position
		}
		
		$('#pixels').html(pos); //display the number of pixels scrolled at the bottom of the page
	}
		
	RepositionNav(); //Reposition the Navigation to center it in the window when the script loads
	
	$window.resize(function(){ //if the user resizes the window...
		Move(); //move the background images in relation to the movement of the scrollbar
		RepositionNav(); //reposition the navigation list so it remains vertically central
	});		
	
	$window.bind('scroll', function(){ //when the user is scrolling...
		Move(); //move the background images in relation to the movement of the scrollbar
	});
	
});