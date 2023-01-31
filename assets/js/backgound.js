/******************************************************************
	
	
	@ Item          ASECTION // Personal One Page Portfolio HTML Template
	@ Version       1.0
	@ Author		Avanzare
	@ Website		http://themeforest.net/user/avanzare 
	

 ******************************************************************


	------------------------
	-- TABLE OF CONTENTS --
	------------------------
	
	--  1. BACKGROUNDS
 
 
 ******************************************************************/



/** 1. BACKGROUNDS
*******************************************************************/



	// IMAGE BACKGROUND FUNCTION
	function colorBackground() {
	
		// INIT VEGAS SLIDESHOW PLUGIN
		$("body").append('<div class="bg-color" style="background-color:' + option_hero_background_color + '"></div>');
	
	}



	// IMAGE BACKGROUND FUNCTION
	function imageBackground() {
	
		// INIT VEGAS SLIDESHOW PLUGIN
		$("body").append('<div class="bg-image" style="background-image:url('+ option_hero_background_image_path + ')"></div>');
		$("body").append('<div class="bg-overlay" style="background:' + option_hero_background_image_overlay_color +';opacity:' + option_hero_background_image_overlay_opacity + ';"></div>');
	
	}
	
	
	
	// SLIDER BACKGROUND FUNCTION
	function sliderBackground() {


		$("body").append('<div class="bg-slider"></div>');
		$("body").append('<div class="bg-overlay" style="background:' + option_hero_background_slider_overlay_color +';opacity:' + option_hero_background_slider_overlay_opacity + ';"></div>');

		$(".bg-slider").vegas({
			slides:option_hero_background_slider_path,
			transition: option_hero_background_slider_transition,
			delay: option_hero_background_slider_delay,
			transitionDuration: option_hero_background_slider_transitionDuration,
			timer: false,
		});
		
	
	}
	
	
	
	// VIDEO BACKGROUND FUNCTION
	function videoBackground() {
		
		$("body").append('<div class="bg-overlay" style="background:' + option_hero_background_video_overlay_color +';opacity:' + option_hero_background_video_overlay_opacity + ';"></div>');
		$("body").append('<div class="bg-video"><video autoplay muted loop><source src="' + option_hero_background_video_source + '" type="video/mp4"></video></div>');
		
	}
	
	
	
	// CANVAS MESH BACKGROUND FUNCTION
	function meshBackground() {
		
		$("body").append('<div id="canvas"></div>');

		var c,
			ctx,
			w,
			h,
			spacing,
			spread,
			basePoint,
			rightPoint,
			botPoint,
			mouse,
			mouseMoved,
			cols,
			rows,
			points,
			tick;
		
		function Point( opt ) {
			
			this.x = opt.x;
			this.y = opt.y;
			this.xBase = this.x;
			this.yBase = this.y;
			this.offset = rand( 0, 1000 );
			this.duration = rand( 20, 60 );
			this.range = rand( 5, 5 );
			this.dir = rand( 0, 1 ) > 0.5 ? 1 : -1;
			this.rad = rand( 2, 4 );
			
		}
		
		Point.prototype.step = function() {
			
			this.x = this.xBase + this.dir * Math.sin( ( tick + this.offset ) / this.duration ) * this.range;
			this.y = this.yBase + this.dir * Math.cos( ( tick + this.offset ) / this.duration ) * this.range;
			
			var angle = angleTo( this, mouse );
			 
			this.x = this.x + Math.cos( angle )	* 100;
			this.y = this.y + Math.sin( angle )	* 100;
			
		};
		
		function rand( min, max ) {
			return Math.random() * ( max - min ) + min;
		}
		
		function dist( p1, p2 ) {
			
			var dx = p1.x - p2.x,
				dy = p1.y - p2.y;
				
			return Math.sqrt( dx * dx + dy * dy );
			
		}
		
		function angleTo( p1, p2 ) {
			
			var dx = p1.x - p2.x,
				dy = p1.y - p2.y;
				
			return Math.atan2( dy, dx );
			
		}
		
		function init() {
			
			c = document.createElement( 'canvas' );
			ctx = c.getContext( '2d' );
			mouse = { x: 0, y: 0 };
			points = [];
			spacing = 180;
			spread = spacing * 0.25;
			document.getElementById("canvas").appendChild( c );
			reset();
			loop();
				
		}
		
		function reset() {
			
			w = $("#main").width();
			h = $("#main").height();
			c.width = w;
			c.height = h;
			mouse.x = w / 2;
			mouse.y = h / 2;
			mouseMoved = false;
			cols = 0;
			rows = 0;
			points.length = 0;
			tick = 0;
			create();
			
			ctx.strokeStyle = option_hero_background_mesh_color;
			ctx.lineWidth = 2;
			
		}
		
		function create() {
			
			for( var x = -spacing / 2; x < w + spacing; x += spacing ) {
				
				cols++;
				
				for( var y = -spacing / 2; y < h + spacing; y += spacing ) {
					
					if( x == -spacing / 2 ) {
						rows++;
					}
					
					points.push( new Point({
						
						x: ~~( x + rand( -spread, spread ) ),
						y: ~~( y + rand( -spread, spread ) )
						
					}));
					
				}
				
			}
			
		}
		
		function step() {
			
			if( !mouseMoved ) {
				
				mouse.x = w / 2 + Math.cos( tick / 40 ) * 90;
				mouse.y = h / 2 + Math.sin( tick / 40 ) * 90;
				
			}
			
			points.forEach( function( point ) {
				point.step();
			});
			
			tick++;
			
		}
		
		function draw() {
			
			ctx.clearRect( 0, 0, w, h );
			ctx.beginPath();
			
			for( var x = 0; x < cols; x++ ) {
				
				for( var y = 0; y < rows; y++ ) {
					
					basePoint = points[ x * rows + y ];
					rightPoint = x === cols - 1 ? null : points[ ( x + 1 ) * rows + y ];
					botPoint = y === rows - 1 ? null : points[ x * rows + y + 1 ];
					
					if( rightPoint ) {
						
						ctx.moveTo( basePoint.x, basePoint.y );
						ctx.lineTo( rightPoint.x, rightPoint.y );
						
					}
					
					if( botPoint ) {
						
						ctx.moveTo( basePoint.x, basePoint.y );
						ctx.lineTo( botPoint.x, botPoint.y );
						
					}
					
				}
				
			}
			
			ctx.stroke();
			
			ctx.fillStyle = '#000';
			points.forEach( function( point ) {
				
				ctx.save();
				ctx.beginPath();
				ctx.translate( point.x, point.y );
				ctx.rotate( Math.PI / 4 );
				ctx.rect(  0, 0 , 0, 0 );
				ctx.fill();
				ctx.stroke();
				ctx.restore();
				
			});
			
			var grad = ctx.createRadialGradient( mouse.x, mouse.y, 0, mouse.x, mouse.y, 90000 );
			
			grad.addColorStop( 0, 'hsla(0, 0%, 0%, 0)' );
			grad.addColorStop( 1, 'hsla(0, 0%, 0%, 0.93)' );
			
			ctx.fillStyle = grad;
			ctx.fillRect( 0, 0, w, h );
			
		}
		
		function loop() {
			
			requestAnimationFrame( loop );
			step();
			draw();
			
		}
		
		function mousemove( e ) {
			
			mouseMoved = true;
			mouse.x = e.pageX;
			mouse.y = e.pageY;
			
		}
		
		window.addEventListener( 'resize', reset );
		window.addEventListener( 'mousemove', mousemove );
		
		init();
		
		$("#canvas canvas").css("background-color",option_hero_background_mesh_background_color);
		
	} 
	
	
	
	// CANVAS SPACE BACKGROUND FUNCTION
	function spaceBackground() {
		
		(function($, window, document, undefined) {

		  var Starfield = function(el, options) {
              
			this.el = el;
			this.$el = $(el);
			this.options = options;
		
			that = this;
              
		  };
		
		  var isPlaying;
		  var isInited = false;
		  var canCanvas = false;
		  var animId;
		  var that;
		
		  (function() {
              
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
				window[vendors[x] + 'CancelRequestAnimationFrame'];
			}
		
			if (!window.requestAnimationFrame)
			  window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				  },
				  timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			  };
		
			if (!window.cancelAnimationFrame)
			  window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			  };
              
		  }());
            
		  Starfield.prototype = {
              
			defaults: {
			  starColor: option_hero_background_star_star_color,
			  bgColor: option_hero_background_star_background_color,
			  mouseMove: true,
			  mouseColor: "rgba(0,0,0,0.2)",
			  mouseSpeed: 15,
			  speed: option_hero_background_space_star_speed,
			  quantity: option_hero_background_space_star_amount,
			  ratio: option_hero_background_space_star_amount / 2,
			  divclass: "starfield"
                
			},
		
            resizer: function() {
                
                var oldStar				= this.star;
                var initW				= this.context.canvas.width;
                var initH				= this.context.canvas.height;

                this.w					= this.$el.width();
                this.h					= this.$el.height();
                this.x					= Math.round(this.w / 2);
                this.y					= Math.round(this.h / 2);
                
                var ratX 				= this.w / initW;
                var ratY				= this.h / initH;

                this.context.canvas.width	= this.w;
                this.context.canvas.height	= this.h;
                
                for(var i = 0; i < this.n; i++) {
                    
                    this.star[i][0]	= oldStar[i][0] * ratX;
                    this.star[i][1]	= oldStar[i][1] * ratY;

                    this.star[i][3] = this.x + (this.star[i][0] / this.star[i][2]) * this.star_ratio;
                    this.star[i][4] = this.y + (this.star[i][1] / this.star[i][2]) * this.star_ratio;
                    
                }

                that.context.fillStyle		= that.settings.bgColor;
                this.context.strokeStyle	= this.settings.starColor;
                
            },
		
			init: function() {
                
			  this.settings = $.extend({}, this.defaults, this.options);
                
			  var url = document.location.href;
			  this.n = parseInt(
                  
				(url.indexOf('n=') != -1) ? url.substring(url.indexOf('n=') + 2, (
					(url.substring(
					  url.indexOf('n=') + 2,
					  url.length)).indexOf('&') != -1) ? url.indexOf('n=') + 2 + (url.substring(
					url.indexOf('n=') + 2,
					url.length)).indexOf('&') :
				  url.length) :
				this.settings.quantity
                  
			  );
		
			  this.flag = true;
			  this.test = true;
			  this.w = 0;
			  this.h = 0;
			  this.x = 0;
			  this.y = 0;
			  this.z = 0;
			  this.star_color_ratio = 0;
			  this.star_x_save = 0;
			  this.star_y_save = 0;
			  this.star_ratio = this.settings.ratio;
			  this.star_speed = this.settings.speed;
			  this.star_speed_save = 0;
			  this.star = new Array(this.n);
			  this.color = this.settings.starColor;
			  this.opacity = 0.1;
		
			  this.cursor_x = 0;
			  this.cursor_y = 0;
			  this.mouse_x = 0;
			  this.mouse_y = 0;
		
			  this.canvas_x = 0;
			  this.canvas_y = 0;
			  this.canvas_w = 0;
			  this.canvas_h = 0;
		
			  this.fps = this.settings.fps;
                
			  this.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|IEMobile)/);
			  this.orientationSupport = window.DeviceOrientationEvent !== undefined;
			  this.portrait = null;
                
			  var canvasInit = function() {
				that.w = that.$el.width();
				that.h = that.$el.height();
		
				that.initW = that.w;
				that.initH = that.h;
		
				that.portrait = that.w < that.h;
		
				that.wrapper = $('<canvas />')
				  .addClass(that.settings.divclass);
		
				that.wrapper.appendTo(that.el);
		
				that.starz = $('canvas', that.el);
		
				if (that.starz[0].getContext) { 
				  that.context = that.starz[0].getContext('2d');
				  canCanvas = true;
				}
		
				that.context.canvas.width = that.w;
				that.context.canvas.height = that.h;
			  }
			  canvasInit();
                
			  var starInit = function() {
                  
				if (canCanvas) { 
                    
				  that.x = Math.round(that.w / 2);
				  that.y = Math.round(that.h / 2);
				  that.z = (that.w + that.h) / 2;
				  that.star_color_ratio = 1 / that.z;
				  that.cursor_x = that.x;
				  that.cursor_y = that.y;
                    
				  for (var i = 0; i < that.n; i++) {
                      
					that.star[i] = new Array(5);
		
					that.star[i][0] = Math.random() * that.w * 2 - that.x * 2;
					that.star[i][1] = Math.random() * that.h * 2 - that.y * 2;
					that.star[i][2] = Math.round(Math.random() * that.z);
					that.star[i][3] = 0;
					that.star[i][4] = 0;
                      
				  }
                    
				  that.context.fillStyle = that.settings.bgColor;
				  that.context.strokeStyle = that.settings.starColor;
                    
				} else {
				  return;
				}
			  }
			  starInit();
		
			  isInited = true;
			},
              
			anim: function() {
			  this.mouse_x = this.cursor_x - this.x;
			  this.mouse_y = this.cursor_y - this.y;
			  this.context.fillRect(0, 0, this.w, this.h);
		
			  for (var i = 0; i < this.n; i++) {
				this.test = true;
				this.star_x_save = this.star[i][3];
				this.star_y_save = this.star[i][4];
				this.star[i][0] += this.mouse_x >> 4;
		
				// X coords
				if (this.star[i][0] > this.x << 1) {
				  this.star[i][0] -= this.w << 1;
				  this.test = false;
				}
				if (this.star[i][0] < -this.x << 1) {
				  this.star[i][0] += this.w << 1;
				  this.test = false;
				}
                  
				this.star[i][1] += this.mouse_y >> 4;
				if (this.star[i][1] > this.y << 1) {
                    
				  this.star[i][1] -= this.h << 1;
				  this.test = false;
                    
				}
				if (this.star[i][1] < -this.y << 1) {
                    
				  this.star[i][1] += this.h << 1;
				  this.test = false;
                    
				}
		
				// Z coords
				this.star[i][2] -= this.star_speed;
				if (this.star[i][2] > this.z) {
                    
				  this.star[i][2] -= this.z;
				  this.test = false;
                    
				}
				if (this.star[i][2] < 0) {
                    
				  this.star[i][2] += this.z;
				  this.test = false;
                    
				}
		
				this.star[i][3] = this.x + (this.star[i][0] / this.star[i][2]) * this.star_ratio;
				this.star[i][4] = this.y + (this.star[i][1] / this.star[i][2]) * this.star_ratio;
		
				if (this.star_x_save > 0 &&
				  this.star_x_save < this.w &&
				  this.star_y_save > 0 &&
				  this.star_y_save < this.h &&
				  this.test) {
				  this.context.lineWidth = (1 - this.star_color_ratio * this.star[i][2]) * 2;
				  this.context.beginPath();
				  this.context.moveTo(this.star_x_save, this.star_y_save);
				  this.context.lineTo(this.star[i][3], this.star[i][4]);
				  this.context.stroke();
				  this.context.closePath();
				}
			  }
			},
		
			loop: function() {
                
			  this.anim();
		
			  animId = window.requestAnimationFrame(function() {
				that.loop()
			  });
                
			},
		
			move: function() {
                
			  var doc = document.documentElement;
		
			  if (this.orientationSupport && !this.desktop) {
				window.addEventListener('deviceorientation', handleOrientation, false);
			  } else {
				window.addEventListener('mousemove', handleMousemove, false);

			  }
		
			  function handleOrientation(event) {
                  
				if (event.beta !== null && event.gamma !== null) {
                    
				  var x = event.gamma,
					y = event.beta;
		
				  if (!that.portrait) {
					x = event.beta * -1;
					y = event.gamma;
				  }
		
				  that.cursor_x = (that.w / 2) + (x * 5);
				  that.cursor_y = (that.h / 2) + (y * 5);
		
				}
                  
			  }
		
			  function handleMousemove(event) {
                  
				that.cursor_x = event.pageX || event.clientX + doc.scrollLeft - doc.clientLeft;
				that.cursor_y = event.pageY || event.clientY + doc.scrollTop - doc.clientTop;
                  
			  }
                
			},
		
			stop: function() {
			  window.cancelAnimationFrame(animId);
		
			  isPlaying = false;
			},
              
			start: function() {

			  if (!isInited) {
				isInited = true;
				this.init();
			  }
                
			  if (!isPlaying) {
				isPlaying = true;
				this.loop();
			  }
		
			  window.addEventListener('resize', function() {
				that.resizer()
			  }, false);
		
			  window.addEventListener('orientationchange', function() {
				that.resizer()
			  }, false);
                
			  if (this.settings.mouseMove) {
				this.move();
			  }
		
			  return this;
			}
		  }
		
		  Starfield.defaults = Starfield.prototype.defaults;
		
		  $.fn.starfield = function(options) {
			return this.each(function() {
			  new Starfield(this, options).start();
			});
		  }
		
		  window.Starfield = Starfield;
		})(jQuery, window, document);

		$("body").append('<div id="canvas"></div>');
		$('#canvas').starfield();
			
	}
	
	
	
	
	
	
	
	// GLITCH BACKGROUND FUNCTION
	function glitchBackground() {
		
		var bgImage = "background-image: url('"+option_hero_background_glitch_image+"')";
		$("body").append('<div class="bg-glitch"><div class="bg-image" style="'+bgImage+'"></div></div>');
		$("body").append('<div class="bg-overlay" style="background:' + option_hero_background_glitch_overlay_color +';opacity:' + option_hero_background_glitch_overlay_opacity + ';"></div>');
		
		$( ".bg-image" ).mgGlitch({
			destroy : false, // set 'true' to stop the plugin
			glitch: true, // set 'false' to stop glitching
			scale: true, // set 'false' to stop scaling
			blend : true, // set 'false' to stop glitch blending
			blendModeType : 'hue', // select blend mode type
			glitch1TimeMin : 600, // set min time for glitch 1 elem
			glitch1TimeMax : 900, // set max time for glitch 1 elem
			glitch2TimeMin : 10, // set min time for glitch 2 elem
			glitch2TimeMax : 115, // set max time for glitch 2 elem
			zIndexStart : 8, // because of absolute position, set z-index base value
		});
		
	}



	// DIGITAL FIELD BACKGROUND FUNCTION
	function fieldBackground() {

		$("body").append('<canvas></canvas>');
		$("body").append('<div class="bg-color" style="background:' + option_hero_background_field_bg_color + ';"></div>');

		const canvas = document.querySelector('canvas'),
		cx = canvas.getContext('2d');
		
		const INCREMENT = 12345,
		MULTIPLIER = 1103515245,
		MODULUS = Math.pow(2, 31);

		const stepX = 24,
		stepY = 24,
		sizeX = 1,
		sizeY = 1,
		marginTop = 0,
		marginBottom = 0,
		marginLeft = 0,
		marginRight = 0;
		
		let frameID;
		
		function lcg(x, c = INCREMENT, a = MULTIPLIER, m = MODULUS) {
		  return (a * x + c) % m;
		}
		
		function createRandom(initialSeed = 0) {
		  let seed = initialSeed;
		  return {
			get currentSeed() {
			  return seed;
			},
			reset(newSeed) {
			  seed = newSeed;
			},
			get() {
			  seed = lcg(seed);
			  return seed / MODULUS;
			} };
		
		}
		
		const random = createRandom();
		
		function frame(frameTime) {
		  cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height);
		  for (let y = marginTop; y < cx.canvas.height - marginBottom; y += stepY) {
			random.reset(y);
			for (let x = marginLeft; x < cx.canvas.width - marginRight; x += stepX) {
			  const randomValue = random.get();
			  const distX = randomValue * option_hero_background_field_x_multi;
			  const distY = randomValue * option_hero_background_field_y_multi;
			  const phase = randomValue * Math.PI * 2;
			  cx.fillStyle = option_hero_background_field_fill_color;
			  cx.fillRect(
			  x,
			  y,
			  sizeX + Math.sin(phase + frameTime / 1000) * distX,
			  sizeY + Math.cos(phase + frameTime / 1000) * distY);
		
			}
		  }
		  frameID = window.requestAnimationFrame(frame);
		}
		
		function resize() {
		  canvas.width = canvas.clientWidth;
		  canvas.height = canvas.clientHeight;
		}
		
		function start() {
		  window.addEventListener('resize', resize);
		  window.dispatchEvent(new Event('resize'));
		
		  frameID = window.requestAnimationFrame(frame);
		}
		
		start();

		
	}



	function abstractBackground() {

		$("body").append('<div id="canvas"></div>');
		
		var MESH = {
			width: 1.4,
			height: 1.6,
			depth: 60,
			segments: 9,
			slices: 8,
			xRange: 0.4,
			yRange: 0.1,
			zRange: 1.2,
			ambient: option_hero_background_abstract_mesh_ambient,
			diffuse: option_hero_background_abstract_mesh_diffuse,
			speed: option_hero_background_abstract_speed / 10000
		};
		
		var LIGHT = {
			count: 2,
			xyScalar: 1,
			zOffset: 100,
			ambient: option_hero_background_abstract_light_ambient,
			diffuse: option_hero_background_abstract_light_diffuse,
			speed: 0.0002,
			gravity: 500,
			dampening: 0.95,
			minLimit: 10,
			maxLimit: null,
			minDistance: 20,
			maxDistance: 400,
			autopilot: true,
			draw: false,
			bounds: FSS.Vector3.create(),
			step: FSS.Vector3.create(
			  Math.randomInRange(0.2, 1.0),
			  Math.randomInRange(0.2, 1.0),
			  Math.randomInRange(0.2, 1.0)
			)
		};
		
		var RENDER = {
			renderer: 'canvas'
		};
		
		var now, start = Date.now();
		var center = FSS.Vector3.create();
		var attractor = FSS.Vector3.create();
		var container = document.getElementById('canvas');
		var output = document.getElementById('canvas');
		var renderer, scene, mesh, geometry, material;
		var canvasRenderer;
		var gui, autopilotController;
		
		function initialise() {
            
			createRenderer();
			createScene();
			createMesh();
			createLights();
			addEventListeners();
			resize(container.offsetWidth, container.offsetHeight);
			animate();
            
		}

		function createRenderer() {
			
			canvasRenderer = new FSS.CanvasRenderer();
			setRenderer(RENDER.renderer);
			
		}

		function setRenderer(index) {
			
			if (renderer) {
			  output.removeChild(renderer.element);
			}

			renderer = canvasRenderer;

			renderer.setSize(container.offsetWidth, container.offsetHeight);
			output.appendChild(renderer.element);
			
		}

		function createScene() {
			scene = new FSS.Scene();
		}

		function createMesh() {
			
			scene.remove(mesh);
			renderer.clear();
			geometry = new FSS.Plane(MESH.width * renderer.width, MESH.height * renderer.height, MESH.segments, MESH.slices);
			material = new FSS.Material(MESH.ambient, MESH.diffuse);
			mesh = new FSS.Mesh(geometry, material);
			scene.add(mesh);

			// Augment vertices for animation
			var v, vertex;
			for (v = geometry.vertices.length - 1; v >= 0; v--) {
				
				vertex = geometry.vertices[v];
				vertex.anchor = FSS.Vector3.clone(vertex.position);
				vertex.step = FSS.Vector3.create(
					Math.randomInRange(0.2, 1.0),
					Math.randomInRange(0.2, 1.0),
					Math.randomInRange(0.2, 1.0)
				);
				vertex.time = Math.randomInRange(0, Math.PIM2);
				
			}
			
		}

		function createLights() {
			
			var l, light;
			for (l = scene.lights.length - 1; l >= 0; l--) {
                
				light = scene.lights[l];
				scene.remove(light);
                
			}
			
			renderer.clear();
			
			for (l = 0; l < LIGHT.count; l++) {
				
				light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
				light.ambientHex = light.ambient.format();
				light.diffuseHex = light.diffuse.format();
				scene.add(light);

				// Augment light for animation
				light.mass = Math.randomInRange(0.5, 1);
				light.velocity = FSS.Vector3.create();
				light.acceleration = FSS.Vector3.create();
				light.force = FSS.Vector3.create();

				// Ring SVG Circle
				light.ring = document.createElementNS(FSS.SVGNS, 'circle');
				light.ring.setAttributeNS(null, 'stroke', light.ambientHex);
				light.ring.setAttributeNS(null, 'stroke-width', '0.5');
				light.ring.setAttributeNS(null, 'fill', 'none');
				light.ring.setAttributeNS(null, 'r', '10');

				// Core SVG Circle
				light.core = document.createElementNS(FSS.SVGNS, 'circle');
				light.core.setAttributeNS(null, 'fill', light.diffuseHex);
				light.core.setAttributeNS(null, 'r', '4');
				
			}
			
		}

		function resize(width, height) {
			
			renderer.setSize(width, height);
			FSS.Vector3.set(center, renderer.halfWidth, renderer.halfHeight);
			createMesh();
			
		}

		function animate() {
			
			now = Date.now() - start;
			update();
			render();
			requestAnimationFrame(animate);
			
		}

		function update() {
			
			var ox, oy, oz, l, light, v, vertex, offset = MESH.depth/2;

			// Update Bounds
			FSS.Vector3.copy(LIGHT.bounds, center);
			FSS.Vector3.multiplyScalar(LIGHT.bounds, LIGHT.xyScalar);

			// Update Attractor
			FSS.Vector3.setZ(attractor, LIGHT.zOffset);

			// Overwrite the Attractor position
			if (LIGHT.autopilot) {
			  ox = Math.sin(LIGHT.step[0] * now * LIGHT.speed);
			  oy = Math.cos(LIGHT.step[1] * now * LIGHT.speed);
			  FSS.Vector3.set(attractor,
				LIGHT.bounds[0]*ox,
				LIGHT.bounds[1]*oy,
				LIGHT.zOffset);
			}

			// Animate Lights
			for (l = scene.lights.length - 1; l >= 0; l--) {
				
			  light = scene.lights[l];

			  // Reset the z position of the light
			  FSS.Vector3.setZ(light.position, LIGHT.zOffset);

			  // Calculate the force Luke!
			  var D = Math.clamp(FSS.Vector3.distanceSquared(light.position, attractor), LIGHT.minDistance, LIGHT.maxDistance);
			  var F = LIGHT.gravity * light.mass / D;
			  FSS.Vector3.subtractVectors(light.force, attractor, light.position);
			  FSS.Vector3.normalise(light.force);
			  FSS.Vector3.multiplyScalar(light.force, F);

			  // Update the light position
			  FSS.Vector3.set(light.acceleration);
			  FSS.Vector3.add(light.acceleration, light.force);
			  FSS.Vector3.add(light.velocity, light.acceleration);
			  FSS.Vector3.multiplyScalar(light.velocity, LIGHT.dampening);
			  FSS.Vector3.limit(light.velocity, LIGHT.minLimit, LIGHT.maxLimit);
			  FSS.Vector3.add(light.position, light.velocity);
				
			}

			// Animate Vertices
			for (v = geometry.vertices.length - 1; v >= 0; v--) {
				
			  vertex = geometry.vertices[v];
			  ox = Math.sin(vertex.time + vertex.step[0] * now * MESH.speed);
			  oy = Math.cos(vertex.time + vertex.step[1] * now * MESH.speed);
			  oz = Math.sin(vertex.time + vertex.step[2] * now * MESH.speed);
			  FSS.Vector3.set(vertex.position,
				MESH.xRange*geometry.segmentWidth*ox,
				MESH.yRange*geometry.sliceHeight*oy,
				MESH.zRange*offset*oz - offset);
			  FSS.Vector3.add(vertex.position, vertex.anchor);
				
			}

			// Set the Geometry to dirty
			geometry.dirty = true;
			
		}

		function render() {
			renderer.render(scene);

			// Draw Lights
			if (LIGHT.draw) {

			  var l, lx, ly, light;
			  for (l = scene.lights.length - 1; l >= 0; l--) {
				  
				light = scene.lights[l];
				lx = light.position[0];
				ly = light.position[1];
				renderer.context.lineWidth = 0.5;
				renderer.context.beginPath();
				renderer.context.arc(lx, ly, 10, 0, Math.PIM2);
				renderer.context.strokeStyle = light.ambientHex;
				renderer.context.stroke();
				renderer.context.beginPath();
				renderer.context.arc(lx, ly, 4, 0, Math.PIM2);
				renderer.context.fillStyle = light.diffuseHex;
				renderer.context.fill();

			  }

			}
		}

		function addEventListeners() {
			window.addEventListener('resize', onWindowResize);
		}

		function onMouseMove(event) {
			FSS.Vector3.set(attractor, event.x, renderer.height - event.y);
			FSS.Vector3.subtract(attractor, center);
		}

		function onWindowResize(event) {
			resize(container.offsetWidth, container.offsetHeight);
			render();
		}
		
		initialise();


		if (canvas.getContext) {
			
			var ctx = canvas.getContext('2d');
			var left = true;

			canvas.height = screen.height - 60;
			canvas.width = screen.width + 20;

			initialize();
			initialize();

			var timer = setInterval(function () {

				for (var i = 1; i <= 1000; i++) {
					
					ctx.beginPath();
					if (left) {
						ctx.moveTo(0, randomize(canvas.height + 10));
						left = false;
					} else {
						ctx.moveTo(randomize(canvas.width+ 10), 0);
						left = true;
					}
					ctx.lineTo(randomize(canvas.width + 50), randomize(canvas.height  + 50));
					ctx.lineTo(randomize(canvas.width + 50), randomize(canvas.height + 50));
					ctx.fillStyle = getRndColor();
					ctx.fill();
					
				}
				
			}, 5000);
			
		}

	}
	


	// SPHERE BACKGROUND FUNCTION
	function sphereBackground() {

		$("body").append('<div id="canvas"></div>');

		var SCREEN_WIDTH = $(window).width(),
			SCREEN_HEIGHT = $(window).height(),
	
			mouseX = 0, mouseY = 0,
	
			windowHalfX = window.innerWidth / 2,
			windowHalfY = window.innerHeight / 2,
	
			camera, scene, renderer;
	
			init();
			animate();
	
			function init() {
	
				var container, separation = 100, amountX = 50, amountY = 50,
				particles, particle;
				
				container = document.createElement("div");
				document.getElementById("canvas").appendChild(container);
	
				camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				camera.position.z = option_hero_background_sphere_distance;
	
				scene = new THREE.Scene();
				
				renderer = new THREE.CanvasRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				container.appendChild( renderer.domElement );
				renderer.setClearColor( option_hero_background_sphere_background_color );
				
				var PI2 = Math.PI * 2;
				var material = new THREE.SpriteCanvasMaterial( {
	
					color: option_hero_background_sphere_dot_color,
					program: function ( context ) {
	
						context.beginPath();
						context.arc( 0, 0, 0.5, 0, PI2, true );
						context.fill();
	
					}
	
				} );
	
				for ( var i = 0; i < 1000; i ++ ) {
	
					particle = new THREE.Sprite( material );
					particle.position.x = Math.random() * 2 - 1;
					particle.position.y = Math.random() * 2 - 1;
					particle.position.z = Math.random() * 2 - 1;
					particle.position.normalize();
					particle.position.multiplyScalar( Math.random() * 10 + 450 );
					particle.scale.multiplyScalar( 2 );
					scene.add( particle );
	
				}
	
				for (var i = 0; i < 300; i++) {
	
					var geometry = new THREE.Geometry();
	
					var vertex = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
					vertex.normalize();
					vertex.multiplyScalar( 450 );
	
					geometry.vertices.push( vertex );
	
					var vertex2 = vertex.clone();
					vertex2.multiplyScalar( Math.random() * 0.3 + 1 );
	
					geometry.vertices.push( vertex2 );
	
					var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: option_hero_background_sphere_line_color, opacity: Math.random() } ) );
					scene.add( line );
				}
	
				document.addEventListener( "mousemove", onDocumentMouseMove, false );
				document.addEventListener( "touchstart", onDocumentTouchStart, false );
				document.addEventListener( "touchmove", onDocumentTouchMove, false );
	
				window.addEventListener( "resize", onWindowResize, false );
	
			}
	
			function onWindowResize() {
				
				var SCREEN_WIDTH = $(window).width(),
					SCREEN_HEIGHT = $(window).height();
				
				windowHalfX = SCREEN_WIDTH / 2;
				windowHalfY = SCREEN_HEIGHT / 2;
	
				camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
				camera.updateProjectionMatrix();
	
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	
			}
	
			function onDocumentMouseMove(event) {
	
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}
	
			function onDocumentTouchStart( event ) {
	
				if ( event.touches.length > 1 ) {
	
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
	
				}
	
			}
	
			function onDocumentTouchMove( event ) {
	
				if ( event.touches.length === 1 ) {
	
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
	
				}
	
			}
	
			function animate() {
	
				requestAnimationFrame( animate );
				render();
	
			}
			
			function render() {
					
				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY + 200 - camera.position.y ) * 0.05;
				camera.lookAt( scene.position );
				
				scene.rotation.y += option_hero_background_sphere_rotation_speed / 100;
				
				renderer.render( scene, camera );
	
			}
	
	}
	
	
	
	// LOAD SCRIPT FUNCTION
	function loadScript(url, callback){

		var script = document.createElement("script")
		script.type = "text/javascript";
	
		if (script.readyState){  //IE
			script.onreadystatechange = function(){
				if (script.readyState == "loaded" ||
						script.readyState == "complete"){
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {  //Others
			script.onload = function(){
				callback();
			};
		}
	
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	}



	function demo_only() {

		let searchParams = new URLSearchParams(window.location.search);
		if(searchParams.has('bg')) option_hero_background_mode = searchParams.get('bg');

	} //demo_only();



	// BACKGROUND CONTROLLER
	switch(option_hero_background_mode) {

		case "color":
		
			colorBackground();
		
		break;
		case "image":
		
			imageBackground();
		
		break;
		case "slider":
		
			sliderBackground();
		
		break;
		case "video":
		
		    videoBackground();
		
		break;
		case "mesh":
				
			meshBackground();
		
		break;
		case "space":
				
			spaceBackground();
		
		break;
		case "glitch":
			
			glitchBackground();
		
		break;
		case "field":
			
			fieldBackground();
		
		break;
		case "abstract":
			loadScript("assets/js/fss.min.js", function() {	
				abstractBackground();
			});
		
		break;
		case "sphere":
			loadScript("assets/js/three.min.js", function() {	
				sphereBackground();
			});
		
		break;
		default:
			
			alert( "Error! No background is set or something went wrong" );
			console.log("Error! No background is set or something went wrong");
		
		break;	
	
	}