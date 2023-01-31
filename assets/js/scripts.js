/******************************************************************
	
	
	@ Item          ASECTION // Personal One Page Portfolio HTML Template
	@ Version       1.0
	@ Author		Avanzare
	@ Website		http://themeforest.net/user/avanzare 
	

 ******************************************************************/
 
 
 /******************************************************************


	------------------------
	-- TABLE OF CONTENTS --
	------------------------
	
	--  1. Base
	--  2. Section System
	--  3. Carousels
	--  4. Lightbox
	--  5. Contact Form
	--  6. Misc
 
 
 ******************************************************************/



/** 1. Base
*******************************************************************/

// Init Setups
carousel_setup();
lightbox_setup();
form_setup();
hover_interaction_setup();


// Mobile Detect
$("#main .section").each(function(){

	if( $(this).height() < $(this).find(".container").height() || $(window).width() < 600 ) $("body").addClass("classic-setup");
	
});


// Do after pager is loaded
window.onload = function() { 

	if( ! $("body").hasClass("classic-setup") ) {

		section_system();

	} else {

		gsap.to([".loading-screen p",".loading-screen .line"], {ease: "power3.in", duration: 0.6, opacity:0, y: "100%", onComplete: function(){
			gsap.to(".loading-screen", {ease: "power3.inOut", duration: 1, opacity:0, delay:0.3, zIndex:-100, onComplete: function(){
				$("#main").addClass("loaded");
				$("#main").removeClass("not-loaded");
			} 
			});
		}});

	}

};
	


/** 2. SECTION SYSTEM
*******************************************************************/

