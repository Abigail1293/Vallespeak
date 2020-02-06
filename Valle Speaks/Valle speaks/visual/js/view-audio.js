var container = $('.view-audio'),
	cover = $('.cover'),
	title = $('#audio-title'),
	song = null;

var mPlay = function(e) {	
	if(e) e.preventDefault();

	mPusePlay();
	
	$(this).replaceWith(
	"<a class='btn button gradient' id='pause' title=''>" +
		"<svg-icon class='glyph-icon-acent glyph-icon-white'>" +
			"<src href='css/sprite/sprite.svg#si-glyph-pause'/>" + 
		"</svg-icon>" +
	"</a>"); 
	
	container.addClass('containerLarge');
	cover.addClass('coverLarge');
	$('#close').fadeIn(300);			
	//$('#seek').attr('max', song.duration);
};

var mPause = function(e) {
	if(e) e.preventDefault();

	mPusePlay();

	$(this).replaceWith(
	"<a class='btn button gradient' id='play' title=''>" +
		"<svg-icon class='glyph-icon-acent glyph-icon-white'>" +
			"<src href='css/sprite/sprite.svg#si-glyph-button-play'/>" + 
		"</svg-icon>" +
	"</a>");
	//container.removeClass('containerLarge');
	//cover.removeClass('coverLarge');
};

var mStop = function() {
	if(song)
	{
		if(!song.paused)
			$('#pause').click();
		song.currentTime = 0;			
	}	
};

var mMute = function(e) {
	if(e) e.preventDefault();

	song.volume = 0;

	$(this).replaceWith(
	"<a class='btn button gradient' id='muted' title=''>" +
		"<svg-icon class='glyph-icon-acent glyph-icon-white'>" +
			"<src href='css/sprite/sprite.svg#si-glyph-sound-mute'/>" + 
		"</svg-icon>" +
	"</a>");	
	$('#muted').on('click', mMuted);
};

var mMuted = function(e) {
	if(e) e.preventDefault();
	song.volume = 1;
	$(this).replaceWith(
	"<a class='btn button gradient' id='mute' title=''>" +
		"<svg-icon class='glyph-icon-acent glyph-icon-white'>" +
			"<src href='css/sprite/sprite.svg#si-glyph-sound'/>" + 
		"</svg-icon>" +
	"</a>");
	$('#mute').on('click', mMute);
};

var mClose = function(e) {
	if(e) e.preventDefault();
	//container.removeClass('containerLarge');
	//cover.removeClass('coverLarge');
	mStop();
	$('#close').fadeOut(300);

	/**Hide the controller */
	container.hide();
	
};

var mSeek = function() {
	if(song)
	{
		song.currentTime = $(this).val();
		$("#seek").attr("max", song.duration);
	}
};

function player(file, tl){  
	container.show();

	mStop();
	
	song = new Audio(file + '.ogg', file +  '.mp3');
	
    if (song.canPlayType('audio/mpeg;')) 
    {
        song.type= 'audio/mpeg';
        song.src= file + '.mp3';
    }
    else 
    {
        song.type= 'audio/ogg';
        song.src= file + '.ogg';
	}
	
	song.addEventListener('timeupdate', function (){
        curtime = parseInt(song.currentTime, 10);
		$('#seek').val(curtime);		
    });

	song.addEventListener('playing', function() {   
		$("#seek").attr("max", song.duration);
		$('#pause').on('click', mPause);
	});

	song.addEventListener('pause', function() {		
		$('#play').on('click', mPlay);
	});

	song.addEventListener('ended', function() {
		$('#close').click();
	});

	song.addEventListener('volumechange', function(e) {
		
	});

	setRemoveListeners();

	setAddListeners();

	$('#play').click();

	title.html(tl);
}

function setAddListeners(){	

	$('#play').on('click', mPlay);

	$('#pause').on('click', mPause);

	$('#mute').on('click', mMute);

	$('#muted').on('click', mMuted);

	$('#close').click(mClose);

	$("#seek").bind("change", mSeek);
}


function setRemoveListeners(){	

	$('#play').off('click', mPlay);

	$('#pause').off('click', mPause);

	$('#mute').off('click', mMute);

	$('#muted').off('click', mMuted);

	$('#close').unbind('click', mClose);

	$("#seek").unbind("change", mSeek);
}

function mPusePlay(){	
	if(song){
		if(song.paused)
			song.play();
		else
			song.pause();
	}
}


function Drag(top, left, id){
    //Make the DIV element draggagle:	
    if(document.getElementById(id))
        dragElement(document.getElementById(id));	
    else
        dragElement(document.getElementsByClassName(id)[0]);	
	function dragElement(elmnt) {
		elmnt.style.top = top;
		elmnt.style.left = left;
	    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	    elmnt.onmousedown = dragMouseDown;

	  function dragMouseDown(e) {
        e = e || window.event;
        $('#' + id).removeClass('transition-all');
	    // get the mouse cursor position at startup:
	    pos3 = e.clientX;
	    pos4 = e.clientY;
	    document.onmouseup = closeDragElement;
	    // call a function whenever the cursor moves:
	    document.onmousemove = elementDrag;
	  }

	  function elementDrag(e) {
	    e = e || window.event;
	    // calculate the new cursor position:
	    pos1 = pos3 - e.clientX;
	    pos2 = pos4 - e.clientY;
	    pos3 = e.clientX;
	    pos4 = e.clientY;
	    // set the element's new position:
	    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
	    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	  }

	  function closeDragElement() {
        $('#' + id).addClass('transition-all');
	    /* stop moving when mouse button is released:*/
	    document.onmouseup = null;
	    document.onmousemove = null;
	  }
	}
}

$(document).ready(function(){
	Drag('74px', '6px', 'view-audio');
})