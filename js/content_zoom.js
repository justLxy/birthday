jQuery.fn.fancyZoom = function(options){
  
  var options   = options || {};
  var directory = options && options.directory ? options.directory : 'images';
  var zooming   = false;

  if ($('#zoom').length == 0) {
    var html = '<div id="zoom_overlay" style="display:none;"></div> \
				<div class="round_shade_box" id="zoom"> \
					<div class="round_shade_top"> \
						<span class="round_shade_topleft"> \</span> \
						<span class="round_shade_topright"> \</span> \
					</div> \
					<div class="round_shade_centerleft"> \
						<div class="round_shade_centerright"> \
							<div class="round_shade_center" id="zoom_content"> \</div> \
						</div> \
					</div> \
					<div class="round_shade_bottom"> \
						<span class="round_shade_bottomleft"> \</span> \
						<span class="round_shade_bottomright"> \</span> \
					</div> \
					<a href="#close" class="round_box_close" id="zoom_close">关闭</a> \
				</div>';
                
    $('body').append(html);
    
    $('html').click(function(e){if($(e.target).parents('#zoom:visible').length == 0) hide();});
    $(document).keyup(function(event){
        if (event.keyCode == 27 && $('#zoom:visible').length > 0) hide();
    });
    
	$('#zoom_overlay').click(hide);
    $('#zoom_close').click(hide);
  }
  
  var zoom          = $('#zoom');
  var zoom_close    = $('#zoom_close');
  var zoom_content  = $('#zoom_content');
  var zoom_overlay  = $('#zoom_overlay');
  
  this.each(function(i) {
    $($(this).attr('href')).hide();
    $(this).click(show);
  });
  $('#zoom_close').click(hide);
  return this;
  
  function show(e) {
    if (zooming) return false;
		zooming         = true;
		var content_div = $($(this).attr('href'));
  		var zoom_width  = options.width;
		var zoom_height = options.height;
		
		var width       = window.innerWidth || (window.document.documentElement.clientWidth || window.document.body.clientWidth);
		var height      = window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight);
		var x           = window.pageXOffset || (window.document.documentElement.scrollLeft || window.document.body.scrollLeft);
		var y           = window.pageYOffset || (window.document.documentElement.scrollTop || window.document.body.scrollTop);
		var window_size = {'width':width, 'height':height, 'x':x, 'y':y}
	
		var d                  = window_size;
		var maxBoxWidth        = Math.floor(d.width * 0.92);
		var maxBoxHeight       = Math.floor(d.height * 0.92);
		var baseWidth          = (zoom_width || content_div.outerWidth() || Math.floor(d.width * 0.75));
		var baseHeight         = (zoom_height || content_div.outerHeight() || Math.floor(d.height * 0.75));
		var width              = Math.min(baseWidth + 40, maxBoxWidth);
		var height             = Math.min(baseHeight + 40, maxBoxHeight);
		
		// ensure that newTop is at least 0 so it doesn't hide close button
		var newTop             = Math.max((d.height/2) - (height/2) + y, 0);
		var newLeft            = (d.width/2) - (width/2) + x;
		var curTop             = e.pageY;
		var curLeft            = e.pageX;
		var margin             = 10;
		
		// clamp within viewport
		newTop = Math.max(y + margin, Math.min(newTop, y + d.height - height - margin));
		newLeft = Math.max(x + margin, Math.min(newLeft, x + d.width - width - margin));
		
		zoom_close.attr('curTop', curTop);
		zoom_close.attr('curLeft', curLeft);
		zoom_close.attr('scaleImg', options.scaleImg ? 'true' : 'false');
		
    $('#zoom').hide().css({
			position	: 'absolute',
			top				: curTop + 'px',
			left			: curLeft + 'px',
			width     : '1px',
			height    : '1px'
		});
    
    zoom_close.hide();
    
    if (options.closeOnClick) {
      $('#zoom').click(hide);
    }
    
	zoom_overlay.stop(true, true).fadeIn(150);

	// Prefer sizing the zoom box to the *displayed* image size,
	// so we don't get big left/right whitespace.
	var imgSrc = content_div.find('img').attr('src');

	function applyImgStyles() {
		var maxImgHeight = Math.max(120, maxBoxHeight - 140);
		$('#zoom_content img').css({
			'width': 'auto',
			'height': 'auto',
			'max-width': '100%',
			'max-height': maxImgHeight + 'px',
			'display': 'block',
			'margin': '0 auto'
		});
	}

	function animateTo(targetWidth, targetHeight) {
		// clamp
		targetWidth = Math.max(220, Math.min(targetWidth, maxBoxWidth));
		targetHeight = Math.max(180, Math.min(targetHeight, maxBoxHeight));

		var tTop = Math.max((d.height/2) - (targetHeight/2) + y, 0);
		var tLeft = (d.width/2) - (targetWidth/2) + x;
		tTop = Math.max(y + margin, Math.min(tTop, y + d.height - targetHeight - margin));
		tLeft = Math.max(x + margin, Math.min(tLeft, x + d.width - targetWidth - margin));

		$('#zoom').animate({
			top     : tTop + 'px',
			left    : tLeft + 'px',
			opacity : "show",
			width   : targetWidth,
			height  : targetHeight
		}, 500, null, function() {
			zoom_close.show();
			zooming = false;
		});
	}

	if (options.scaleImg && imgSrc) {
		zoom_content.html('<img src="' + imgSrc + '" alt="" />');
		applyImgStyles();

		var pre = new Image();
		pre.onload = function() {
			// Inner max area for image inside the chrome
			var chromeW = 40;
			var chromeH = 40;
			var innerMaxW = Math.max(200, maxBoxWidth - chromeW);
			var innerMaxH = Math.max(160, maxBoxHeight - chromeH - 80); // leave space for close/top/bottom
			var scale = Math.min(innerMaxW / pre.naturalWidth, innerMaxH / pre.naturalHeight, 1);
			var dispW = Math.round(pre.naturalWidth * scale);
			var dispH = Math.round(pre.naturalHeight * scale);
			animateTo(dispW + chromeW, dispH + chromeH);
		};
		pre.onerror = function() {
			animateTo(width, height);
		};
		pre.src = imgSrc;
	} else {
		if (options.scaleImg) {
			zoom_content.html(content_div.html());
			applyImgStyles();
		} else {
			zoom_content.html('');
		}
		animateTo(width, height);
	}

    return false;
  }
  
  function hide() {
    if (zooming) return false;
		zooming         = true;
	  $('#zoom').unbind('click');
		
		if (zoom_close.attr('scaleImg') != 'true') {
  		zoom_content.html('');
		}
		zoom_close.hide();
		zoom_overlay.stop(true, true).fadeOut(150);
		$('#zoom').animate({
		  top     : zoom_close.attr('curTop') + 'px',
		  left    : zoom_close.attr('curLeft') + 'px',
		  opacity : "hide",
		  width   : '1px',
		  height  : '1px'
		}, 500, null, function() {
			
		  if (zoom_close.attr('scaleImg') == 'true') {
				zoom_content.html('');
			}
				zooming = false;
		});
		return false;
	  }
  
}