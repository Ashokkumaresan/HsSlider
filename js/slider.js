/*
*/
var hsSlider=(function(){
	var slider= function(options){
		var styleType=null;
	var style=options.style.toLowerCase()||"basic";
	if(style=="basic")
		styleType=basicSlider;
	else if(style=="brick")
		styleType=brickSlider;
	
	return new styleType(options);
	};
	slider.prototype.min_width=4;
	slider.prototype.min_height=4;
	slider.prototype.show=function(){console.log("working")};
slider.prototype.hideSource=function(options){
	var hs_findChild=new Array();
	hs_findChild=document.getElementById(options.id).children;	
	if(hs_findChild.length>0){
		hs_findChild=[].slice.call(hs_findChild);
		hs_findChild.forEach(function(ele,ind){
			ele.style.display="none";
		});
	}
};
slider.prototype.loadImages=function(options,type){
		var hs_liList=document.getElementById(options.id).getElementsByTagName("LI");
		hs_liList=[].slice.call(hs_liList);
	var hs_liListLength=hs_liList.length;
	var hs_body=document.getElementById(options.id);	
	window[options.id]=new Array();
	hs_liList.forEach(function(ele,index){
		var hs_Object=new Object();
		hs_Object.index=index;
		hs_Object.speed=options.delay;	
		hs_Object.imagespeed=(options.delay-1000)/1000;	
		hs_Object.reversespeed=options.delay;	
	   hs_Object.direction=options.direction;	
	   hs_Object.imgurl=ele.getElementsByTagName("img")[0].getAttribute("src");
		var hs_imgurl=ele;
		var hs_divEle=document.createElement("div");	
		applyStyles(hs_divEle,{width:options.width,height:options.height,position:"absolute","z-index":1,background:"url("+hs_imgurl.getElementsByTagName("img")[0].getAttribute("src")+")"});
		if(type=="move"){
		if(index==0)applyStyles(hs_divEle,{transform:"translate3d(0,0,0)"});	
		else{
			if(options.direction=="reverse")
				var moveValue=(getWidth(options));
			else
				var moveValue=-(getWidth(options));
		//var moveValue=-($(window).width());
		}
		applyStyles(hs_divEle,{transform:"translate3d("+moveValue+"px,0,0)"});	
		}
		else{
			applyStyles(hs_divEle,{transform:"translate3d(0,0,0)","z-index":hs_liListLength});
        hs_liListLength--;			
		}
		hs_Object.divCom=hs_divEle;
		hs_body.appendChild(hs_divEle);
		window[options.id].push(hs_Object);
	});
	
}
var basicSlider=function(options){
	console.log(options);
	basicSlider.prototype.hideSource(options);
	basicSlider.prototype.loadImages(options,"move");
	
	var img_count=window[options.id].length-1;
	var current_index=0;
	setInterval(function(){
			var prev_index=current_index;
		var l_current= window[options.id][current_index]["divCom"];
        var img_spd=window[options.id][current_index]["imagespeed"];		
		    reverse_spd=window[options.id][current_index]["reversespeed"];	
		    speed=window[options.id][current_index]["speed"];	
		     var direction=window[options.id][current_index]["direction"];		   
		applyStyles(l_current,{"z-index":9,transition:"all linear "+(img_spd)+"s",visibility:"visible"});
       if(direction=="reverse")
		   applyStyles(l_current,{transform:"translate3d(-"+getWidth(options)+"px,0,0)"});				  	
	   else
		   applyStyles(l_current,{transform:"translate3d("+getWidth(options)+"px,0,0)"});		
        if(current_index!=img_count)		
			current_index++;
		else
			current_index=0;	
		var l_next= window[options.id][current_index]["divCom"];			
		applyStyles(l_next,{"z-index":9,transition:"all linear "+(img_spd)+"s",visibility:"visible",transform:"translate3d(0,0,0)"});
		var l_prev= window[options.id][prev_index]["divCom"];		
		setTimeout(function(){	
		applyStyles(l_prev,{"z-index":1,visibility:"hidden",transition:"none"});
		 if(direction=="reverse")
			 applyStyles(l_prev,{transform:"translate3d("+getWidth(options)+"px,0,0)"});								
		 else
	 	     applyStyles(l_prev,{transform:"translate3d(-"+getWidth(options)+"px,0,0)"});			
			}, reverse_spd);

		}, options.delay*2);
};
basicSlider.prototype=slider.prototype;
basicSlider.prototype.constructor=basicSlider;

var brickSlider=function(options){
	try{
			brickSlider.prototype.hideSource(options);
			brickSlider.prototype.loadImages(options,"stay");
			var speed=window[options.id][0]["speed"];
			var delay=window[options.id][0]["imagespeed"];
			var ind=0,zind=0;
			var mainload=setInterval(function(){
			if(ind==window[options.id].length-1){
				for(var j=0;j<window[options.id].length;j++){
					//console.log(window[options.id][j]["imgurl"]);
					
					applyStyles(window[options.id][j]["divCom"],{"display":"block"});
				}
			}
			applyStyles(window[options.id][window[options.id].length-1]["divCom"],{"display":"block"});
			item=window[options.id][ind];	
			createDiv(options,item);	
			var len=brickSlider.prototype.block.length;
			var action_lst=shuffle(len);
			var briclen=action_lst.entries();
			//for(var i=0;i<briclen;i++){
				var actioncount=0;
				   var imganim=setInterval(function(){
					var current=briclen.next().value[1];
					//applyStyles(item.divCom,{"display":"none"});
					actioncount++;
					applyStyles(brickSlider.prototype.block[current],{transform:"scale(0.7) rotate(360deg)","transform-origin":"-40px 50px","opacity":0});
					if(actioncount==brickSlider.prototype.block.length){
						 clearInterval(imganim);			 
						// ind++;
						 if(ind>=window[options.id].length-1)
							 ind=0;
						 else ind++;
					}
					 },delay*2);
			//}
					},speed);
			}
			catch(e){
				clearInterval(mainload);	
				 clearInterval(imganim);	
				console.log(e);
			}
		//applyStyles(current,{transform:"rotate(360deg)"});
	//}
	
};
brickSlider.prototype=slider.prototype;
brickSlider.prototype.constructor=brickSlider;
brickSlider.prototype.block=[];
var createDiv=function(options,item){
	brickSlider.prototype.block=[];
	var min_width=15,min_height=15;
	var length=window[options.id].length;
	//for(var j=0;j<length;j++){
	var divwidth=getWidth(options)/min_width;
	var divheight=parseInt(options.height)/min_height;
	//if(width/min_width<300){ min_width--; arguments.callee;} else if(width/min_width>500){min_width++; arguments.callee;}
	var parent=document.getElementById(options.id);
	var width_index=0;
	var height_index=0;
	for(var i=0;i<(min_width*min_height);i++){
		var hs_divEle=document.createElement("div");
		var leftpos=0,toppos=0;
		leftpos=divwidth*width_index;
		toppos=divheight*height_index;
		if(leftpos>=getWidth(options)-divwidth){ width_index=0;height_index++;}else width_index++;		
		var img_pos=(-leftpos)+"px "+(-toppos)+"px";
		var pos="translate3d("+leftpos+"px,"+toppos+"px,0px)";
		//applyStyles(hs_divEle,{float:"left",width:divwidth+"px",height:divheight+"px",background:"url("+item.imgurl+")",position:"absolute",left:leftpos+"px",top:toppos+"px","z-index":9,"background-position":img_pos});
		applyStyles(hs_divEle,{float:"left",width:divwidth+"px",height:divheight+"px",background:"url("+item.imgurl+")",position:"absolute",transform:pos,"z-index":9,"background-position":img_pos});
		brickSlider.prototype.block.push(hs_divEle);
		parent.appendChild(hs_divEle);
		
		//console.log(item.imgurl);
	}
//}
	applyStyles(item.divCom,{"display":"none"});
};
var applyStyles=function(DOMobj,styleOptions){
	for(x in styleOptions){
		DOMobj.style[x]=styleOptions[x];
	}
	return DOMobj;
};
var getWidth=function(options){
	var l_width=document.getElementById(options.id).offsetWidth;	
	return l_width;
};
var getHeight=function(options){
	var l_height=document.getElementById(options.id).offsetHeight;	
	return l_height;
};

function shuffle(o) {
	var aa=[];for(var i=0;i<o;i++) aa.push(i);
    for(var j, x, i = aa.length; i; j = parseInt(Math.random() * i), x = aa[--i], aa[i] = aa[j], aa[j] = x);
    return aa;
};
	return {		
		slider: slider
	};
})();
