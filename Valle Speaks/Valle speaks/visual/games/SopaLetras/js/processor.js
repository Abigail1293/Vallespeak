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
			Pregunta.respuesta = _estructuraJuego.children[u].getElementsByTagName("respuesta")[0].textContent.replace(/\s/g, '');
			Preguntas.DOM.push(Pregunta);	
		}	
		catch (err)  { console.log(err); }
	}
	Preguntas.DOM = shuffle(Preguntas.DOM);
	getNext();
	OnLoadPuzzle(getListWords(Preguntas.DOM));
}

/*
* Called when an answer validation is correct
*/
function truef(){
	
	var respuestas = document.querySelectorAll('.drag-reciver');
	if(!continueNav)
	{
		good = 0;

		if(good == Preguntas.DOM.length){
			if($('#btnEvaluar').hasClass('btn-primary-red'))
				$('#btnEvaluar').removeClass('btn-primary-red')

			if($('#bottom-navbar').hasClass('navbar-red'))
				$('#bottom-navbar').removeClass("navbar-red");
				
			if($('#bottom-navbar-icon').hasClass('navbar-bad'))
				$('#bottom-navbar-icon').removeClass("navbar-bad");
			
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
			
			$('#bottom-navbar').addClass("navbar-red");		
			$('#btnEvaluar').addClass("btn-primary-red");
			$('#bottom-navbar-icon').addClass("icons-bad");
			$('#bottom-navbar-text').html(MsgMal);
		}

		$('#btnEvaluar').html("<h4><strong>Continuar</strong></h4>");
		continueNav = true;
	}
	else{
		$('#view-engine-game').hide();

		$('#game-time').html(getTime());
		$('#game-score').html('' + (good * 91));
		$('#game-result').html(good + '/' + Preguntas.DOM.length);

		$('#view-engine-record').show();
	}
	//SideHomeToEndState(); 
}

function stateController(state){
	ShowIcon(state); 	
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

function getListWords(list){
	var itm = new Array();
	for (var i = list.length - 1; i >= 0; i--) 
		itm.push(list[i].respuesta);
	return itm;
}

function getWord(){
	return Preguntas.DOM[indexer-1].respuesta;
}

function getNext(){
	try{
		var p = Preguntas.DOM[indexer];
		$('#pregunta').html(p.contenido);
		indexer++;	
		good = indexer;
		console.log(good)
	}catch(e){
		
		if($('#btnEvaluar').hasClass('btn-primary-red'))
			$('#btnEvaluar').removeClass('btn-primary-red')

		if($('#bottom-navbar').hasClass('navbar-red'))
			$('#bottom-navbar').removeClass("navbar-red");
			
		if($('#bottom-navbar-icon').hasClass('navbar-bad'))
			$('#bottom-navbar-icon').removeClass("navbar-bad");
		
		$('#bottom-navbar').addClass("navbar-green");
		$('#btnEvaluar').addClass("btn-primary-green");
		$('#bottom-navbar-icon').addClass("icons-good");
		$('#bottom-navbar-text').html("¡Excelente! Lo has logrado.");

		$('#btnEvaluar').html("<h4><strong>Continuar</strong></h4>");
		continueNav = true;

	}		
}

function getDictionary(index) {	
	return Respuestas.TON.filter(function (obj) { return obj.index == index });;
}

$(function Controller(){
	readXmlFileOk();

})