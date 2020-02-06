var reload;
var MsgMal;
var Pregunta = {
	numero: 0,
	contenido: "",
	respuesta: ""
}

var Preguntas = {
	DOM: new Array()
}

var Respuesta = {
	index: 0
}

var Respuestas = {
	TON: new Array()
}

var good = 0;
var indexer = 0;
var score_p = 0;
var continueNav = false;
var audio = $('#audio')
var audioElement = document.createElement('audio');
var progressed = 0;

function Load(){
	LoadDataAsset(CDInteractive.Unidades[header.unidad].Actividades[header.actividad].EstructuraJuego);
	if(CDInteractive.Unidades[header.unidad].Actividades[header.actividad].MsgMal != '')
		MsgMal = CDInteractive.Unidades[header.unidad].Actividades[header.actividad].MsgMal;
	else MsgMal = '¡Oh, Oh! Puedes mejorar.';
}

function readXmlFileOk() {
	readXmlFile(header.url + 'resources/xml/CDInteractive.xml', Load);
}

function LoadDataAsset(_estructuraJuego){
	Preguntas.DOM =  new Array();
	Respuestas.TON =  new Array();
	for (u = 0; u < _estructuraJuego.children.length; u++) {
		try
		{
			Pregunta = new Object();
			Pregunta.numero = u;	
			Pregunta.contenido = _estructuraJuego.children[u].getElementsByTagName("contenido")[0].textContent;				
			Pregunta.respuesta = _estructuraJuego.children[u].getElementsByTagName("contenido")[0].textContent.split(" ");
			Pregunta.audio = _estructuraJuego.children[u].getElementsByTagName("audio")[0].textContent;			
			Preguntas.DOM.push(Pregunta);	
		}	
		catch (err)  { console.log(e) }
	}
	BuiltCards();
}

function BuiltCards(){
	Preguntas.DOM = shuffle(Preguntas.DOM);
	siguiente()
	audio.click(function(){		
		if (audioElement.duration > 0 && !audioElement.paused) {
			if($(this).hasClass('audio-icon-active'))
				$(this).removeClass('audio-icon-active');
			audioElement.currentTime = 0;
			audioElement.pause();
		} else {
			$(this).addClass('audio-icon-active');
			audioElement.play();		
		}
	});
}

