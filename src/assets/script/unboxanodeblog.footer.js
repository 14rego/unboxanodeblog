(function() {
	'use strict';

	// Detect Mobile
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	// Back to top
	var backToTop = function() {
		$('.js-backtotop').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({
	      scrollTop: $('body').offset().top
	    }, 700, 'easeInOutExpo');
		});
	}
	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){
			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var nextScroll = function() {
		$('.js-next').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({
      	scrollTop: $( $.attr(this, 'href') ).offset().top
    	}, 700, 'easeInOutExpo');
		});

		$(window).scroll(function(){

			var $this = $(this),
				st = $this.scrollTop();

			if (st > 10) {
				$('.js-next').addClass('unbox-sleep');
			} else {
				$('.js-next').removeClass('unbox-sleep');
			}

		});
	}

	// Burger Menu
	var mobileMenuControl = function() {
		$('.unbox-burger-menu').on('click', function(e){
			e.preventDefault();
			if ($('body').hasClass('show')) {
				$('.unbox-burger-menu').removeClass('active');
				$('body').removeClass('show');
			} else {
				$('.unbox-burger-menu').addClass('active');
				$('body').addClass('show');
			}
		});

		if ($(window).width() > 766) {
			$('body').removeClass('unbox-mobile-menu-active');
			$('.unbox-burger-menu').removeClass('active');
		} else {
			$('body').addClass('unbox-mobile-menu-active');
		}

		$(window).resize(function(){
			if ($(window).width() > 766) {
				$('body').removeClass('unbox-mobile-menu-active');
				$('.unbox-burger-menu').removeClass('active');
			} else {
				$('body').addClass('unbox-mobile-menu-active');
			}
		});

		$(document).click(function (e) {
		    var container = $(".unbox-nav, .unbox-burger-menu");
		    
		    if (!container.is(e.target) && container.has(e.target).length === 0) {
		      if ( $('body').hasClass('show') ) {
						$('body').removeClass('show');
						$('.unbox-burger-menu').removeClass('active');
					}
		    }
		});
	};

	// Search
	var searchControl = function() {
		$('.js-unbox-search').on('click', function(){
			$('#unbox-search').addClass('active');
			setTimeout(function(){
				$('#unbox-search').find('#search').focus().select();
			}, 500);
		});
		$('.js-unbox-close').on('click', function(){
			$('#unbox-search').removeClass('active');
		});
	};

	// Menu Hover
	var menuHover = function() {
		if (!isMobile.any()) {
			$('.unbox-navbar .navbar-nav li.dropdown').hover(function() {
			  $(this).find('> .dropdown-menu').stop(true, true).delay(200).fadeIn(500).addClass('animated-fast fadeInUp');
			}, function() {
				$(this).find('> .dropdown-menu').stop(true, true).fadeOut(200).removeClass('animated-fast fadeInUp')
			});
		}
	}
	// Carousel
	var owlCarousel = function(){

		var owl1 = $('.owl-carousel-carousel'),
		 	owl2 = $('.owl-carousel-carousel2'),
		 	owl3 = $('.owl-carousel-carousel3');
		owl1.owlCarousel({
			items: 3,
			loop: true,
			margin: 20,
			nav: false,
			dots: false,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='icon-keyboard_arrow_left owl-direction'></i>",
		      "<i class='icon-keyboard_arrow_right owl-direction'></i>"
	     	],
	     	responsive:{
	        0:{
	            items:1
	        },
	        400:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    	}
		});

		owl2.owlCarousel({
			items: 3,
			loop: true,
			margin: 20,
			nav: false,
			dots: false,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='icon-keyboard_arrow_left owl-direction'></i>",
		      "<i class='icon-keyboard_arrow_right owl-direction'></i>"
	     	],
	     	responsive:{
	        0:{
	            items:1
	        },
	        400:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    	}
		});

		owl3.owlCarousel({
			items: 3,
			loop: true,
			margin: 20,
			nav: false,
			dots: false,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='icon-keyboard_arrow_left owl-direction'></i>",
		      "<i class='icon-keyboard_arrow_right owl-direction'></i>"
	     	],
	     	responsive:{
	        0:{
	            items:1
	        },
	        400:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    	}
		});


		// Custom Navigation Events
		$('.unbox-owl-next').click(function(e){
		  owl1.trigger('next.owl.carousel');
		  e.preventDefault();
		});
		$('.unbox-owl-prev').click(function(e){
		  owl1.trigger('prev.owl.carousel');
		  e.preventDefault();
		});

		// Custom Navigation Events
		$('.unbox-owl-next2').click(function(e){
		  owl2.trigger('next.owl.carousel');
		  e.preventDefault();
		});
		$('.unbox-owl-prev2').click(function(e){
		  owl2.trigger('prev.owl.carousel');
		  e.preventDefault();
		});

		// Custom Navigation Events
		$('.unbox-owl-next3').click(function(e){
		  owl3.trigger('next.owl.carousel');
		  e.preventDefault();
		});
		$('.unbox-owl-prev3').click(function(e){
		  owl3.trigger('prev.owl.carousel');
		  e.preventDefault();
		});

		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			loop: true,
			margin: 20,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			autoplay: true,
			navText: [
		      "<i class='icon-keyboard_arrow_left owl-direction'></i>",
		      "<i class='icon-keyboard_arrow_right owl-direction'></i>"
	    ],
	    responsive:{
	    	0:{
		      items: 1
			  },
			  980:{
		      items: 1
			  },
			  1100:{
		      items: 2
			  }
			}
		});

		var owl = $('.owl-work');
		owl.owlCarousel({
			stagePadding: 150,
			loop: true,
			margin: 20,
			nav: true,
			dots: false,
			mouseDrag: false,
			autoWidth: true,
			autoHeight: true,
	    autoplay: true,
	    autoplayTimeout:2000,
	    autoplayHoverPause:true,
			navText: [	
				"<i class='icon-chevron-thin-left'></i>",
				"<i class='icon-chevron-thin-right'></i>"
			],
			responsive:{
			  0:{
		      items:1,
		      stagePadding: 10
			  },
			  500:{
			  	items:2,
		      stagePadding: 20
			  },
			  600:{
		      items:2,
		      stagePadding: 40
			  },
			  800: {
			  	items:2,
			  	stagePadding: 100
			  },
			  1100:{
		      items:3
			  },
			  1400:{
		      items:4
			  },
			}
		});
	};

	// Slider
	var flexSlider = function() {
	  $('.flexslider').flexslider({
	    animation: "fade",
	    prevText: "",
	    nextText: "",
	    slideshowSpeed: 2000, // speed of slides
	    animationSpeed: 600,
	    slideshow: true,
	    directionNav: false,
	    controlNav: true
	  });
	  $('.flexslider2').flexslider({
	    animation: "fade",
	    prevText: "",
	    nextText: "",
	    slideshowSpeed: 2000, // speed of slides
	    animationSpeed: 600,
	    slideshow: true,
	    directionNav: false,
	    controlNav: false
	  });
	}

	// Content Animation
	var contentWayPoint = function() {
		var i = 0;
		$('.unbox-animate').waypoint( function( direction ) {
			if( direction === 'down' && !$(this.element).hasClass('unbox-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .unbox-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn unbox-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft unbox-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight unbox-animated');
							} else {
								el.addClass('fadeInUp unbox-animated');
							}
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 200);
				
			}

		} , { offset: '80%' } );
	};

	// Counter Animation
	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};
	var counterWayPoint = function() {
		if ($('#unbox-counter').length > 0 ) {
			$('#unbox-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('unbox-animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('unbox-animated');
				}
			} , { offset: '90%' } );
		}
	};

	var magnificPopupControl = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function(openerElement) {
				// openerElement is the element on which popup was initialized, in this case its <a> tag
				// you don't need to add "opener" option if this code matches your needs, it's defailt one.
				return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});

		$('.with-caption').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function(item) {
					return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
				}
			},
			zoom: {
				enabled: true
			}
		});


		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			
			fixedContentPos: false
	    });
	}

	// Stellar
	var stellarInit = function() {
		if( !isMobile.any() ) {
			$(window).stellar();
		}
	};

	// Loading page
	var loaderPage = function() {
		$(".unbox-loader").fadeOut("slow");
	};


	// Document Ready 
	$(document).ready(function(){
		menuHover();
		counterWayPoint();
		contentWayPoint();
		backToTop();
		searchControl();
		magnificPopupControl();
		stellarInit();
		mobileMenuControl();
		nextScroll();
		loaderPage();
		goToTop();
	});

	$(window).load(function(){
		owlCarousel();
		flexSlider();
	});

	

})();
var idPage = $('body').attr('id');
$(function(){
	idPage = $('body').id;
	$('.unbox-nav li.'+idPage).addClass('active');
	$('#btnSubmit').on('click',function(event){
		$(this).find('.fa-loading').show();
		return true;
	});
	if (qmsg === 'failed') {
		$('#'+qelm+' .form-result.failure, #'+qelm+' form').show();
		$('#'+qelm+' #btnSubmit .fa-loading').hide();
	}
	$('.blink-social').on('click', function(event){
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $('html').height()
		}, 250);
		var time = 250;
		$('.unbox-footer-widget .unbox-social li').each(function(index, value) {
			var _this = $(this);
		    setTimeout(function() {
		        _this.addClass('blink');
		    }, time);
			setTimeout(function() {
			    _this.removeClass('blink');
			}, (time * 1.5) );
		    time += 250;
		});
	});
	if (getCookie('cookies') !== 'accepted'){
		$('#cookieWarning').removeClass('hide');
		$(document).on('click', function(e) {
		  setCookie('cookies','accepted',30);
		  $('#cookieWarning').addClass('hide');
		  return true;
		});
	}
	$('#cookieWarning .dismiss').on('click', function(e){
		e.preventDefault();
		$('#cookieWarning').addClass('hide');
		setCookie('cookies','accepted',30);
	});
});
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}
///* BLOG POSTS *///
var posts = [{
    "id": "#TBD",
    "title": "Under Construction",
    "body": "<p>I’m in the process of a data migration from my old blog to this fancy new one. Come back soon?</p>",
    "created": "2018-09-10 00:00:00",
    "tags": "data, migration, upgrade",
    "status": "1",
    "modified": "2018-09-10 09:13:01"
}];
function listPosts(posts, tag){
	var fullList = '',
		postLimit = 15,
		postCount = 0,
		template = $('.blog-fill').html();
	for (i = (posts.length - 1); i >= 0; i--){
		var postHasTag = false, // set flag for later
			tempHTML = template, // get HTML template
			repUrl = tempHTML.replace('[url]', '/blog/post/'+posts[i].id+
				'-'+posts[i].title.toLowerCase().replace(/[^0-9a-z-]/g,'-')),
			repTitle = repUrl.replace('[title]', posts[i].title),
			tempDate = new Date(posts[i].created),
			repDate = repTitle.replace('[date]', tempDate.toDateString()),
			tagArr = posts[i].tags.toString().replace(' ','').split(','),
			tagString = '',
			postText = posts[i].body.replace(/<(?:.|\n)*?>/gm, ''),
			tempIntro;
		if (postText.length > 250) {
			tempIntro = postText.substr(0, 250).trim() + '&hellip;';
		} else {
			tempIntro = postText;
		}
		var repIntro = repDate.replace('[intro]', tempIntro),
			repBody = repIntro.replace('[body]', posts[i].body);
		for (j = 0; j < tagArr.length; j++){
			if (tagArr[j].length > 1) {
				if (tagArr[j].toLowerCase() === tag.toLowerCase() || tag.toLowerCase() == 'all') {
					postHasTag = true;
				}
				tagString += '<a href="/blog/tag/'+tagArr[j].replace(' ','').replace('%20','')+'" class="badge badge-pill badge-secondary"> '+tagArr[j]+'</a> ';
			}
		}
		var repTags = repBody.replace('[tags]', tagString);
		if (postHasTag == true && postCount < 15) {
			fullList += repTags;
			postCount++;
		}
	}
	$('.blog-fill').html(fullList);
}