function section_system() {


	var options = {
		section_animation: "fade",
		section_animation_duration: 0.6,
		section_animation_ease: "power2.inOut",
		replay_content_animations: true,
		navigation_dots:  true,
		navigation_buttons: true,
	},

	section_wrapper = $("#main"),
	sections = section_wrapper.find(".section"),
	current_section = 0,
	upcoming_section = 1,
	section_amount = sections.length - 1,
	lock_change,

	text_obj = {},
	content_timeline_db = [],

	tl_prev = gsap.timeline(),
	tl_next = gsap.timeline(),
	tl_content = gsap.timeline();


	function create_splitt_text() {

		let text_obj_count = 0;
		
		$(".text-splitt").each(function() {

			let type ="words";

			if($(this).data("splitt-text-type") == "words" ) {
				type = "words";
			}

			if($(this).data("splitt-text-type") == "lines" ) {
				type = "lines";
			}

			if($(this).data("splitt-text-type") == "chars" ) {
				type = "chars";
			}
		
			text_obj[text_obj_count] = new SplitText($(this),{type:type});
			$(this).attr("data-splitt-text-id", text_obj_count);
			text_obj_count = text_obj_count + 1
		
		});
	
	} create_splitt_text();


	function get_animation_data(name,obj) {

		switch(name) {
			case "zoom_out":
				obj.scale = 1.5;
				obj.opacity = 0;
				return obj;
			break;
			case "zoom_in":
				obj.scale = 0;
				return obj;
			break;

			case "blur_in":
				obj.filter = "blur(100px)";
				return obj;
			break;
			case "rotate_down":
				obj.opacity = 0;
				obj.y = -50;
				obj.rotate = 8;
				obj.transformOrigin = '0% 100%';
				return obj;
			break;
			case "rotate_up":
				obj.opacity = 0;
				obj.y = 50;
				obj.rotate = 8;
				obj.transformOrigin = '0% 100%';
				return obj;
			break;
			case "fade_in":
				obj.opacity = 0;
				return obj;
			break;
			case "fade_in_from_bottom":
				obj.opacity = 0;
				obj.y = 100;
				return obj;
			break;
			case "fade_in_from_top":
				obj.opacity = 0;
				obj.y = -100;
				return obj;
			break;
			case "fade_in_from_left":
				obj.opacity = 0;
				obj.x = -100;
				return obj;
			break;
			case "fade_in_from_right":
				obj.opacity = 0;
				obj.x = 100;
				return obj;
			break;
			default:
		  }

	}


	function create_timeline_database() {

		$("#main .section").each(function(){

			let animation_data = gsap.timeline().pause().seek(0);

			$(this).find(".content-animate").each(function(){

				let settings = {};
				
				settings.ease = $(this).data("ease");
				settings.delay = $(this).data("delay");
				settings.duration = $(this).data("duration");
				get_animation_data($(this).data("animation-type"),settings);
				
				if( $(this).hasClass("text-splitt") ) {

					settings.stagger = $(this).data("stagger");

					let type = "words";

					if($(this).data("splitt-text-type") == "words" ) {
						type = "words";
					}
		
					if($(this).data("splitt-text-type") == "lines" ) {
						type = "lines";
					}
		
					if($(this).data("splitt-text-type") == "chars" ) {
						type = "chars";
					}

					let splitt_data = text_obj[$(this).attr("data-splitt-text-id")];
					animation_data = animation_data.from(splitt_data[type], settings,0);

				} else {

					animation_data = animation_data.from($(this), settings,0);
			
				}

			});

			content_timeline_db.push( animation_data );

		});
		

	} create_timeline_database();


	function update_dot_nav() {

		if( options.navigation_dots == false) return;

		$("#main .dot-nav .dot").removeClass("active");
		$("#main .dot-nav .dot").eq(upcoming_section).addClass("active");

	}

	function create_dot_nav() {

		if( options.navigation_dots == false) return;

		$("#main").append('<div class="dot-nav"></div>');

		$(".section").each(function(){

			if($(this).data("section-name") !== undefined ) {
				$("#main .dot-nav").append('<div class="dot"><div class="name-tag">'+ $(this).data("section-name") +'</div><div class="line"></div></div>');
			} else {
				$("#main .dot-nav").append('<div class="dot"></div>');
			}

		});

		$("#main .dot-nav .dot").eq(current_section).addClass("active");

	}

	function create_buttons_nav() {

		if( options.navigation_buttons == false) return;

		$("#main").append('<div class="button-nav next-section change-section-on-click" data-section-change="next"><p>Next Section</p><div class="line"></div>');
		$("#main").append('<div class="button-nav prev-section change-section-on-click hide-button" data-section-change="prev"><div class="line"></div><p>Previous Section</p></div>');

	}

	function update_button_nav() {

		$(".button-nav").removeClass("hide-button");

		if(upcoming_section == 0) {
			$(".button-nav.prev-section").addClass("hide-button");
		}

		if(upcoming_section == section_amount) {
			$(".button-nav.next-section").addClass("hide-button");
		}

	}

	
	function inital_setup() {

		inital_section_setup();

		tl_content = content_timeline_db[current_section];
		lock_change = true;

		gsap.to([".loading-screen p",".loading-screen .line"], {ease: "power3.in", duration: 0.4, opacity:0, y: "100%", onComplete: function(){
			gsap.to(".loading-screen", {ease: "power3.inOut", duration: 1, opacity:0, zIndex:-100, delay:0.3, onComplete: function(){
				
				$("#main").addClass("loaded");
				$("#main").removeClass("not-loaded");

				tl_content.add(function(){
					sections.eq(current_section).addClass("content-animation-played");
					lock_change = false;
					
				});

				tl_content.play();
				
				
			}});
		}});
		
		create_dot_nav();
		create_buttons_nav();

	} inital_setup();


	function inital_section_setup() {

		switch(options.section_animation) {
			case "slide":

				gsap.set(sections, { y: "-100%"});
				gsap.set(sections.eq(current_section), { y: "0%"});

			break;
			case "fade":

				gsap.set(sections, { opacity: 0, zIndex:0});
				gsap.set(sections.eq(current_section), {  opacity: 1,zIndex:2} );
				
			break;
			case "stack":

				gsap.set(sections, { y: "100%"});
				gsap.set(sections.eq(current_section), { y: "0%"});
				
			break;
			case "parallax":

				gsap.set(sections, { y: "-100%", zIndex:2});
				gsap.set(sections.eq(current_section), { y: "0%", zIndex:0});

			break;
			case "scale":

				gsap.set(sections, { y: "-100%", zIndex:2,scale:1});
				gsap.set(sections.eq(current_section), { y: "0%", zIndex:0});

			break;
			default: console.log("________ERROR________: Selected section animation is not valid!");
		  }

	}



	function get_section_animation_data(direction) {

		switch(options.section_animation) {
			case "slide":

				if(direction == "next") {
					tl_next.set(sections.eq(upcoming_section), { y: "100%"});
					tl_next.to(sections.eq(current_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, y: "-100%"});
					tl_next.to(sections.eq(upcoming_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, y: "0%",delay:-(options.section_animation_duration+0.005)});
				}

				if(direction == "prev") {
					tl_prev.set(sections.eq(upcoming_section), { y: "-100%"});
					tl_prev.to(sections.eq(current_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, y: "100%"});
					tl_prev.to(sections.eq(upcoming_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, y: "0%",delay:-(options.section_animation_duration+0.005)});
				}

			break;
			case "fade":

				if(direction == "next") {
					tl_next.set(sections.eq(upcoming_section), { zIndex:2});
					tl_next.set(sections.eq(current_section), { zIndex:0});
					tl_next.to(sections.eq(current_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, opacity: 0});
					tl_next.to(sections.eq(upcoming_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, opacity: 1,delay:-options.section_animation_duration});
				}

				if(direction == "prev") {
					tl_prev.set(sections.eq(upcoming_section), {zIndex:2,});
					tl_prev.set(sections.eq(current_section), {zIndex:0});
					tl_prev.to(sections.eq(current_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, opacity: 0});
					tl_prev.to(sections.eq(upcoming_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, opacity: 1,delay:-options.section_animation_duration});
				}
				
			break;
			case "stack":

				if(direction == "next") {
					tl_next.set(sections, {zIndex:0});
					tl_next.set(sections.eq(current_section), {zIndex:1});
					tl_next.set(sections.eq(upcoming_section), {zIndex:2, y: "100%"});
					tl_next.to(sections.eq(upcoming_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, y: "0%"});
				}

				if(direction == "prev") {
					tl_prev.set(sections, {zIndex:0});
					tl_prev.set(sections.eq(current_section), {zIndex:1});
					tl_prev.set(sections.eq(upcoming_section), {zIndex:2, y: "-100%"});
					tl_prev.to(sections.eq(upcoming_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, y: "0%"});
				}

			break;
			case "parallax":

				if(direction == "next") {
					tl_next.set(sections.eq(upcoming_section), { y: "100%", opacity:1, zIndex:2});
					tl_next.set(sections.eq(current_section), { zIndex:0});
					tl_next.to(sections.eq(current_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, opacity:0,y: "-40%"});
					tl_next.to(sections.eq(upcoming_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, y: "0%", delay:-options.section_animation_duration});
				}

				if(direction == "prev") {
					tl_prev.set(sections.eq(upcoming_section), { y: "-100%", opacity:1, zIndex:2});
					tl_prev.set(sections.eq(current_section), { zIndex:0});
					tl_prev.to(sections.eq(current_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, opacity:0, y: "40%"});
					tl_prev.to(sections.eq(upcoming_section), {ease: options.section_animation_ease, duration: options.section_animation_duration,y: "0%", delay:-options.section_animation_duration});
				}

			break;
			case "scale":

				if(direction == "next") {
					tl_next.set(sections, { scale: 1});
					tl_next.set(sections.eq(upcoming_section), { y: "100%", opacity:1, zIndex:2});
					tl_next.set(sections.eq(current_section), { zIndex:0});
					tl_next.to(sections.eq(current_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, opacity:0, scale: 0.86,});
					tl_next.to(sections.eq(upcoming_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, y: "0%", delay:-options.section_animation_duration});
				}

				if(direction == "prev") {
					tl_prev.set(sections, { scale: 1});
					tl_prev.set(sections.eq(upcoming_section), { y: "-100%", opacity:1, zIndex:2});
					tl_prev.set(sections.eq(current_section), { zIndex:0});
					tl_prev.to(sections.eq(current_section), {ease: options.section_animation_ease, duration: options.section_animation_duration, opacity:0 ,scale: 0.86,});
					tl_prev.to(sections.eq(upcoming_section), {ease: options.section_animation_ease, duration: options.section_animation_duration,y: "0%",delay:-options.section_animation_duration});
				}

			break;
		  }


	}

	
	function update_timeline(type) {

			tl_content = content_timeline_db[upcoming_section];

			if(! sections.eq(current_section).hasClass("content-animation-played") || options.replay_content_animations == true){
				tl_content.seek(0).pause();
			}

			if(type == "next") {
				
				tl_next.clear();
				get_section_animation_data("next");

				tl_next.add(function(){

					update_dot_nav();
					update_button_nav();
					tl_content.play();

					if(!sections.eq(upcoming_section).hasClass("content-animation-played") || options.replay_content_animations == true) {
						
						tl_content.add(function(){
							sections.eq(upcoming_section).addClass("content-animation-played");
							current_section = upcoming_section;
							lock_change = false;
						});

					} else {

						current_section = upcoming_section;
						lock_change = false;

					}

				});

			}

			if(type == "prev") {

				tl_prev.clear();
				get_section_animation_data("prev");

				tl_prev.add(function(){

					update_dot_nav();
					update_button_nav();
					tl_content.play();

					if(!sections.eq(upcoming_section).hasClass("content-animation-played") || options.replay_content_animations == true) {
						
						tl_content.add(function(){
							sections.eq(upcoming_section).addClass("content-animation-played");
							current_section = upcoming_section;
							lock_change = false;
						});

					} else {

						current_section = upcoming_section;
						lock_change = false;

					}

				});

			}

	}


	function update_section(input) {

		if(lock_change == true) return;

		if(input == "prev") {
			
			if(current_section <= 0  ) return;

			lock_change = true;
			upcoming_section = current_section - 1;

			update_timeline("prev");


		} else if(input == "next") {

			if(current_section >= section_amount) return;

			lock_change = true;
			upcoming_section = current_section + 1;

			update_timeline("next");

		} else if(!isNaN(input)) {

			if( current_section == input) return;

			lock_change = true;
			upcoming_section = input;

			if( input < current_section ) {
				update_timeline("prev");
			} else if( input > current_section ) {
				update_timeline("next");
			}


		}
	}


	// Mouse Event
	window.addEventListener('wheel', function(event) {

		if (event.deltaY < 0) {
			update_section("prev");
		} else if (event.deltaY > 0) {
			update_section("next");
		}

	});

	// Keyboard Event
	document.onkeydown = function(e) {
		switch (e.key) {
			case "ArrowUp":
				update_section("prev");
			break;
			case "ArrowDown":
				update_section("next");
			break;
		}
	};

	// Dot Event
	$(".dot-nav .dot").click(function(){

		update_section($(this).index(".dot"));

	})

	// Button Event
	$(".change-section-on-click").click(function(){

		update_section($(this).data("section-change"));

	})


} 