/*
* Called when an answer validation is correct
*/
function truef(){
	if(indexer == Preguntas.DOM.length){
		$('#view-engine-game').hide();

		$('#game-time').html(getTime());
		$('#game-score').html('' + (good * 91));
		$('#game-result').html(good + '/' + Preguntas.DOM.length);

		$('#view-engine-record').show();
	}
	else
	{
		if(!continueNav)
		{
			var text = ""
			for(i=0; i < $('.word-order').length; i++)
				text += $($('.word-order')[i]).html();
			
			var sameText = Preguntas.DOM[indexer].contenido.replace(/\s/g,'');
			var respuestas = document.querySelectorAll('.drag-reciver');

			if(text == sameText)
			{
				good +=1;
				if($('#btnEvaluar').hasClass('btn-primary-red'))
					$('#btnEvaluar').removeClass('btn-primary-red')

				if($('#bottom-navbar').hasClass('navbar-red'))
					$('#bottom-navbar').removeClass("navbar-red");
					
				if($('#bottom-navbar-icon').hasClass('navbar-bad'))
					$('#bottom-navbar-icon').removeClass("navbar-bad");

				
				
				if($('.word-order').hasClass('badge-normal'))
					$('.word-order').removeClass("badge-normal");
				if($('.word-order').hasClass('badge-danger'))
					$('.word-order').removeClass("badge-danger");
				$('.word-order').addClass("badge-forest");

				if(respuestas)
					[].forEach.call(respuestas, function(col) {
						if(col.classList.contains('badge-normal'))
							col.classList.remove("badge-normal");
						if(col.classList.contains('badge-danger'))
							col.classList.remove("badge-danger");
						col.classList.add("badge-forest");	
					});	


				
				$('#bottom-navbar').addClass("navbar-green");
				$('#btnEvaluar').addClass("btn-primary-green");
				$('#bottom-navbar-icon').addClass("icons-good");
				$('#bottom-navbar-text').html("¡Excelente! Lo has logrado.");
			}
			else
			{
				if($('#btnEvaluar').hasClass('btn-primary-green'))
					$('#btnEvaluar').removeClass('btn-primary-green')

				if($('#bottom-navbar').hasClass('navbar-green'))
					$('#bottom-navbar').removeClass("navbar-green");	

				if($('#bottom-navbar-icon').hasClass('navbar-good'))
					$('#bottom-navbar-icon').removeClass("navbar-good");	


				if($('.word-order').hasClass('badge-normal'))
					$('.word-order').removeClass("badge-normal");
				if($('.word-order').hasClass('badge-forest'))
					$('.word-order').removeClass("badge-forest");
				$('.word-order').addClass("badge-danger");


				if(respuestas)
					[].forEach.call(respuestas, function(col) {
						if(col.classList.contains('badge-normal'))
							col.classList.remove("badge-normal");
						if(col.classList.contains('badge-forest'))
							col.classList.remove("badge-forest");
						col.classList.add("badge-danger");
					});	
				

				
				$('#bottom-navbar').addClass("navbar-red");		
				$('#btnEvaluar').addClass("btn-primary-red");
				$('#bottom-navbar-icon').addClass("icons-bad");
				$('#bottom-navbar-text').html(MsgMal);
			}

			$('#btnEvaluar').html("<h4><strong>Continuar</strong></h4>");
			indexer++;
			continueNav = true;
		}
		else
		{
			if($('#btnEvaluar').hasClass('btn-primary-red'))
				$('#btnEvaluar').removeClass('btn-primary-red')
			if($('#bottom-navbar').hasClass('navbar-red'))
				$('#bottom-navbar').removeClass("navbar-red");			
			if($('#bottom-navbar-icon').hasClass('navbar-bad'))
				$('#bottom-navbar-icon').removeClass("navbar-bad");
			if($('#bottom-navbar-icon').hasClass('icons-bad'))
				$('#bottom-navbar-icon').removeClass("icons-bad");

			if($('#btnEvaluar').hasClass('btn-primary-green'))
				$('#btnEvaluar').removeClass('btn-primary-green')
			if($('#bottom-navbar').hasClass('navbar-green'))
				$('#bottom-navbar').removeClass("navbar-green");
			if($('#bottom-navbar-icon').hasClass('navbar-good'))
				$('#bottom-navbar-icon').removeClass("navbar-good");
			if($('#bottom-navbar-icon').hasClass('icons-good'))
				$('#bottom-navbar-icon').removeClass("icons-good");

			if($('.word-order').hasClass('badge-normal'))
				$('.word-order').removeClass("badge-normal");
			if($('.word-order').hasClass('badge-forest'))
				$('.word-order').removeClass("badge-forest");
			if($('.word-order').hasClass('badge-danger'))
				$('.word-order').removeClass("badge-danger");

					if($('.drag-reciver').hasClass('badge-danger'))
						$('.drag-reciver').removeClass("badge-danger");
					if($('.drag-reciver').hasClass('badge-forest'))
						$('.drag-reciver').removeClass("badge-forest");
					$('.drag-reciver').addClass("badge-normal");

			$('#bottom-navbar-text').html("Escucha y ordena correctamente.");
				
			$('#preguntas').empty()
			$('#respuestas').empty();
			$('#btnEvaluar').html("<h4><strong>Evaluar</strong></h4>");
			updateProgress()
			siguiente()
			continueNav = false;
		}
	}

	//SideHomeToEndState(); 
}

function siguiente(){	

	var resp = "";
	Preguntas.DOM[indexer].respuesta = shuffle(Preguntas.DOM[indexer].respuesta)

	Preguntas.DOM[indexer].respuesta.forEach(function(e, index){	
		resp+="<div class='d-inline-block'><h3><span id='word-"+(index + 1)+"' draggable='true' class='drag-markup move badge badge-normal rounded px-2 my-1 mx-1'>"+e+"</span></h3></div>"
	});	

	if(audioElement != null){
		if (!audioElement.paused) {
			audio.click()
		}
	}
	

	audioElement.setAttribute('src', header.url +'resources/audios/' + Preguntas.DOM[indexer].audio);

	
	
	var concept = $(resp);	
	
	$(concept).appendTo($('#respuestas'));

	addDragDropBehaviour();	
	
	//$('#state-progress').text(good + "/" + Preguntas.DOM.length);
}

function stateController(state){
	ShowIcon(state); 	
}

function updateProgress(){
	var ind = indexer;
	var interval = setInterval(function() {
		
		$("#progressbar")
	
		.css("width", progressed + "%")
	
		.attr("aria-valuenow", progressed)
	
		.text(progressed + "%");

	   
	
		if (progressed == ((ind * 100) / Preguntas.DOM.length)){

			progressed = ((ind * 100) / Preguntas.DOM.length)
			clearInterval(interval);				
		}
		else{
			progressed += 1;
		}

	}, 50);
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function copyr(a){
	var reply = new Array()
	for(j = 0; j < a.length; j++)
		reply.push(a[j]);
	return reply;
}

/*
* It returns a string with good and bad answers like this -> {00-00}
*/
function getResult(){
	return good + "-" + (Preguntas.DOM.length - good);
}

function getDictionary(index) {	
	return Respuestas.TON.filter(function (obj) { return obj.index == index });;
}

$(function Controller(){
	readXmlFileOk();

})