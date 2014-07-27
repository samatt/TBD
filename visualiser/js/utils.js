config = new Object();
config.dbName = "test";
config.remoteServer  = 'http://127.0.0.1:5984/test';
config.nodes = [];
config.links = [];
config.layouts = [ 'Distance', 'Network' , 'Connections' ];
config.interval = 5000;
config.intervalId;
config.hours = 0;
config.minutes = 3;
config.seconds = 0;

var node = null;
var link = null;

function setDuration (numHours, numMinutes, numSeconds){
	var ts = new Date();
	var minutes = (ts.getMinutes()-numMinutes) >0 ? (ts.getMinutes()-numMinutes) : 0
	var seconds = (ts.getSeconds()-numSeconds) >0 ? (ts.getSeconds()-numSeconds) : 0
	var hours 	= (ts.getHours()-numHours) >0 ? (ts.getHours()-numHours) : 0
	var timestamp = ts.getFullYear()+"-"+(ts.getMonth()-1)+"-"+(ts.getDate()+4)+" "+(hours)+":"+ minutes	+":"+seconds;

	return timestamp
}

function setUTCDuration (numHours, numMinutes, numSeconds){

	var ts = new Date();
	var minutes = (ts.getUTCMinutes()-numMinutes) >0 ? (ts.getUTCMinutes()-numMinutes) : 0
	var seconds = (ts.getUTCSeconds()-numSeconds) >0 ? (ts.getUTCSeconds()-numSeconds) : 0
	var hours 	= (ts.getUTCHours()-numHours) >0 ? (ts.getUTCHours()-numHours) : 0
	var timestamp = ts.getFullYear()+"-"+(ts.getMonth()+1)+"-"+(ts.getDate())+"T"+(hours)+":"+ minutes	+":"+seconds+"Z";

	return timestamp
}