/** 3. CAROUSELS
*******************************************************************/

function carousel_setup() {

	$('.testimonial-carousel').slick({
		dots: true,
		infinite: false,
		speed: 450,
		centerMode: true,
		variableWidth: false,
		nextArrow:'<div class="icon-button button-animation-right arrow-next d-none d-md-block"><span class="ti-arrow-right"></span><span class="ti-arrow-right"></span></div>',
		prevArrow:'<div class="icon-button button-animation-left arrow-prev d-none d-md-block"><span class="ti-arrow-left"></span><span class="ti-arrow-left"></span></div>',
		arrows: false,
		edgeFriction: 0.5,
		slidesToShow: 1,
		slidesToScroll: 1,
	});

}



/** 4. LIGHTBOX
*******************************************************************/

function lightbox_setup() {

	var customLightboxHTML = '<div id="glightbox-body" class="glightbox-container hide-nav">'
		+'<div class="gloader visible"></div>'
		+'<div class="goverlay"></div>'
		+'<div class="gcontainer">'
		+'<div id="glightbox-slider" class="gslider"></div>'
		+'<button class="gnext gbtn" tabindex="0" aria-label="Next"><p>Next</p><div class="line"></div></button>'
		+'<button class="gprev gbtn" tabindex="1" aria-label="Previous"><div class="line"></div><p>Prev</p></button>'
		+'<button class="gclose gbtn" tabindex="2" aria-label="Close"><div class="line"></div><p>Back</p></button>'
		+'</div>'
		+'</div>';

		var customSlideHTML = `<div class="gslide">
		<div class="gslide-inner-content">
			<div class="ginner-container">

			<div class="container">
				<div class="row justify-content-center">
				<div class="col-10">
				<div class="gslide-content-frame">

				<div class="gslide-media">
				<div class="gslide-description">
					<div class="gdesc-inner">
						<h4 class="gslide-title"></h4>
						<div class="gslide-desc"></div>
					</div>
				</div>
				<div class="info-button"><p>Info</p><div class="line"></div></div>
				</div>
				

				</div>
				</div>
				</div>
				</div>

			</div>
		</div>
	</div>`;

	var work_lightbox_1 = GLightbox({
		selector: ".work-lightbox-1",
		touchNavigation: true,
		loop: false,
		zoomable: false,
		slideHTML: customSlideHTML,
		lightboxHTML: customLightboxHTML,
	});

	work_lightbox_1.on('open', () => {

		setTimeout(function(){
			$(".glightbox-container ").removeClass("hide-nav");
		},300);

		var block = false;

		$(".gslide .info-button").on('click touchend', function () {

			if(block == true) return;

			block = true;
			
			var el = $(this).closest(".gslide");
	
			if(el.hasClass("show-desc")) {

				el.removeClass("show-desc");
				$(this).find("p").text("Info");

			} else {
				
				el.addClass("show-desc");
				$(this).find("p").text("Close");
				
			}

			setTimeout(function(){
				block = false;
			},500);

		});
		
	});

	work_lightbox_1.on('slide_before_change', () => {
		$(".gslide").removeClass("show-desc");
		$(".gslide .info-button p").text("Info");
	  });

}



 /** 5. CONTACT FORM
*******************************************************************/

