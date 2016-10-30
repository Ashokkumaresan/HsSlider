var hsSlider=function(targetId,direction,animation_type,speed,width,height){
this.targetId=targetId;// Container Id
this.direction=direction;// direction 
this.animation_type=animation_type; // animation type
this.speed=speed;// animation speed
this.width=width;// slider width
this.height=height;//slider height
this.reversespeed=speed; //slider reverse speed
this.imagespeed=(speed-1000)/1000;
this.show=function(){
	//alert(targetId);
	var hs_findChild=document.getElementById(targetId).children;
	var hs_findChildLen=hs_findChild.length;
	for(var item=0; item<hs_findChildLen;item++){
		var hs_item=hs_findChild[item];
		hs_item.style.display="none";
	}
	var hs_liList=document.getElementById(targetId).getElementsByTagName("LI");
	var hs_liListLength=hs_liList.length;
	var hs_body=document.getElementById(targetId);
	//var hs_body_width=document.getElementById(targetId).offsetWidth;	
	//console.log(getWidth());
	window[targetId]=new Array();
	for(var item=0; item<hs_liListLength;item++){
		var hs_Object=new Object();
		hs_Object.index=item;
		hs_Object.speed=this.speed;	
		hs_Object.imagespeed=this.imagespeed;	
		hs_Object.reversespeed=this.reversespeed;	
	   hs_Object.direction=this.direction;	
		var hs_imgurl=hs_liList[item];
		var hs_divEle=document.createElement("div");
		hs_divEle.style.width=width;
		hs_divEle.style.height=height;
		hs_divEle.style.position="absolute";
		hs_divEle.style["z-index"]=1;
		hs_divEle.style.background="url("+hs_imgurl.getElementsByTagName("img")[0].getAttribute("src")+")";
		hs_divEle.style["background-size"]="cover";
		if(item==0)hs_divEle.style.transform="translate3d(0,0,0)";		
		else{
			if(direction=="reverse")
				var moveValue=(getWidth());
			else
				var moveValue=-(getWidth());
		//var moveValue=-($(window).width());
		}
		hs_divEle.style.transform="translate3d("+moveValue+"px,0,0)";		
		hs_Object.divCom=hs_divEle;
		hs_body.appendChild(hs_divEle);
		window[targetId].push(hs_Object);
	}
	if(animation_type=="basic")
	  basicLinear();
  else if(animation_type=="brick")
	  brickEffect();
		
};
function getWidth(){
	var l_width=document.getElementById(targetId).offsetWidth;	
	return l_width;
};
function getHeight(){
	var l_height=document.getElementById(targetId).offsetHeight;	
	return l_height;
};
function brickEffect(){
		var img_count=window[targetId].length-1;
	    var current_index=0;
		setInterval(function(){
			var l_current= window[targetId][current_index]["divCom"];
			 speed=window[targetId][current_index]["speed"];
			 
			}, speed*2);	
}
function basicLinear(){
		var img_count=window[targetId].length-1;
	var current_index=0;
	setInterval(function(){
			var prev_index=current_index;
		var l_current= window[targetId][current_index]["divCom"];
        var img_spd=window[targetId][current_index]["imagespeed"];		
		    reverse_spd=window[targetId][current_index]["reversespeed"];	
		    speed=window[targetId][current_index]["speed"];	
		     var direction=window[targetId][current_index]["direction"];	
	    l_current.style["z-index"]=9;		
		l_current.style.transition="all linear "+(img_spd)+"s";	
		//l_current.style.transition="all linear 2s";	
		l_current.style.visibility="visible";
       if(direction=="reverse")		
		   l_current.style.transform="translate3d(-"+getWidth()+"px,0,0)";	
	   else
		l_current.style.transform="translate3d("+getWidth()+"px,0,0)";	
        if(current_index!=img_count)		
			current_index++;
		else
			current_index=0;	
		var l_next= window[targetId][current_index]["divCom"];		
		l_next.style["z-index"]=9;
		l_next.style.transition="all linear "+(img_spd)+"s";
		//l_next.style.transition="all linear 2s";		
		l_next.style.visibility="visible";	
		l_next.style.transform="translate3d(0,0,0)";			
		
		var l_prev= window[targetId][prev_index]["divCom"];		
		setTimeout(function(){
			l_prev.style["z-index"]=1;
		l_prev.style.visibility="hidden";	
		l_prev.style.transition="none";	
		 if(direction=="reverse")		
			 l_prev.style.transform="translate3d("+getWidth()+"px,0,0)";				
		 else
		l_prev.style.transform="translate3d(-"+getWidth()+"px,0,0)";				
			}, reverse_spd);

		}, speed*2);	
}
}
