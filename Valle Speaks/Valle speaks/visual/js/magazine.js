/*
 * Magazine sample
*/

// Sets and gets the zoom value

var  pathImg = "";
var  pageMark = 0;

function addPage(page, book) {
	var id, pages = book.turn('pages');

	// Create a new element for this page
	var element = $('<div />', {});

	// Add the page to the flipbook
	if (book.turn('addPage', element, page)) {

		// Add the initial HTML
		// It will contain a loader indicator and a gradient
		element.html('<div class="gradient"></div><div class="loader"></div>');
		//--pageMark = 3;
		//---pathImg = ''; //Path
		// Load the page
		loadPage(page, element);
	}
}

function bars(toolbar, navbar) {	
	if(!toolbar)$('.toolbar').hide();
	if(!navbar)$('.navbar-buttons').hide();
}

function loadPage(page, pageElement) {	
	readTextFile(pathImg + 'resources/pagemark.file');
	// Load the page mark
	if(pageMark == page)insetPageMark(pageElement);
	if(es_una_demo)insetDemoWaterMark(pageElement);
	// Load the page	

	// Create an image element
	var img = $('<img />');
	img.mousedown(function(e) {
		e.preventDefault();
	});
	img.css({position: 'absolute'});
	img.load(function() {
		
		// Set the size
		$(this).css({width: '100%', height: '100%'});

		// Add the image to the page after loaded

		$(this).appendTo(pageElement);

		// Remove the loader indicator
		
		pageElement.find('.loader').remove();
	});
	//img.attr('src',pathImg + 'pages/' +  page + '.jpg');
	img.attr('src',pathImg + 'resources/pages/page(' +  page + ').' + extension_imagen);	
	loadRegions(page, pageElement);
	var Actividades = getMediaPage(Number(page));
	for(var a in Actividades){
		if(Actividades[a].Tipo == 'Audio')
			addMediaIcon(Actividades[a].Id, '#magazine-viewport', 0, page, Actividades[a].Track, Actividades[a].NombActividad);
		else if (Actividades[a].Tipo == 'Video') 
			addMediaIcon(Actividades[a].Id, '#magazine-viewport', 1, page, Actividades[a].NombreAct, Actividades[a].Name);	
		else if (Actividades[a].Tipo == 'Juego') 
			addMediaIcon(Actividades[a].Id, '#magazine-viewport', 2, page, Actividades[a].NombreAct, Actividades[a].IdUnidad, Actividades[a].IdActividad, Actividades[a].Titulo);	
		else if (Actividades[a].Tipo == 'Estatico') 
			addMediaIcon(Actividades[a].Id, '#magazine-viewport', 3, page, Actividades[a].NombreAct, Actividades[a].IdUnidad, Actividades[a].IdActividad);
		else if (Actividades[a].Tipo == 'Examen') 
			addMediaIcon(Actividades[a].Id, '#magazine-viewport', 4, page, Actividades[a].Archivo, Actividades[a].NombreAct);	
	}	
}

function insetDemoWaterMark(pageElement) {
	$("#print").hide();
	var waterMark = $('<img />');
	waterMark.mousedown(function(e) {
		e.preventDefault();
	});
	waterMark.css({position: 'absolute'});	
	waterMark.css({zIndex: '1'});
	waterMark.load(function() {		
		// Set the size
		$(this).css({width: '100%', height: '100%'});
		// Add the image to the page after loaded
		$(this).appendTo(pageElement);
		// Remove the loader indicator		
		pageElement.find('.loader').remove();
	});
	waterMark.attr('src','pics/watermark.png');
}

function insetPageMark(pageElement) {
	document.getElementById("tag").disabled = true;
	var separator_book = $('<img />');
	separator_book.mousedown(function(e) {
		e.preventDefault();
	});
	separator_book.css({position: 'absolute'});	
	separator_book.css({zIndex: '1'});
	separator_book.load(function() {		
		// Set the size
		$(this).css({width: '7%', height: '20%'});
		// Add the image to the page after loaded
		$(this).appendTo(pageElement);
		// Remove the loader indicator		
		pageElement.find('.loader').remove();
	});
	separator_book.attr('src','pics/marcador-01.png');
}

