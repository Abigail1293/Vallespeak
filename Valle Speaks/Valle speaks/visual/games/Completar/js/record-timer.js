var minutesLabel = "";
var secondsLabel = "";
var totalSeconds = 0;

function setTime() {
  ++totalSeconds;
  secondsLabel = pad(totalSeconds % 60);
  minutesLabel = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) 
    return "0" + valString;
   else 
    return valString;  
}

function getTime(){
	return minutesLabel + ":" + secondsLabel;
}

$(function Controller(){
	setInterval(setTime, 1000);
})