function form_setup() {

	//CONTACT FORM
	$("#contact-form").submit(function(e) {
			
		e.preventDefault();
		
		var postdata = $(this).serializeArray(),
			pD_el_count = postdata.length;
		
		for( var count = 0; count < pD_el_count; count++ ){
			
			if( $("#contact-form input[name='" + postdata[count].name + "']").attr("data-require-filling") == "true" ) {  
				postdata.push( {name: postdata[count].name + "_required", value: true });
			} else {
				postdata.push( {name: postdata[count].name + "_required", value: false });
			}
		}
		
		$.ajax({
			
			type: "POST",
			url: "assets/php/contact.php",
			data: postdata,
			dataType: "json",
			success: function(json) {
				
				$("#contact-form .error").removeClass("error");
				
				setTimeout(function(){
					
					if (json.nameMessage !== "") {
						$("#contact-form-name").addClass("error");
					}
					
					if (json.emailMessage !== "") {
					$("#contact-form-email").addClass("error");
					}
					
					if (json.messageMessage !== "") {
						$("#contact-form-message").addClass("error");
					}
					
				}, 25);
					
				if (json.succesMessage !== "") {
					
					$("#contact-form").addClass("success");
					$("#contact-form button span").removeClass("ti-angle-right").addClass("ti-check");
					$("#contact-form button p").text(json.succesMessage);
					$("#contact-form input,#contact-form textarea,#contact-form button").val("").prop("disabled", true);
				}
			}
			
		});
		
	});

}