function printDocument(page1,page2) {
	//$('#p1').attr('src',pathImg + 'resources/pages/page(' +  page1 + ').' + extension_imagen);
	//$('#p2').attr('src',pathImg + 'resources/pages/page(' +  page2 + ').' + extension_imagen);
	//setTimeout(function(){ printJS('print-form', 'html'); }, 500);	

	printJS(pathImg + 'resources/pages/page(' +  page1 + ').' + extension_imagen, 'image');
	//printJS(pathImg + 'resources/pages/page(' +  page2 + ').' + extension_imagen, 'image');
	

	//var p1 = new ImagePrinter(pathImg + 'resources/pages/page(' +  page1 + ').' + extension_imagen, pathImg + 'resources/pages/page(' +  page2 + ').' + extension_imagen);
	//p1.print();
	




	/*var fs = require('fs'), gm = require('gm');
	var writeStream = fs.createWriteStream('resources/pages.pdf');

	gm().command('convert')
	    .in(pathImg + 'resources/pages/page(' +  page1 + ').' + extension_imagen)
	    .in(pathImg + 'resources/pages/page(' +  page2 + ').' + extension_imagen)
	    .density(150, 150).compress('jpeg')
	    .stream('pdf', function(err, stdout, stderr) {

	    if (!err) {

	        stdout.pipe(writeStream)

	    } else {

	        console.log(err)

	    } 
	})*/

}

// Zoom in / Zoom out

function zoomTo(event) {
		setTimeout(function() {
			if ($('.magazine-viewport').data().regionClicked) {
				$('.magazine-viewport').data().regionClicked = false;
			} else {
				if ($('.magazine-viewport').zoom('value')==1) {
					$('.magazine-viewport').zoom('zoomIn', event);
				} else {
					$('.magazine-viewport').zoom('zoomOut');
				}
			}
		}, 1);

}


function crearArchivoJSON(page, txt, top, left){
	var obj = new Object();
   obj.txt = txt;
   obj.top  = top;
   obj.left = left;
   var jsonString= JSON.stringify(obj);
	var nameFile = "note(" + page;
	require('fs').mkdir(pathImg + 'resources/notes',function(e){
	    if(!e || (e && e.code === 'EEXIST')){
	        //do something with contents
	    } 
	});
	require('fs').writeFile(pathImg + 'resources/notes/'+nameFile+').nt', jsonString, function (err) {
	    if (err) console.log(err);
	});
}

function cargarArchivoJSON(page, txt, top, left){
	console.log('asdasdasdas');
}

function Nota(top, left, id){
	//Make the DIV element draggagle:	
	document.getElementById("delete-note").name = id;
	document.getElementById("accept").name = id;
	dragElement(document.getElementById("div-note"));	
	function dragElement(elmnt) {
		elmnt.style.top = top;
		elmnt.style.left = left;
	  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	  if (document.getElementById("div-note-header")) {
	    /* if present, the header is where you move the DIV from:*/
	    document.getElementById("div-note-header").onmousedown = dragMouseDown;
	  } else {
	    /* otherwise, move the DIV from anywhere inside the DIV:*/
	    elmnt.onmousedown = dragMouseDown;
	  }

	  function dragMouseDown(e) {
	    e = e || window.event;
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
	    /* stop moving when mouse button is released:*/
	    document.onmouseup = null;
	    document.onmousemove = null;
	  }
	}
}

function deleteNote() {
	$('#configDialog').show();
	if ($('#configDialog').hasClass('fade')) $('#configDialog').removeClass('fade');
};	

document.getElementById("dismiss-2").onclick = function () {	
	if ($('#print-dialog').hasClass('fade in'))$('#print-dialog').removeClass('fade in');		
	if (!$('#print-dialog').hasClass('fade')) $('#print-dialog').addClass('fade');
	$('#print-dialog').hide();
};

document.getElementById("dismiss").onclick = function () {	
	if ($('#configDialog').hasClass('fade in'))$('#configDialog').removeClass('fade in');		
	if (!$('#configDialog').hasClass('fade')) $('#configDialog').addClass('fade');
	$('#configDialog').hide();
};	

function acceptDeleteNote(id) {
	document.getElementById("dismiss").click();
	$('#div-note').hide();
	document.getElementById("note-text").value = '';
	//elimiarArchivoJSON(Number($('.magazine').turn("page")) - 1);
	elimiarArchivoJSON(Number(id.name));
};

function elimiarArchivoJSON(page){
	try{
		var nameFile = "note(" + page;
		require('fs').unlinkSync(pathImg + 'resources/notes/'+nameFile+').nt');
	}catch(e){
		//console.log(e);
	}
	/*var gui = require('nw.gui');
	var win = gui.Window.get();
	win.reload();*/
}	

