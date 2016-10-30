/*********** HsSlider ***********/
/*
Product: Image Slider,
Type: Pure Javascript,
Version:1.0,
Author:Ashok Kumaresan,
*/

(function(){	
var win=window;
hsReady=false;
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
					 textlist=document.getElementById(value.id).getElementsByTagName("span");
					 value["imgList"]=imglist;
					  value["textList"]=textlist;
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
			current.selectTransition();
		},1000);	
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
/*Basic Slider transition
***********************************************************************************************************/
hsSlider.ready.prototype.Basic=function(){
	console.log("Basic");
}

/*Flip Slider transition
***********************************************************************************************************/
hsSlider.ready.prototype.Flip=function(){
	console.log("Flip");
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
	var l_width=document.getElementById(options.id).offsetWidth;	
	return l_width;
};

/*Get height of the parent container
***********************************************************************************************************/
var getHeight=function(options){
	var l_height=document.getElementById(options.id).offsetHeight;	
	return l_height;
};

/*Append DOM to parent object
***********************************************************************************************************/
var addChildren=function(parentDiv,childDiv){
	parentDiv.appendChild(childDiv);
}

})();