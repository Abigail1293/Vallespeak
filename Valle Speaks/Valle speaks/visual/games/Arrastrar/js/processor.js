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
			Pregunta.img = _estructuraJuego.children[u].getElementsByTagName("img")[0].textContent;	
			Pregunta.correcta = "";
			Pregunta.respuesta = new Array();			
			if(_estructuraJuego.children[u].getElementsByTagName("respuesta").length == 1){
				Pregunta.respuesta.push({
					texto: _estructuraJuego.children[u].getElementsByTagName("respuesta")[0].textContent, 
					correcta: true
				});
				Pregunta.correcta = _estructuraJuego.children[u].getElementsByTagName("respuesta")[0].textContent;
			}			
			else
			{
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
			}
			//Pregunta.respuesta = _estructuraJuego.children[u].getElementsByTagName("contenido")[0].textContent.match(/(\[)(.*?)(\])/g);
			Preguntas.DOM.push(Pregunta);	
		}	
		catch (err)  { console.log(err, err.stack) }
	}
	BuiltCards();
}

function BuiltCards(){
	Preguntas.DOM = shuffle(Preguntas.DOM);
	var w = copyr(Preguntas.DOM);
	w = shuffle(w);
	var resp = "";

	var respArray = [].concat.apply([], w.map(function(e,i){
		return e.respuesta.map(function(e){return e})
	}))
	
	shuffle(respArray).forEach(function(e, index){	
		resp+="<div class='d-inline-block'><h3><span id='word-"+(index + 1)+"' draggable='true' class='drag-markup move badge badge-normal rounded px-2 my-1 mx-1'>"+e.texto+"</span></h3></div>"
	});	
	
	var concept = $(resp);
	
	$(concept).appendTo($('#respuestas'));

	var active = true;

	for (i = 0; i < Preguntas.DOM.length; i++) {

		var imagen = 
		'<div class="carousel-item '+(active? 'active':'')+'">' + 
			'<div class="card border-0">' + 
				'<img class="d-block w-100" src="'+ header.url +'resources/images/'+Preguntas.DOM[i].img+'" alt="slide">' + 
				'<div class="card-body theme">' + 
					'<center><h3><a apex="'+Preguntas.DOM[i].correcta+'" class="badge badge-normal drag-reciver pointer">_____________________________</a></h3></center>' + 
				'</div>' +
			'</div>' +
		'</div>';
		
		var index = '<li data-target="#carouselExampleIndicators" data-slide-to="'+i+'" class="'+(active? 'active':'')+'"></li>';

		$(imagen).appendTo($('#imagenes'));

		$(index).appendTo($('#imagenes-index'));

		active = false;
	
	}
/*
	for (i = 0; i < Preguntas.DOM.length; i++) {

		//var respuesta = Preguntas.DOM[i].contenido.match(/(\[)(.*?)(\])/g);
		var allTextParsed = w[i].contenido.split(/(\[)(.*?)(\])/g);

		var preg = "<form class='form-inline border-bottom transition-all'>&nbsp;&nbsp;", addBreak = false;
	
		var enumerator = true;	
		allTextParsed.forEach(function(e,index){
			if(addBreak){
				preg+= (enumerator ? ("<h6>" + (i+1) + '.- </h6>'): '') + "<div class='form-group mb-1 pr-1'><h3><a apex='"+e+"' class='badge badge-normal drag-reciver pointer'>___________</a></h3></div>";	
				addBreak = false;
				enumerator = false;
			}		
			else{ 
				if(e!='[' && e !=']'){
					preg+="<div class='form-group pr-1'><h6><p class='text-justify'>" + (enumerator ? ((i+1) + '.-  '): '') + e + "</p></h6></div>";
					enumerator = false;
				}
			}

			if(e=='[')
				addBreak = true;
			else if(e==']')
				addBreak = false;		
		});
		preg+="</form>";
		var meaning = $(preg);
		$(meaning).appendTo($('#preguntas'));
	}
*/
	addDragDropBehaviour(function(){
		$('.carousel').carousel('next')
	});
	
	
	//$('#state-progress').text(good + "/" + Preguntas.DOM.length);
}

/*
* Called when an answer validation is correct
*/
function truef(){
	
	var respuestas = document.querySelectorAll('.drag-reciver');
	if(!continueNav)
	{
		good = 0;
		if(respuestas){
			[].forEach.call(respuestas, function(col) {
				if(col.getAttribute("apex") === col.innerHTML){
					good +=1
					if(col.classList.contains('badge-normal'))
						col.classList.remove("badge-normal");
					if(col.classList.contains('badge-danger'))
						col.classList.remove("badge-danger");
					col.classList.add("badge-forest");
				}
				else{
					if(col.classList.contains('badge-normal'))
						col.classList.remove("badge-normal");
					if(col.classList.contains('badge-forest'))
						col.classList.remove("badge-forest");
					col.classList.add("badge-danger");
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
	else{
		$('#view-engine-game').hide();

		$('#game-time').html(getTime());
		$('#game-score').html('' + (good * 91));
		$('#game-result').html(good + '/' + respuestas.length);

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

function getDictionary(index) {	
	return Respuestas.TON.filter(function (obj) { return obj.index == index });;
}

$(function Controller(){
	readXmlFileOk();

})