function dragDiv(top, left, element){
	dragElement2(document.getElementById(element), element);
	function dragElement2(elmnt, name) {
		elmnt.style.top = top;
		elmnt.style.left = left;
	  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	  //if (document.getElementById(name+"-header")) {
	    /* if present, the header is where you move the DIV from:*/
	    //document.getElementById(name+"-header").onmousedown = dragMouseDown;
	  //} else {
	    /* otherwise, move the DIV from anywhere inside the DIV:*/
	    elmnt.onmousedown = dragMouseDown;
	  //}
	  function dragMouseDown(e) {
	  	e.stopPropagation();
	    e = e || window.event;
	    // get the mouse cursor position at startup:
	    pos3 = e.clientX;
	    pos4 = e.clientY;
	    document.onmouseup = closeDragElement;
	    // call a function whenever the cursor moves:
	    document.onmousemove = elementDrag;
	  }
	  function elementDrag(e) {
	  	e.stopPropagation();
	    e = e || window.event;
	    // calculate the new cursor position:
	    pos1 = pos3 - e.clientX;
	    pos2 = pos4 - e.clientY;
	    pos3 = e.clientX;
	    pos4 = e.clientY;	    
	    // set the element's new position:
	    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
	    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	    addToJson(elmnt.getAttribute('name'), (elmnt.offsetTop - pos2) + "px" , (elmnt.offsetLeft - pos1) + "px");
	  }
	  function closeDragElement() {
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
	  }
	}
}

function addMediaIcon(id, element, type, page, file){addMediaIcon(id, element, type, page, file, '', '', '');}

function addMediaIcon(id, element, type, page, file, name){addMediaIcon(id, element, type, page, file, '', '', '');}

