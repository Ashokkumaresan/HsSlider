var MYAPP=MYAPP||{};
MYAPP.dom={};
MYAPP.dom.createElement=function(ele,prop,value,style){
	var element=document.createElement(ele);
	for(pr in prop){
		element.setAttribute(pr,prop[pr]);
	}
	if(value!=""){
		element.createTextNode(value);
	}
	for(s in style){
		element.style[s]=style[s];
	}
	return element;
}
MYAPP.dom.deleteElement=function(ele){
	var parentNode=ele.parentElement;
	var status = parentNode.removeChild(ele);
	return status;
}
MYAPP.dom.setAttribute=function(ele,prop){
	for(pr in prop){
		ele.setAttribute(pr,prop[pr]);
	}
}
MYAPP.event=function(){
	return {
		setEvent:function(){
			console.log("setEvent");
			return this;
		},
		getEvent:function(){
			console.log("getEvent");
			return this;
		}
		};
}();
/**Factory Pattern**/
function Factory(){
	this.createEmployee=function(type){
		var employee;
		if(type=="FullTime")
			employee=new FullTime();
		else if(type=="PartTime")
			employee=new PartTime();
		else if(type=="PartialTime")
			employee=new PartialTime();
		else
			employee=new NormalTime();
		employee.type=type;
		
		employee.say=function(){
			log.add(this.type+" "+this.hour+"rates").show();
		}
		return employee;
	}
}
var log=(function(){
	var log="";
	return{
		add:function(msg){log+=msg+"\n"; return this;},
		show:function(){console.log(log);log="";return this;}
	}
})();

function FullTime(){
	this.hour="9hrs";
}
function PartTime(){
	this.hour="4hrs";
}
function PartialTime(){
	this.hour="5hrs";
}
function NormalTime(){
	this.hour="8hrs";
}

function Run(){
	var results=[];
	results.push(new Factory().createEmployee("FullTime"));
	results.push(new Factory().createEmployee("PartTime"));
	results.push(new Factory().createEmployee("PartialTime"));
	results.push(new Factory().createEmployee("NormalTime"));
	results.forEach(function(element,index){
		element.say();
	});
}

/*Factory Pattern*/

function CarDoor( options ) {
  this.color = options.color || 'red';
  this.side = options.side || 'right';
  this.hasPowerWindows = options.hasPowerWindows || true;
}

function CarSeat( options ) {
  this.color = options.color || 'gray';
  this.material = options.material || 'leather';
  this.isReclinable = options.isReclinable || true;
}

var CarFactory=function(){
	this.createCar=function(options){
		var parentClass=null;
		if(options.parttype=="seat"){
			parentClass=CarSeat;
		}
		else
			parentClass=CarDoor;
		
		if(parentClass!=null){
		return new parentClass(options);
	}
	}
	
}
var mypart=new CarFactory();
var seat=mypart.createCar({parttype:"seat",color:"green",material:"normal"});
/*Factory Pattern */

/*Decorator Pattern*/
function vehicle(type,model,license){
	this.type=type||"Car";
	this.model="default";
	this.license="00-0000";
}
var truck=new vehicle();

truck.setModel=function(model){
	this.model=model;
}
truck.setLicense=function(lic){
	this.license=lic;
}
truck.setModel("Caiz");
truck.setLicense("18-23222");
console.log(truck);
var truck1=new vehicle();
console.log(truck1);

/*Decorator Pattern*/
var MacBook=function(){
	this.cost=function(){return 40000;}
	this.screenSize=function(){return "5inch";}
}
var MacCost=function(mac,inc){
	var actual=mac.cost();
	mac.cost=function(){return actual+inc};
}
var MacSize=function(mac,size){
	mac.screenSize=function(){return size;}
}
var ma=new MacBook();
var ma1=new MacBook();
MacCost(ma,10000);
MacSize(ma,"6inch");
console.log(ma);
console.log(ma1);

/*Decorator Pattern*/
var tree = {};
tree.decorate = function() {
console.log('Make sure the tree won\'t fall');
};

tree.getDecorator = function(deco){
tree[deco].prototype = this;
return new tree[deco];
};

tree.RedBalls = function() {
this.decorate = function() {
this.RedBalls.prototype.decorate();
console.log('Put on some red balls');
}
};

tree.BlueBalls = function() {
this.decorate = function() {
this.BlueBalls.prototype.decorate();
console.log('Add blue balls');
}
};
tree.Angel = function() {
this.decorate = function() {
this.Angel.prototype.decorate();
console.log('An angel on the top');
}
};

tree = tree.getDecorator('BlueBalls');
tree = tree.getDecorator('Angel');
tree = tree.getDecorator('RedBalls');

tree.decorate();

/*Observer pattern*/

function Click() {
    this.handlers = [];  // observers
}
 
Click.prototype = {
 
    subscribe: function(fn) {
        this.handlers.push(fn);
    },
 
    unsubscribe: function(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    },
 
    fire: function(o, thisObj) {
        var scope = thisObj || window;
        this.handlers.forEach(function(item) {
            item.call(scope, o);
        });
    }
}
 
// log helper
 
var log = (function() {
    var log = "";
 
    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { alert(log); log = ""; }
    }
})();
 
