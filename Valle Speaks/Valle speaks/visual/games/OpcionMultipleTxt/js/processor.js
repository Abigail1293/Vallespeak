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
var currentAnswer = "";
var selected = "";
var endGame = false;
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
			Pregunta.correcta = "";
			Pregunta.respuesta = new Array();			

			var elem = _estructuraJuego.children[u].getElementsByTagName("respuesta");
			for(j=0; j<elem.length;j++){
				if(elem[j].getAttribute("correcta"))
				{
					Pregunta.respuesta.push({
						texto: elem[j].textContent,
						correcta: true
					});
					Pregunta.correcta = elem[j].textContent;
				}
				else
				{
					Pregunta.respuesta.push({
						texto: elem[j].textContent
					});
				}					
			}

			Preguntas.DOM.push(Pregunta);	
		}	
		catch (err)  { console.log(e) }
	}
	console.log(Preguntas.DOM)
	BuiltCards();
}

function BuiltCards(){
	Preguntas.DOM = shuffle(Preguntas.DOM);
	getNext()
}

/*
* Called when an answer validation is correct
*/
function truef(){
if(endGame){
	$('#view-engine-game').hide();

	$('#game-time').html(getTime());
	$('#game-score').html('' + (good * 91));
	$('#game-result').html(good + '/' + Preguntas.DOM.length);

	$('#view-engine-record').show();
}	
else
{
if(currentAnswer != ""){	
	if(!continueNav)
	{
		if(currentAnswer == Preguntas.DOM[indexer - 1].correcta){
			if($(selected).hasClass('radio-option'))
				$(selected).removeClass('radio-option')
			if($(selected).hasClass('radio-option-selected'))
				$(selected).removeClass('radio-option-selected')
			$(selected).addClass('radio-option-good');

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
			good++;
		}
		else{
			if($(selected).hasClass('radio-option'))
				$(selected).removeClass('radio-option')
			if($(selected).hasClass('radio-option-selected'))
				$(selected).removeClass('radio-option-selected')
			$(selected).addClass('radio-option-bad');

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
		$('#btnEvaluar').html("<h4><strong>Vale</strong></h4>");
		continueNav = true;
	}
	else
	{
		if($('#btnEvaluar').hasClass('btn-primary-green'))
			$('#btnEvaluar').removeClass('btn-primary-green')
		if($('#bottom-navbar').hasClass('navbar-green'))
			$('#bottom-navbar').removeClass("navbar-green");
		if($('#bottom-navbar-icon').hasClass('navbar-good'))
			$('#bottom-navbar-icon').removeClass("navbar-good");
		if($('#bottom-navbar-icon').hasClass('icons-good'))
			$('#bottom-navbar-icon').removeClass("icons-good");		

		if($('#btnEvaluar').hasClass('btn-primary-red'))
			$('#btnEvaluar').removeClass('btn-primary-red')
		if($('#bottom-navbar').hasClass('navbar-red'))
			$('#bottom-navbar').removeClass("navbar-red");				
		if($('#bottom-navbar-icon').hasClass('navbar-bad'))
			$('#bottom-navbar-icon').removeClass("navbar-bad");	
		if($('#bottom-navbar-icon').hasClass('icons-bad'))
			$('#bottom-navbar-icon').removeClass("icons-bad");

		$('#bottom-navbar').addClass("navbar");		
		$('#btnEvaluar').addClass("btn-primary");
		$('#bottom-navbar-icon').addClass("icons-info");
		$('#bottom-navbar-text').html("Selecciona cuidadosamente cada respuesta.");
		$('#preguntas').html("");
		currentAnswer = "";
		getNext();
	}
}
else{
	$('#bottom-navbar-text').html("Selecciona una respuesta.");
}
}
	/*
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
				$('#bottom-navbar-text').html("¡Oh, Oh! Puedes mejorar.");
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
	*/
}

function getNext(){
	try{
		var preg = "";

		Preguntas.DOM[indexer].respuesta.forEach(function(e,i){
			preg =
			'<div class="radio-option bounceIn custom-control custom-radio mb-3" id="aws-rp-'+ i +'">' + 
				'<input class="radio custom-control-input" type="radio" name="respuesta" id="rp-'+ i +'" value="'+e.texto +'">' + 
				'<label class="custom-control-label ml-1 label-item" for="rp-'+ i +'"><h3 class="ml-2">'+e.texto +'</h3></label>' +
			'</div>';

			var meaning = $(preg);
			$(meaning).appendTo($('#preguntas'));
		});

		$('.radio').on('click', function() {
			if($('.custom-radio').hasClass('radio-option-selected'))
				$('.custom-radio').removeClass('radio-option-selected')
			$('.custom-radio').addClass('radio-option');

			selected = '#aws-' + $(this)[0].id;
			if( $(this).is(':checked') ){				
				if($(selected).hasClass('radio-option'))
					$(selected).removeClass('radio-option')
				$(selected).addClass('radio-option-selected');
				currentAnswer = $(this).val();
			} 
		});
			
		var p = Preguntas.DOM[indexer];
		$('#pregunta').html(p.contenido);		
		updateBar();
		indexer++;			
		continueNav = false;
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
		$('#bottom-navbar-text').html("¡Excelente! Lo has terminado.");

		$('#btnEvaluar').html("<h4><strong>Continuar</strong></h4>");
		$('#pregunta').html("Haz respondido todas las preguntas.");
		updateBar();
		indexer++;		
		endGame = true;
	}		
}

function updateBar(){
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