function addMediaIcon(id, element, type, page, file, name, context, titulo){
	var media = null, 
	header = null, 
	action = null, 
	title = null, 
	ul = getUl(),
	li = null,
	tootip = tooltip( name ,page, file);

	var div_id = 'div-';

	if(type == 0){

		div_id += 'audio-'+ id + '-' + page;

		media = $('<div />', {'id': div_id, 'class': 'sobra div-audio', 'name': id + ',' + page});

		header = $('<div />', {'id': div_id + '-header', 'class': 'div-audio-header'});

		action = $('<a />', {
			'id': 'play-audio', 
			'class': 'btn',
			'data-toggle': 'modal',
			'data-target': '#myModal',
			'data-placement': 'right',
			'title': name
		});

		action.css({'height': '31px', 'width':'31px', 'margin':'8px'})

		//dragDiv("50px", "100px", "view-audio");

		//tootip = tooltip( name ,page, file);

		action.on('click', function () { 
			player(pathImg + "resources/audios/"+file, name);

			//$('#player-audio').show();

			//$('#player-audio').attr("src",pathImg + "resources/audios/"+file+".mp3");

			//$('#player-audio').trigger('play');

		});

		action_icon = $('<span />', {'class': 'glyphicon glyphicon-play'});

		//title = $('<span id="pages-info" class="badge badge-pill badge-default">'+getResourceString('Audio')+' ' + id +'</span>');
		//$(title).appendTo(header);

		/** Icon y button Media */

		li = getLi()

		$(action_icon).appendTo(action);

		$(action).appendTo(li);

		$(li).appendTo(ul);	

		/** Tooltip */

		li = getLi()

		$(tootip).appendTo(li);

		$(li).appendTo(ul);	
		
		$(ul).appendTo(header);	

		//$(title).appendTo(header);
		$(header).appendTo(media);

	}else if(type == 1){
		div_id += 'video-'+ id + '-' + page;

		media = $('<div />', {'id': div_id, 'class': 'sobra div-video', 'name': id + ',' + page});

		header = $('<div />', {'id': div_id+'-header', 'class': 'div-video-header'});

		$(header).appendTo(media);

		action = $('<a />', {
			'id': 'play-audio', 
			'class': 'btn',
			'data-toggle': 'modal',
			'data-target': '#myModal',
			'data-placement': 'right',
			'title': name
		});	

		action.css({'height': '31px', 'width':'31px', 'margin':'8px'})

		action.on('click', function () { 
			//Play video
			$('#div-video-player').show();

			$('#player-video').attr("src",pathImg + "resources/videos/"+file+".mp4");

			$('#player-video').trigger('play');			

			$('#pages-info-video').html(name);

			var div_video_id = 'div-video-player';

			/*Drag & Drop for Panel*/
			dragDiv("50px", "100px",div_video_id);
		});	

		action_icon = $('<span />', {'class': 'glyphicon glyphicon-play'});

		document.getElementById("close-div-video-player").onclick = function () {
			//Stop video if playing
			$('#div-video-player').hide();
			   
			$("#player-video").trigger('pause');

			$("#player-video").prop("currentTime",0);
			   
		}
		//title = $('<span id="pages-info" class="badge badge-pill badge-default">Video</span>');
		//$(title).appendTo(header);
		/** Icon y button Media */

		li = getLi()

		$(action_icon).appendTo(action);

		$(action).appendTo(li);

		$(li).appendTo(ul);	

		/** Tooltip */

		li = getLi()

		$(tootip).appendTo(li);

		$(li).appendTo(ul);	
		
		$(ul).appendTo(header);	

		//$(title).appendTo(header);
		$(header).appendTo(media);

	}else if(type == 2){
		div_id += 'juego-'+ id + '-' + page;

		tootip = tooltip( type ,page, file)

		media = $('<div />', {'id': div_id, 'class': 'sobra div-juego', 'name': id + ',' + page});

		header = $('<div />', {'id': div_id+'-header', 'class': 'div-juego-header'});

		$(header).appendTo(media);

		action = $('<a />', {
			'id': 'play-juego',  
			'class': 'btn',
			'data-toggle': 'modal',
			'data-target': '#myModal',
			'data-placement': 'right', 
			'title': file
		});	

		action.css({'height': '31px', 'width':'31px', 'margin':'8px'})

		action.on('click', function () { 
			//OpenGame(file, pathImg, name, context);
			//Play video
			$('#div-juego-player').show();		

			//$('#pages-info-juego').html(file);
			$('#pages-info-juego').html('Juego / ' + titulo);

			var div_video_id = 'div-juego-player';
			$('#frame-game').attr('src', 'games/'+file+'/index.html?url='+pathImg+"&unidad="+name + "&actividad=" + context);

			/*Drag & Drop for Panel*/
			dragDiv("50px", "100px",div_video_id);

		});	

		document.getElementById("close-div-juego-player").onclick = function () {
			$('#frame-game').attr('src', "");

           	$('#div-juego-player').hide();
		}

		action_icon = $('<span />', {'class': 'glyphicon glyphicon-play'});

		//title = $('<span id="pages-info" class="badge badge-pill badge-default">'+getResourceString('Juego') + ' ' + id +'</span>');
		//$(title).appendTo(header);
		/** Icon y button Media */

		li = getLi()

		$(action_icon).appendTo(action);

		$(action).appendTo(li);

		$(li).appendTo(ul);	

		/** Tooltip */

		li = getLi()

		$(tootip).appendTo(li);

		$(li).appendTo(ul);	
		
		$(ul).appendTo(header);	

		//$(title).appendTo(header);
		$(header).appendTo(media);

	}else if(type == 3){
		div_id += 'pdf-'+ id + '-' + page;

		media = $('<div />', {'id': div_id, 'class': 'sobra div-pdf', 'name': id + ',' + page});

		header = $('<div />', {'id': div_id+'-header', 'class': 'div-pdf-header'});

		$(header).appendTo(media);

		action = $('<a />', {
			'id': 'play-pdf', 
			'class': 'btn',
			'data-toggle': 'modal',
			'data-target': '#myModal',
			'data-placement': 'right',
			'title': file + '.pdf'
		});	

		action.css({'height': '31px', 'width':'31px', 'margin':'8px'})

		action.on('click', function () { 
			//var defaults = "titlebar=yes,titlebar=yes";
			//window.open(pathImg + "resources/pdf/" + file + '.pdf','_blank', defaults);
			OpenPDF(pathImg + "resources/pdf/" + file + '.pdf','_blank');
		});	

		action_icon = $('<span />', {'class': 'glyphicon glyphicon-play'});

		//title = $('<span id="pages-info" class="badge badge-pill badge-default">'+getResourceString('PDF') + ' ' + id +'</span>');
		//$(title).appendTo(header);
		/** Icon y button Media */

		li = getLi()

		$(action_icon).appendTo(action);

		$(action).appendTo(li);

		$(li).appendTo(ul);	

		/** Tooltip */

		li = getLi()

		$(tootip).appendTo(li);

		$(li).appendTo(ul);	
		
		$(ul).appendTo(header);	

		//$(title).appendTo(header);
		$(header).appendTo(media);

	}else if(type == 4){
		div_id += 'examen-'+ id + '-' + page;

		tootip = tooltip( type ,page, name)

		media = $('<div />', {'id': div_id, 'class': 'sobra div-examen', 'name': id + ',' + page});

		header = $('<div />', {'id': div_id+'-header', 'class': 'div-examen-header'});

		$(header).appendTo(media);

		action = $('<a />', {
			'id': 'play-examen',  
			'class': 'btn',
			'data-toggle': 'modal',
			'data-target': '#myModal',
			'data-placement': 'right', 
			'title': name
		});	

		action.css({'height': '31px', 'width':'31px', 'margin':'8px'})

		action.on('click', function () { 
			//OpenGame(file, pathImg, name, context);
			//Play video
			$('#div-examen-player').show();		

			//$('#pages-info-juego').html(file);
			$('#pages-info-examen').html('' + name);

			var div_video_id = 'div-examen-player'; // file
			$('#frame-examen').attr('src', 'examen/index.html?url='+pathImg+"&archivo="+file);

			/*Drag & Drop for Panel*/
			dragDiv("50px", "100px", div_video_id);

		});	

		document.getElementById("close-div-examen-player").onclick = function () {
			$('#frame-examen').attr('src', "");

           	$('#div-examen-player').hide();
		}

		action_icon = $('<span />', {'class': 'glyphicon glyphicon-play'});

		//title = $('<span id="pages-info" class="badge badge-pill badge-default">'+getResourceString('Juego') + ' ' + id +'</span>');
		//$(title).appendTo(header);
		/** Icon y button Media */

		li = getLi()

		$(action_icon).appendTo(action);

		$(action).appendTo(li);

		$(li).appendTo(ul);	

		/** Tooltip */

		li = getLi()

		$(tootip).appendTo(li);

		$(li).appendTo(ul);	
		
		$(ul).appendTo(header);	

		//$(title).appendTo(header);
		$(header).appendTo(media);
	
	}
	if($("#" + div_id).length == 0){
		media.hide();	
		$(media).appendTo(element);
		var obj = getMediaPosition(id, page);
		
		/*Drag & Drop for Icons*/
		if(obj.length == 0){ dragDiv("50px", "500px", div_id);  addToJson(id + ',' + page, "50px", "500px");}
		else dragDiv(obj[0].top, obj[0].left, div_id);
	}
}