function run() {
 
    var clickHandler = function(item) { 
        log.add("fired: " + item); 
    };
 
    var click = new Click();
 
    click.subscribe(clickHandler);
    click.fire('event #1');
    click.unsubscribe(clickHandler);
    click.fire('event #2');
    click.subscribe(clickHandler);
    click.fire('event #3');
 
    log.show();
}

/*Observer pattern*/

/*function ObserverList(){
  this.observerList = [];
}
 
ObserverList.prototype.add = function( obj ){
  return this.observerList.push( obj );
};
 
ObserverList.prototype.count = function(){
  return this.observerList.length;
};
 
ObserverList.prototype.get = function( index ){
  if( index > -1 && index < this.observerList.length ){
    return this.observerList[ index ];
  }
};
 
ObserverList.prototype.indexOf = function( obj, startIndex ){
  var i = startIndex;
 
  while( i < this.observerList.length ){
    if( this.observerList[i] === obj ){
      return i;
    }
    i++;
  }
 
  return -1;
};
 
ObserverList.prototype.removeAt = function( index ){
  this.observerList.splice( index, 1 );
};

function Subject(){
  this.observers = new ObserverList();
}
 
Subject.prototype.addObserver = function( observer ){
  this.observers.add( observer );
};
 
Subject.prototype.removeObserver = function( observer ){
  this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
};
 
Subject.prototype.notify = function( context ){
  var observerCount = this.observers.count();
  for(var i=0; i < observerCount; i++){
    this.observers.get(i).update( context );
  }
};

function Observer(){
  this.update = function(){
    console.log("update function called");
  };
}

// Extend an object with an extension
function extend( obj, extension ){
  for ( var key in extension ){
    obj[key] = extension[key];
  }
}
 
// References to our DOM elements
 
var controlCheckbox = document.getElementById( "mainCheckbox" ),
  addBtn = document.getElementById( "addNewObserver" ),
  container = document.getElementById( "observersContainer" );
 
 
// Concrete Subject
 
// Extend the controlling checkbox with the Subject class
extend( controlCheckbox, new Subject() );
 
// Clicking the checkbox will trigger notifications to its observers
controlCheckbox.onclick = function(){
  controlCheckbox.notify( controlCheckbox.checked );
};
 
addBtn.onclick = addNewObserver;
 
// Concrete Observer
 
function addNewObserver(){
 
  // Create a new checkbox to be added
  var check = document.createElement( "input" );
  check.type = "checkbox";
 
  // Extend the checkbox with the Observer class
  extend( check, new Observer() );
 
  // Override with custom update behaviour
  check.update = function( value ){
    this.checked = value;
  };
 
  // Add the new observer to our list of observers
  // for our main subject
  controlCheckbox.addObserver( check );
 
  // Append the item to the container
  container.appendChild( check );
}

*/


var observerpattern={

	addSubscriber:function(obj){
		this.subscribers.push(obj);
	},
	removeSubscriber:function(obj){
		var i=this.subscribers.indexOf(obj);
		if(i!=-1)
			this.subscribers.splice(obj,1);
		else
			console.log("Invalid Subscriber");
	},
	publish:function(what){
		this.subscribers.forEach(function(ele){
			ele.call(window,what);
		});
	},
	make: function(o) { // turns an object into a publisher
		for(var i in this) {
			o[i] = this[i];
			o.subscribers = [];
		}
		}
	};
	var blogger = {
	writeBlogPost: function() {
	var content = 'Today is ' + new Date();
	this.publish(content);
	}
	};
	
	var la_times = {
	newIssue: function() {
	var paper = 'Martians have landed on Earth!';
	this.publish(paper);
	}
	};
	
	observerpattern.make(blogger);
observerpattern.make(la_times);

var jack = {
read: function(what) {
console.log('I just read that ' + what)
}
};
var jill = {
gossip: function(what) {
console.log('You didn\'t hear it from me, but ' + what)
}
};

blogger.addSubscriber(jack.read);
blogger.addSubscriber(jill.gossip);

/*Mediator Pattern*/

var Participant = function(name) {
    this.name = name;
    this.chatroom = null;
};
 
Participant.prototype = {
    send: function(message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function(message, from) {
        Mlog.add(from.name + " to " + this.name + ": " + message);
    }
};
 
var Chatroom = function() {
    var participants = {};
 
    return {
 
        register: function(participant) {
            participants[participant.name] = participant;
            participant.chatroom = this;
        },
 
        send: function(message, from, to) {
            if (to) {                      // single message
                to.receive(message, from);    
            } else {                       // broadcast message
                for (key in participants) {   
                    if (participants[key] !== from) {
                        participants[key].receive(message, from);
                    }
                }
            }
        }
    };
};
 
// log helper
 
var Mlog = (function() {
    var log = "";
 
    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { console.log(log); log = ""; }
    }
})();
 
function Mrun() {
    var yoko = new Participant("Yoko");
    var john = new Participant("John");
    var paul = new Participant("Paul");
    var ringo = new Participant("Ringo");
 
    var chatroom = new Chatroom();
    chatroom.register(yoko);
    chatroom.register(john);
    chatroom.register(paul);
    chatroom.register(ringo);
 
    yoko.send("All you need is love.");
    yoko.send("I love you John.");
    john.send("Hey, no need to broadcast", yoko);
    paul.send("Ha, I heard that!");
    ringo.send("Paul, what do you think?", paul);
 
    Mlog.show();
}