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
var compare =  new Array(2);

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
			Pregunta.respuesta = new Array();
			
			var elem = _estructuraJuego.children[u].getElementsByTagName("respuesta");
			for(j=0; j<elem.length;j++){
				Pregunta.respuesta.push({
					texto: elem[j].textContent,
					img: elem[j].getAttribute("img"),
				});	
				Pregunta.respuesta.push({
					texto: elem[j].textContent,
					img: elem[j].getAttribute("img"),
				});		
			}

			Preguntas.DOM.push(Pregunta);	
		}	
		catch (err)  { console.log(e) }
	}
	BuiltCards();
}

function BuiltCards(){
	Preguntas.DOM = shuffle(Preguntas.DOM);
	getNext()
}

function getNext(){
	try{
		var preg = '';

		Preguntas.DOM[0].respuesta = shuffle(Preguntas.DOM[0].respuesta);

		for(i = 0; i < Preguntas.DOM[0].respuesta.length; i+=4)
		{
			preg += '<div class="card-deck">'
			try
			{
				preg += newCard(i, Preguntas.DOM[0].respuesta[i].img, Preguntas.DOM[0].respuesta[i].texto)	
				preg += newCard(i + 1, Preguntas.DOM[0].respuesta[i + 1].img, Preguntas.DOM[0].respuesta[i + 1].texto)	
				preg += newCard(i + 2, Preguntas.DOM[0].respuesta[i + 2].img, Preguntas.DOM[0].respuesta[i + 2].texto)	
				preg += newCard(i + 3, Preguntas.DOM[0].respuesta[i + 3].img, Preguntas.DOM[0].respuesta[i + 3].texto)	
			}
			catch(e){}
			preg += '</div>';
		}

		var meaning = $(preg);
		$(meaning).appendTo($('#preguntas'));

		$('.card').on('click', function() {
			var anomena = this.getAttribute('anomena');
			var innerHTML = $(this).html();
			var index = this.getAttribute('index');
			var img = Preguntas.DOM[0].respuesta[index].img;
			//$(this).html('<img class="img-thumbnail" src="'+ header.url +'resources/images/'+img+'" alt="slide">');
			$(this).html('<img class="img-thumbnail" src="./img/cover-img-2.png" alt="slide">');
			if(compare[0] == null){
				compare[0] = {
					id: index,
					text: anomena,
					content: innerHTML,
					img: img
				}
			}
			else{
				compare[1] = {
					id: index,
					text: anomena,
					content: innerHTML,
					img: img
				}
				$('#aws-rp-' + compare[0].id).html('<img class="img-thumbnail" src="'+ header.url +'resources/images/'+ compare[0].img +'" alt="slide">')	
				$('#aws-rp-' + compare[1].id).html('<img class="img-thumbnail" src="'+ header.url +'resources/images/'+ compare[1].img +'" alt="slide">')	

				if(compare[0].text != compare[1].text || compare[0].id == compare[1].id)
				{	
					// TODO Colocar un timer
					Mal()	
					setTimeout(function(){
						$('#aws-rp-' + compare[0].id).html('' + compare[0].content)	
						if(compare[0].id != compare[1].id)
							$('#aws-rp-' + compare[1].id).html('' + compare[1].content)		

						Normal()
					}, 1000)
				}
				else
				{
					// TODO Colocar un timer
					Bien()

					setTimeout(function(){
						Normal()
					}, 1000)

					indexer++;
					if( (indexer * 2) == Preguntas.DOM[0].respuesta.length){			
						setTimeout(function(){
							$('#view-engine-game').hide();
							$('#game-time').html(getTime());
							$('#game-score').html('' + (indexer * 91));
							$('#game-result').html(indexer + '/' + (Preguntas.DOM[0].respuesta.length) / 2);
							$('#view-engine-record').show();
						}, 2000)								
					}
				}
			}
		});
			
		//var p = Preguntas.DOM[indexer];
		//$('#pregunta').html(p.contenido);		
		//updateBar();
		//indexer++;			
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

function newCard(i, img, texto){
	try //+ header.url +'resources/images/'+img+
	{
		return (img ? 
			'<div class="card radio-option bounceIn" index="'+i+'" anomena="'+texto+'" id="aws-rp-'+ i +'">' + 
				'<figure class="imghvr-fold-up" style="cursor: pointer;">' + 
					'<img class="img-thumbnail" src="./img/cover-img.png" alt="slide">' + 
					'<figcaption>' +
						'<img class="img-thumbnail" src="./img/cover-img.png" alt="slide">' + 
					'</figcaption>' +
				'</figure>' + 
			'</div>':
		'')
	}
	catch(e)
	{
		console.log(e.stack);
		return "";
	}
}

function Bien(){
	if($('#btnEvaluar').hasClass('btn-primary-red'))
		$('#btnEvaluar').removeClass('btn-primary-red')
	if($('#bottom-navbar').hasClass('navbar-red'))
		$('#bottom-navbar').removeClass("navbar-red");		
	if($('#bottom-navbar-icon').hasClass('navbar-bad'))
		$('#bottom-navbar-icon').removeClass("navbar-bad");
	if($('#bottom-navbar-icon').hasClass('icons-bad'))
		$('#bottom-navbar-icon').removeClass("icons-bad");

	$('#bottom-navbar').addClass("navbar-green"); 
	$('#btnEvaluar').addClass("btn-primary-green");
	$('#bottom-navbar-icon').addClass("icons-good");
	$('#bottom-navbar-text').html("Muy bien encontraste las imagenes.");
}

function Mal(){
	if($('#btnEvaluar').hasClass('btn-primary-green'))
		$('#btnEvaluar').removeClass('btn-primary-green')
	if($('#bottom-navbar').hasClass('navbar-green'))
		$('#bottom-navbar').removeClass("navbar-green");	
	if($('#bottom-navbar-icon').hasClass('navbar-good'))
		$('#bottom-navbar-icon').removeClass("navbar-good");	
	if($('#bottom-navbar-icon').hasClass('icons-good'))
		$('#bottom-navbar-icon').removeClass("icons-good");

	$('#bottom-navbar').addClass("navbar-red");		
	$('#btnEvaluar').addClass("btn-primary-red");
	$('#bottom-navbar-icon').addClass("icons-bad");
	$('#bottom-navbar-text').html(MsgMal);
}

function Normal(){
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

	$('#bottom-navbar-text').html("Encuentra las parejas de imagenes.");

	compare[0] = null;
	compare[1] = null;
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