function getLi(){
	return $('<li />', {'class': 'nav-item'});
}

function getUl(){
	return $('<ul />', {'class': 'navbar-nav bd-navbar-nav flex-row'});
}

function tooltip(titulo, pagina, file){
	var tootip = $('<div />', 
		{
			'class': 'tooltip-media'  
		});

	tootip.css(
		{
			'height': '75px', 
			'width':'140px',
			'margin-left': '50px',
			'margin-top':'-15px',
			'padding':'9px',
			'border-radius': '15px'
		})
		 
	var conten = "<p id='pages-info' class='text-white ellipsis' style='font-size: 13px;'>" + titulo + "</p>";
	
	conten+="<p id='pages-info' class='text-white ellipsis' style='font-size: 13px;'>" + getResourceString('Página') + ' ' + pagina + "</p> "

	conten+="<p id='pages-info' class='text-white ellipsis' style='font-size: 13px;'>" + file + "</p>"

	tootip.html(conten);

	return tootip;
}

// Load regions

function loadRegions(page, element) {
	/*var reg = $('<canvas/>',{'id': 'paint-canvas'});
	reg.css({background: 'transparent'});
	reg.css({position: 'absolute'});	
	reg.css({zIndex: '1'});
	reg.css({width: '100%', height: '100%'});
	reg.appendTo(element);*/
	/*$.getJSON(pathImg + 'resources/pages/page('+page+').json').
		done(function(data) {

			$.each(data, function(key, region) {
				addRegion(region, element);
			});
		});*/
}

// Add region

function addRegion(region, pageElement) {	
	var reg = $('<div />', {'class': 'region  ' + region['class']}),
		options = $('.magazine').turn('options'),
		pageWidth = options.width/2,
		pageHeight = options.height;

	reg.css({
		top: Math.round(region.y/pageHeight*100)+'%',
		left: Math.round(region.x/pageWidth*100)+'%',
		width: Math.round(region.width/pageWidth*100)+'%',
		height: Math.round(region.height/pageHeight*100)+'%'
	}).attr('region-data', $.param(region.data||''));


	reg.appendTo(pageElement);
}