/** 6. MISC
*******************************************************************/

function hover_interaction_setup() {

	$(".img-hover-box").each(function(){

		var $this = $(this);

		function callParallax(e){
			parallaxIt(e, $this.find(".img-wrapper"), 30);
			parallaxIt(e, $this.find(".img-wrapper .img"), -10);
		}
		
		function parallaxIt(e, target, movement){
			var relX = e.pageX - $this.offset().left;
			var relY = e.pageY - $this.offset().top;

			gsap.to(target, 0.4, {
				x: (relX - $this.width()/2 ) / $this.width() * movement,
				y: (relY - $this.height()/2 ) / $this.height() * movement,
			});
		}

		$(this).closest(".section").on("mousemove touchmove", callParallax);

	});


	$(".work-grid .item").each(function(){

			var $this = $(this); 

			function callParallax(e){
				parallaxIt(e, $this.find(".hover-reveal"), 60);
				parallaxIt(e, $this.find(".hover-reveal-img"), -25);
			}
			
			function parallaxIt(e, target, movement){
				var relX = e.pageX - $this.offset().left;
				var relY = e.pageY - $this.offset().top;
				
				gsap.to(target, 0.3, {
					x: (relX - $this.width()/2) / $this.width() * movement,
					y: (relY - $this.height()/2) / $this.height() * movement,
				});
			}

			$($this).on("mousemove", callParallax);

	});

}