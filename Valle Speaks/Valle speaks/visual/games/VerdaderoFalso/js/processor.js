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
			Pregunta.tipo = _estructuraJuego.children[u].getElementsByTagName("contenido")[0].getAttribute("tipo");
			Preguntas.DOM.push(Pregunta);	
		}	
		catch (err)  { console.log(e) }
	}
	console.log(Preguntas.DOM)
	BuiltCards();
}

function BuiltCards(){
	Preguntas.DOM = shuffle(Preguntas.DOM);

	for (i = 0; i < Preguntas.DOM.length; i++) {

		var preg = "";

		preg =
		'<div class="row border-bottom">' + 
			'<div class="col-sm-8 col-md-8 col-lg-8 col-xl-8" >' + 
				'<p class="text-justify h4">'+Preguntas.DOM[i].contenido+'</p>' +
			'</div>' + 	
			'<div class="col-sm-4 col-md-4 col-lg-4 col-xl-4" >' + 		
				'<span class="switch engine-switch-'+i+'">' + 	
					'<input type="checkbox" apex="'+Preguntas.DOM[i].tipo+'" class="switch reciver" id="switch-'+i+'" />' + 	
					'<label id="label-switch-'+i+'" for="switch-'+i+'" class="h4">Falso</label>' + 
				'</span>' +	
			'</div>' + 	
		'</div>';
		
		var meaning = $(preg);
		$(meaning).appendTo($('#preguntas'));
	}

	$('.switch').on('click', function() {
		if( $(this).is(':checked') ){
			$('#label-' + $(this)[0].id).html('Verdadero');
		} 
		else{
			$('#label-' + $(this)[0].id).html('Falso');
		}
	});

}

/*
* Called when an answer validation is correct
*/
function truef(){
	var respuestas = document.querySelectorAll('.reciver');
	if(!continueNav)
	{
		good = 0;
		if(respuestas){
			[].forEach.call(respuestas, function(col) {
				var result = col.getAttribute("apex") === "verdadero" ? true : false;
				if(result == col.checked){
					good +=1
					if($('.engine-' + col.id).hasClass('bad'))
						$('.engine-' + col.id).removeClass("bad");
					$('.engine-' + col.id).addClass("good");
				}
				else{
					if($('.engine-' + col.id).hasClass('good'))
						$('.engine-' + col.id).removeClass("good");
					$('.engine-' + col.id).addClass("bad");
				}
			});

			if(good == respuestas.length){
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
	}
	else
	{
		$('#view-engine-game').hide();

		$('#game-time').html(getTime());
		$('#game-score').html('' + (good * 91));
		$('#game-result').html(good + '/' + respuestas.length);

		$('#view-engine-record').show();
	}
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

function getDictionary(index) {	
	return Respuestas.TON.filter(function (obj) { return obj.index == index });;
}

$(function Controller(){
	readXmlFileOk();

})