// Process click on a region

function regionClick(event) {

	var region = $(event.target);

	if (region.hasClass('region')) {

		$('.magazine-viewport').data().regionClicked = true;
		
		setTimeout(function() {
			$('.magazine-viewport').data().regionClicked = false;
		}, 100);
		
		var regionType = $.trim(region.attr('class').replace('region', ''));

		return processRegion(region, regionType);

	}

}

// Process the data of every region

function processRegion(region, regionType) {

	data = decodeParams(region.attr('region-data'));

	switch (regionType) {
		case 'link' :

			window.open(data.url);

		break;
		case 'zoom' :

			var regionOffset = region.offset(),
				viewportOffset = $('.magazine-viewport').offset(),
				pos = {
					x: regionOffset.left-viewportOffset.left,
					y: regionOffset.top-viewportOffset.top
				};

			$('.magazine-viewport').zoom('zoomIn', pos);

		break;
		case 'to-page' :

			$('.magazine').turn('page', data.page);

		break;
	}

}

// Load large page

function loadLargePage(page, pageElement) {
	var img = $('<img />');

	img.load(function() {

		var prevImg = pageElement.find('img');
		$(this).css({position: 'absolute'});
		$(this).css({width: '100%', height: '100%'});
		$(this).appendTo(pageElement);
		prevImg.remove();
		if(pageMark == page)insetPageMark(pageElement);
		if(es_una_demo)insetDemoWaterMark(pageElement);
	});	
	// Loadnew page
	
	//img.attr('src', pathImg + 'pages/' +  page + '-large.jpg');
	img.attr('src', pathImg + 'resources/pages/page(' +  page + ').' + extension_imagen);
}

// Load small page

function loadSmallPage(page, pageElement) {	
	// Load the page mark
	if(pageMark == page)insetPageMark(pageElement);
	if(es_una_demo)insetDemoWaterMark(pageElement);

	var img = pageElement.find('img');
	img.css({position: 'absolute'});
	img.css({width: '100%', height: '100%'});

	img.unbind('load');
	// Loadnew page

	//img.attr('src',pathImg + 'pages/' +  page + '.jpg');
	img.attr('src',pathImg + 'resources/pages/page(' +  page + ').' + extension_imagen);
}

// http://code.google.com/p/chromium/issues/detail?id=128488

function isChrome() {

	return navigator.userAgent.indexOf('Chrome')!=-1;

}

function disableControls(page) {
		if (page==1)
			$('.previous-button').hide();
		else
			$('.previous-button').show();
					
		if (page==$('.magazine').turn('pages'))
			$('.next-button').hide();
		else
			$('.next-button').show();
}

// Set the width and height for the viewport

function resizeViewport() {
	var cut = 150;

	var width = $(window).width(),
		height = $(window).height(),
		options = $('.magazine').turn('options');

	$('.magazine').removeClass('animated');

	$('.magazine-viewport').css({
		width: width,
		height: height
	}).zoom('resize');


	if ($('.magazine').turn('zoom')==1) {
		var bound = calculateBound({
			width: options.width,
			height: options.height,
			boundWidth: Math.min(options.width, width - cut),
			boundHeight: Math.min(options.height, height - cut)
		});

		if (bound.width%2!==0)
			bound.width-=1;

			
		if (bound.width!=$('.magazine').width() || bound.height!=$('.magazine').height()) {

			$('.magazine').turn('size', bound.width, bound.height);

			if ($('.magazine').turn('page')==1)
				$('.magazine').turn('peel', 'br');

			$('.next-button').css({height: bound.height, backgroundPosition: '-38px '+(bound.height/2-32/2)+'px'});
			$('.previous-button').css({height: bound.height, backgroundPosition: '-4px '+(bound.height/2-32/2)+'px'});
		}

		$('.magazine').css({top: -bound.height/2, left: -bound.width/2});
	}

	var magazineOffset = $('.magazine').offset(),
		boundH = height - magazineOffset.top - $('.magazine').height(),
		marginTop = (boundH - $('.thumbnails > div').height()) / 2;

	if (marginTop<0) {
		$('.thumbnails').css({height:1});
	} else {
		$('.thumbnails').css({height: boundH});
		$('.thumbnails > div').css({marginTop: marginTop});
	}

	if (magazineOffset.top<$('.made').height())
		$('.made').hide();
	else
		$('.made').show();

	$('.magazine').addClass('animated');

	refreshCanvas(width,height);
}

