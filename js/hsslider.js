/********** HsSlider **********/
/*
Product: Image And Text Slider,
Type: Pure Javascript,
Version:1.0,
Author:Ashok Kumaresan,
*/

(function(){	
var win=window;
hsReady=false;
hsActive=true;
 var global={
 	window:win
 };
 
 /* OnLoad image handler and progress bar geerator
 **********************************************************************************************************/
loadedImage=function(divId){	
	console.log(Access.itemList);
	console.log(divId);
	var curObject=Access.itemList.find(function(e){return e.id==divId});
	if(typeof curObject=="object"){
		var leftDiv=document.querySelector('#'+divId+" div").childNodes[0];
		var rightDiv=document.querySelector('#'+divId+" div").childNodes[1];
		//valueDiv.innerHTML="";
		curObject.loadCount=curObject.loadCount+1;
	var imgListCount=curObject.imgList.length;	
	//valueDiv.appendChild(document.createTextNode(((curObject.loadCount/imgListCount) * 100)+"%"));
	//setTimeout(function(){
		//valueDiv.innerHTML=((curObject.loadCount/imgListCount) * 100)+"%";
		applyStyles(leftDiv,{width:((curObject.loadCount/imgListCount) * 50)+"%"});
		applyStyles(rightDiv,{width:((curObject.loadCount/imgListCount) * 50)+"%"});
		//},500);	
	console.log("Completed"+(curObject.loadCount/imgListCount) * 100);
	if(imgListCount==curObject.loadCount)
		console.log("Done");
	   hsReady=true;
	}
} 
/*Global Objects
***********************************************************************************************************/
global.core={
	itemList:[],
	sliders:[]
}
Access=global.core;

/*Main Functions
***********************************************************************************************************/
 hsSlider=function(options){
	 this.source=options;
	console.log("Parent");
}
/* Ready function and assigning load event to slider image
***********************************************************************************************************/
hsSlider.ready=function(options){	
	Access.itemList.push(options);
	this.ID=options.id;
	Access.sliders.push(this);	
	this.hideSource(options);
	this.loadingProgress(options);
	document.onreadystatechange=function(){	
		if(typeof options =="object"){
			console.log(options);					
				if(document.readyState==="complete"){
					Access.itemList.forEach(function(value){
					 imglist=document.getElementById(value.id).getElementsByTagName("img");					
					 value["imgList"]=imglist;					  
					 value["loadCount"]=0;
					for(var i=0;i<imglist.length;i++){
						imglist[i].onload=loadedImage(value.id);
					}
					var current=Access.sliders.filter(function(x){if (x.ID==value.id) return x});
					 current[0]["source"]=value;
				});
				}			
		 }		 
   }
   window.onblur=function(e){
	    hsActive=false;
	    console.log("blur"+hsActive);
   }
    window.onfocus=function(e){
		  hsActive=true;
	    console.log("focus"+hsActive);
   }     
	return this; 	
};

/*Slider start function
***********************************************************************************************************/
hsSlider.ready.prototype.start=function(){
	var current=this;
	var checkReady=setInterval(function(){
		if(hsReady){
		console.log(current);
		console.log("start");	
		clearInterval(checkReady);
		current.hideProgress();
	}
	},500);	
		return current;		
	}
//hsSlider.prototype=global.core;
//hsSlider.prototype.constructor=hsSlider;

/*Slider hide source function
***********************************************************************************************************/
hsSlider.ready.prototype.hideSource=function(options){	
		document.querySelector("#"+options.id+" ul").style.display="none";	
}

/*Slider progress bar creator
***********************************************************************************************************/
hsSlider.ready.prototype.loadingProgress=function(options){
		console.log("Working: "+this);
		var loadingDiv=createElement("div");
		setAttribute(loadingDiv,{"contype":"per"});		
		applyStyles(loadingDiv,{width:"inherit",height:"inherit",background:"#eee",transition:"all linear 0.5s"});
		addChildren(document.getElementById(options.id),loadingDiv);	
		var left_bar=createElement("div");
		var right_bar=createElement("div");
		applyStyles(left_bar,{width:"0px",height:"20px",background:"#ff0000",position:"absolute",left:"0",transition:"all linear 1s",top:"50%"});
		applyStyles(right_bar,{width:"0px",height:"20px",background:"#ffffff",position:"absolute",right:"0",transition:"all linear 1s",top:"50%"});
		addChildren(loadingDiv,left_bar);
		addChildren(loadingDiv,right_bar);
		//addChildren(loadingDiv,applyStyles(createElement("div"),{"text-align":"center",color:"#000","font-size":"60px","padding-top":(getHeight(value)/2)+"px"}));	
}

/*Hide progress bar after image is loaded
***********************************************************************************************************/
hsSlider.ready.prototype.hideProgress=function(){	
		console.log("From HideProgress "+this);
		var progressDiv=document.querySelector('#'+this.ID+" div");
		var current=this;
		setTimeout(function(){
			applyStyles(progressDiv,{opacity:0});
		},1000);	
		setTimeout(function(){
			applyStyles(progressDiv,{display:"none"});			
			current.selectTransition();
		},2000);	
}
/*Select slider transition style
***********************************************************************************************************/
hsSlider.ready.prototype.selectTransition=function(){
	console.log(this);
	switch(this.source.type.toLowerCase()){
		case "basic":this.Basic();
		             break;
		case "flip":this.Flip();
                     break;
        default:this.Basic();
		 
	}
}
/*Create arrow buttons
***********************************************************************************************************/
hsSlider.ready.prototype.arrow=function(){
	var leftArrow=document.createElement("div");
	var rightArrow=document.createElement("div");
	leftArrow.textContent="<";
	rightArrow.textContent=">";
	applyStyles(leftArrow,{position:"absolute",cursor:"pointer",top:(getHeight(this)/2.3)+"px",width:"50px",height:"50px",left:0,"font-size":"50px","text-align":"center","z-index":"50"});
	applyStyles(rightArrow,{position:"absolute",cursor:"pointer",top:(getHeight(this)/2.3)+"px",width:"50px",height:"50px",right:0,"font-size":"50px","text-align":"center","z-index":"50"});
	addChildren(document.getElementById(this.ID),leftArrow);
	addChildren(document.getElementById(this.ID),rightArrow);
}
/*Basic Slider transition
***********************************************************************************************************/
hsSlider.ready.prototype.Basic=function(){	
	console.log("Basic");	
	this.source["slider"]=[];
	this.source["slidertext"]=[];
	this.source["slidereffect"]=[];
	this.source["textanimationflag"]=false;
	var img_source=this.source.imgList;
	var img_length=img_source.length;
	for(var i=0;i<img_length;i++){
		var sliderDiv=document.createElement('div');
		applyStyles(sliderDiv,{width:"inherit",height:"inherit",background:"url("+img_source[i].getAttribute("src")+")",position:"absolute","background-size":"cover",perspective:"1000"});	
		this.source.slider.push(sliderDiv);
		this.source.slidertext.push(img_source[i].getAttribute("data-text").split("|"));		
		this.source.slidereffect.push(img_source[i].getAttribute("text-animation").split("|"));		
		//addChildren(document.getElementById(this.ID),sliderDiv);	
	}
	var first=this.source.slider[0];
	applyStyles(first,{transform:"translate3d(0,0,0)"});
	addChildren(document.getElementById(this.ID),first);
	this.textAnimation();	
	this.arrow();
	this.moveLeft();	
}
/*Move Slider Left
***********************************************************************************************************/
hsSlider.ready.prototype.moveLeft=function(){
	console.log("Move Left");	
	var current=this;	
	setInterval(function(){
		console.log("Timer"+hsActive);
	if(hsActive){
		if(current.source.textanimationflag){
			/*Text Animation*/
			current.textAnimation();
			/*End Text Animation*/
			var first=current.source.slider.shift();
			var second=current.source.slider[0];
			applyStyles(first,{transform:"translate3d(0,0,0)"});
			applyStyles(second,{transform:"translate3d("+getWidth(current)+"px,0,0)"});
			addChildren(document.getElementById(current.ID),first);	
			addChildren(document.getElementById(current.ID),second);
			applyStyles(first,{transform:"translate3d(-"+getWidth(current)+"px,0,0)"});
			applyStyles(second,{transform:"translate3d(0,0,0)"});	
			current.source.slider.push(first);
	   }
	}
	//current.source.slider.push(second);
	},3000);
	
}
/*Move Slider Right
***********************************************************************************************************/
hsSlider.ready.prototype.moveRight=function(){
	console.log("Move Right");	
}
/*Flip Slider transition
***********************************************************************************************************/
hsSlider.ready.prototype.Flip=function(){
	console.log("Flip");
}
/*Text animation
***********************************************************************************************************/
hsSlider.ready.prototype.textAnimation=function(){
	console.log("Text Animation started");
	console.log(this);
	var current=this;
	this.source.textanimationflag=false;
	var textArray=[];
	var currentText=this.source.slidertext.shift();
	this.source.slidertext.push(currentText);
	var currentAnimation=this.source.slidereffect.shift();
	this.source.slidereffect.push(currentAnimation);
	var len=currentText.length;
	// create text div with positions
	for(var i=0;i<len;i++){
		var textDiv=document.createElement("div");
		textDiv.textContent=currentText[i];
		var initialPlace="";
		if(currentAnimation[i]=="top")
			initialPlace="translate3d(0,-50px,0)";
		else if(currentAnimation[i]=="bottom")
			initialPlace="translate3d(0,-"+getHeight(this)+"px,0)";
		else if(currentAnimation[i]=="right")
			initialPlace="translate3d("+getWidth(this)+"px,0,0)";
		else if(currentAnimation[i]=="left")
			initialPlace="translate3d(-"+getWidth(this)+"px,0,0)";
		setAttribute(textDiv,{"animation":currentAnimation[i]});		
		applyStyles(textDiv,{"z-index":"50","font-size":"25px",background:"#eee",width:"auto",height:"auto",position:"absolute",transform:initialPlace,padding:"8px","font-style":"italic"});
		textArray.push(textDiv);
		addChildren(document.getElementById(this.ID),textDiv);	
	}
	for(var i=0;i<textArray.length;i++){
		var anim=textArray[i].getAttribute("animation");
		var x=(getWidth(this)/3);
		var y=(getHeight(this)/3);
		x=x+(60*i);
		y=y+(70*i);
		//setTimeout(function(){			
			applyStyles(textArray[i],{transform:"translate3d("+x+"px,"+y+"px,0)"});
		//},300);
	}
	setTimeout(function(){
			for(var i=0;i<textArray.length;i++){		
		applyStyles(textArray[i],{opacity:"0"});
	   }
	current.source.textanimationflag=true;
	},3000);
	
}

/*Create DOM element
***********************************************************************************************************/
var createElement=function(DOMobj){
	var newObject=document.createElement(DOMobj);
	return newObject;
}

/*Set attribute to DOM elements
***********************************************************************************************************/
var setAttribute=function(DOMobj,prop){
	for(x in prop){
		DOMobj.setAttribute(x,prop[x]);
	}
	return DOMobj;
}

/*Set styles to DOM elements
***********************************************************************************************************/
var applyStyles=function(DOMobj,styleOptions){
	for(x in styleOptions){
		DOMobj.style[x]=styleOptions[x];
	}
	return DOMobj;
};

/*Get width of the parent container
***********************************************************************************************************/
var getWidth=function(options){
	var l_width=document.getElementById(options.ID).offsetWidth;	
	return l_width;
};

/*Get height of the parent container
***********************************************************************************************************/
var getHeight=function(options){
	var l_height=document.getElementById(options.ID).offsetHeight;	
	return l_height;
};

/*Append DOM to parent object
***********************************************************************************************************/
var addChildren=function(parentDiv,childDiv){
	parentDiv.appendChild(childDiv);
}

})();