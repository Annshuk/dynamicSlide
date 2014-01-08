// JavaScript Document
(function($){
	$.fn.rotator = function(options){
	var defaults = {
		previousBtn:'previous',
		nextBtn:'next', 
		speed:500, 
		addBtn:'btn_add',
		removeBtn:'btn_remove',
		resetBtn:'btn_reset',
		imgFolder:'img/',
		prvclass: 'image_preview',
		active:'selected_image'
		}; // all default obj	
	var $this =$(this);
	var options = $.extend({},defaults, options);
		this.each(function(){
			var ul = $(this);
			var counter = 0, imgCounter = 0, leftCount;			
			//Add Image Button Click
			$("."+defaults.removeBtn).attr("disabled", "disabled");
			$("."+defaults.addBtn).click(function(){	
			$("."+defaults.removeBtn).removeAttr("disabled");
				$('li',ul).removeClass(defaults.active);								
				counter++;
				var imgSource = defaults.imgFolder+"img"+counter+".jpg";
				$('.'+defaults.prvclass).html('<img src="'+imgSource+'" alt=""/>');
				$(ul).append('<li class="'+defaults.active+'"><img src="'+imgSource+'" width="60" height="49px" alt=""/></li>'); 
				var ln = $('li', ul).length;
				var imgWidt = $('li', ul).width()+17;
				var gotoNext = imgWidt*(ln-4)*-1,
				leftCount=gotoNext;
				if(gotoNext<0){					
				$(ul).animate({'left': gotoNext+"px"}, defaults.speed);
				imgCounter= ln-4;
				$("."+defaults.previousBtn).show();
				$("."+defaults.nextBtn).show();
				}	
				var lnr = imgCounter+5;
				if(imgCounter!=0)$("."+defaults.previousBtn).show();	
				if(gotoNext==leftCount)$( "."+defaults.nextBtn).hide();	
				if(ln==lnr)$("."+defaults.nextBtn).hide();			
			}); // Add Button 
		
		//Remove Image Button Click
		$("."+defaults.removeBtn).click(function(){	
		var position = $("."+ defaults.active).position().left;			
			if($("."+ defaults.active).position().left == 0) {	
			var prevIndex = 0;	
			} else {
			var prevIndex = $("."+ defaults.active).prev().index();
		}	
			$("."+ defaults.active).remove();
		
		$("li:eq("+prevIndex+")").addClass(defaults.active);
		var imgSrc =$("."+ defaults.active).children("img").attr("src");		
		if(imgSrc != undefined) {
			$('.'+defaults.prvclass).html('<img src="'+imgSrc+'" />');
			} else {
				$('.'+defaults.prvclass).html('');	
		}
		var ln = $('li', ul).length;
		var imgWidt =  $('li', ul).width()+17;
		var total = ((imgWidt)*imgCounter*-1);
		var ln = $("li",ul).length;		
			var selImg;
			if((ln-prevIndex)<4){
				selImg = ((imgWidt)*(ln-4)*-1);				
				if(ln>3) imgCounter = ln-4; 			
				else selImg = 0;
			}
			else
			{
				selImg = prevIndex == 0? 0:((position-imgWidt-16)*-1);
				if(ln>3) imgCounter = prevIndex; 					
			}
			$(ul).animate({'left': selImg+"px"},defaults.speed-200); //previous set
			if(ln<5){
			$("."+defaults.previousBtn).hide();
			$("."+defaults.nextBtn).hide();
			}
			if(ln<4) $( "."+defaults.nextBtn).hide();
			
			//remove btn enable disable
			if(ln==0){
			$("."+defaults.removeBtn).attr('disabled','disabled');			
			}else{
			$("."+defaults.removeBtn).removeAttr("disabled");
			}	
		
	});
	//Show the preview of image of selected image
	$(ul).on('click', 'li', function(){
		$('li',ul).removeClass(defaults.active);
		$(this).addClass(defaults.active);
		var imgSrc = $(this).children("img").attr("src");
		$('.'+defaults.prvclass).html('<img src="'+imgSrc+'" />');
	});	

	//go to next image
	$("."+defaults.nextBtn).on( 'click',function(){	
			var imgWidt = $("li", ul).width(),
			ln = $("li", ul).length,			
			total = ((imgWidt+17)*imgCounter*-1);
			leftCount = total;	
			if(imgCounter<ln-4){
				imgCounter++;	
				var total = ((imgWidt+17)*imgCounter*-1);						
				$(ul).animate({'left': total+"px"}, defaults.speed);										
			}
			var lnr = imgCounter+4;
			if(imgCounter!=0) $("."+defaults.previousBtn).show();	
			if(ln==lnr) $("."+defaults.nextBtn).hide();			
		});	
	//go to previous	
		$("."+defaults.previousBtn).on( 'click', function(e){			
		var ln = $("li",ul).length;
		var imgWidt = $("li",ul).width();	
		var total = ((imgWidt+17)*imgCounter*-1);
		if(imgCounter<ln){						
		imgCounter--;					
			if(imgCounter==-1){													
				imgCounter=0;	
			}
				var total = ((imgWidt+17)*imgCounter*-1)
				$(ul).animate({'left': total+"px"},defaults.speed);			
		}
		if(imgCounter==0&&ln>4) $("."+defaults.previousBtn).hide();	
		if(ln>4) $("."+defaults.nextBtn).show();		
	});
	//Reset all
	$("."+defaults.resetBtn).click(function(){
		counter=0; prevImg=0; curPos=0; selImg=0;
		$("."+defaults.previousBtn).hide();
		$("."+defaults.nextBtn).hide();
		$('.'+defaults.prvclass).html('');
		$(ul).html('');
		$(ul).css('left','inherit');
		$("."+defaults.removeBtn).attr("disabled", "disabled");
	});
	});	//each function end
} //Plugins		
})(jQuery);