function refreshCanvas(width,height) {
	var canvas =  document.getElementById('the-canvas');
	canvas.width = parseInt(width);
	canvas.height = parseInt(height);
	var blank =  document.getElementById('blank');
	blank.width = parseInt(width);
	blank.height = parseInt(height);
	var ctx = canvas.getContext('2d');
	var mouse = {x: 0, y: 0};	 
	canvas.addEventListener('mousemove', function(e) {
		  e.stopPropagation();
		  mouse.x = e.pageX;
		  mouse.y = e.pageY;
		  mouseCursorUpdate(e);
		  /*mouse.x = e.pageX; mouse.y = e.pageY;*/
	}, false);
	ctx.lineWidth = 25;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'rgba(0,0,0,0.05)';
	ctx.data
	ctx.fillStyle = 'rgba(0,0,0,0.05)';
	canvas.addEventListener('mousedown', function(e) {
		ctx.beginPath();
		if(pencil || mark){		    
		    ctx.moveTo(mouse.x, mouse.y);	
		    ctx.globalCompositeOperation='source-over';  
		}else if(eraser){
			ctx.moveTo(mouse.x, mouse.y);
			ctx.globalCompositeOperation = 'destination-out';
		}
		canvas.addEventListener('mousemove', onPaint, false);
	}, false);	
	canvas.addEventListener('mouseup', function() {
	    canvas.removeEventListener('mousemove', onPaint, false);
	}, false);	
	var onPaint = function() {	
		if(pencil){	
			switch(pencil_size){
				case 1:
					ctx.lineWidth = 1;
					break;
				case 2:
					ctx.lineWidth = 5;
					break;
				case 3:
					ctx.lineWidth = 10;
					break;
			}
		   ctx.globalAlpha = 0.1;
		   ctx.strokeStyle = 'rgba('+color_pencil+',255)';
		   ctx.lineTo(mouse.x, mouse.y);

		   ctx.stroke();
		}else if(eraser){
			ctx.lineWidth = 25;
			ctx.globalAlpha = 1;
			ctx.strokeStyle = 'rgba(0,0,0,255)';
		  	ctx.lineTo(mouse.x, mouse.y);
		  	ctx.stroke();
		}else if(mark){
			switch(mark_size){
				case 1:
					ctx.lineWidth = 10;
					break;
				case 2:
					ctx.lineWidth = 15;
					break;
				case 3:
					ctx.lineWidth = 25;
					break;
			}
		   ctx.globalAlpha = 0.1;
		   //ctx.strokeStyle = 'rgba(255, 254, 76, 0.05)';
		   ctx.strokeStyle = 'rgba('+color_pencil+', 0.05)';
		   ctx.lineTo(mouse.x, mouse.y); 
		   ctx.stroke();
		}
	}; 
	/*window.addEventListener("scroll", updatePosition, false);
    window.addEventListener("resize", updatePosition, false);
	var updatePosition = function(){
		canvasPos = getPosition(canvas);
	}*/
}

function mouseCursorUpdate(e){

}

function mouseCursor(){
	
}

// Number of views in a flipbook

function numberOfViews(book) {
	return book.turn('pages') / 2 + 1;
}

// Current view in a flipbook

function getViewNumber(book, page) {
	return parseInt((page || book.turn('page'))/2 + 1, 10);
}

function moveBar(yes) {
	if (Modernizr && Modernizr.csstransforms) {
		$('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000});
	}
}

function setPreview(view) {

	var previewWidth = 112,
		previewHeight = 73,
		previewSrc =pathImg + 'pages/preview.jpg',
		preview = $(_thumbPreview.children(':first')),
		numPages = (view==1 || view==$('#slider').slider('option', 'max')) ? 1 : 2,
		width = (numPages==1) ? previewWidth/2 : previewWidth;

	_thumbPreview.
		addClass('no-transition').
		css({width: width + 15,
			height: previewHeight + 15,
			top: -previewHeight - 30,
			left: ($($('#slider').children(':first')).width() - width - 15)/2
		});

	preview.css({
		width: width,
		height: previewHeight
	});

	if (preview.css('background-image')==='' ||
		preview.css('background-image')=='none') {

		preview.css({backgroundImage: 'url(' + previewSrc + ')'});

		setTimeout(function(){
			_thumbPreview.removeClass('no-transition');
		}, 0);

	}

	preview.css({backgroundPosition:
		'0px -'+((view-1)*previewHeight)+'px'
	});
}

// Width of the flipbook when zoomed in 2214

function largeMagazineWidth() {	
	return 2214;
}

// decode URL Parameters

function decodeParams(data) {

	var parts = data.split('&'), d, obj = {};

	for (var i =0; i<parts.length; i++) {
		d = parts[i].split('=');
		obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
	}

	return obj;
}

// Calculate the width and height of a square within another square

function calculateBound(d) {
	
	var bound = {width: d.width, height: d.height};

	if (bound.width>d.boundWidth || bound.height>d.boundHeight) {
		
		var rel = bound.width/bound.height;

		if (d.boundWidth/rel>d.boundHeight && d.boundHeight*rel<=d.boundWidth) {
			
			bound.width = Math.round(d.boundHeight*rel);
			bound.height = d.boundHeight;

		} else {
			
			bound.width = d.boundWidth;
			bound.height = Math.round(d.boundWidth/rel);
		
		}
	}
	return bound;
}

function addBookSeparator(book) {
	pageMark =  $('.magazine').turn('page');
	if(!(Number(pageMark) % 2)) pageMark = (Number(pageMark)+1);
	if(pageMark > 1){
		if(pageMark==0){
			$('.magazine').turn('removePage', pageMark);
			addPage(pageMark, book);	
		}else{		
			writeTextFile(pathImg + 'resources/pagemark.file','' + pageMark);	
			var gui = require('nw.gui');
			var win = gui.Window.get();
			win.reload();
		}
	}
}

function writeJSON(data) {
	if(!existJSON())writeTextFile(pathImg + 'resources/xml/ActCoords.json',data);	
}

function elimiarJSON(){
	if(existJSON())require('fs').unlinkSync(pathImg + 'resources/xml/ActCoords.json');
	/*var gui = require('nw.gui');
	var win = gui.Window.get();
	win.reload();*/
}

function existJSON(){
	return require('fs').existsSync(pathImg + 'resources/xml/ActCoords.json');
}

function helpInfo(value){
	//document.getElementById("media-tool-tip").innerHTML = value;
}	

function readJSON() {
	if(existJSON())readJSONFile(pathImg + 'resources/xml/ActCoords.json');	
	//readJSONDraws(pathImg + 'resources/xml/CanvasDraws.json');
}

function readXmlFileOk() {
	readXmlFile(pathImg + 'resources/xml/CDInteractive.xml');
}

function goPageBookSeprator() {
	if(pageMark!=0)$('.magazine').turn('page', pageMark);
}


function readTextFile(filepath) {
	var fs = require('fs');
	fs.readFile(filepath, 'utf8', function(err, data) {  
    	if (err) console.log(err);
    	pageMark = data;
	});
}

function writeTextFile(filepath, output) {
	var fs = require('fs');
	fs.writeFile(filepath, output, function(err) {
  		if (err) console.log(err);
	});
}

function playsound() {
    var audio = new Audio('sound/page-flip.mp3');
    audio.play();
}























function ImagePrinter() {
  var i = 0;
  var end = arguments.length;
  
  this.initImages();
  this.initOptions();
  
  while (i < end) {
    this.addImage( arguments[i] );
    i++;
  }
}
ImagePrinter.prototype = {
  
  images : null,
  options : null,
  window : null,
  
  addImage : function(src) {
    return this.images.push(src) - 1;
  },
  
  initImages : function() {
    this.images = [];
  },
  
  initOptions : function() {
    this.options = [
      "width=400",
      "height=400",
      "scrollbars=yes",
      "location=no",
      "toolbar=no"
    ];
  },
  
  closeWindow : function() {
    if (this.window && this.window.close) {
      this.window.close();
      this.window = null;
    }
  },
  
  getImagesSource : function() {
    var i = 0;
    var end = this.images.length;
    var src = "";
    
    while (i < end) {
      src += '<img src="'+this.images[i]+'">';
      i++;
    }
    return src;
  },
  
  getOptions : function() {
    return this.options.join(",");
  },
  
  openWindow : function() {
    if (!this.window) {
      this.window = window.open("", "_blank", this.getOptions() );
    }
    this.window.focus();
  },
  
  print : function() {
    if (this.window) {
      this.closeWindow();
    }
    this.openWindow();
    this.window.document.write( this.getImagesSource() );
    this.window.document.close();
    this.window.onload = function() {
      print();
    };
  }
  
};