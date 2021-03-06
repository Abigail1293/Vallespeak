
var fs = require('fs');
var Actividad = {
	Id: 0,
	IdUnidad: 0,
	IdActividad: 0,
	Pagina: 0,
	NombActividad: "",
	Tipo: "",
	Track:"",
	NombreAct: "",
	Titulo: "",
	Name: "",
	Instruccion: "",
	Archivo: "",
	EstructuraJuego: new Array()
}

var Unidad = {
	Id: 0,
	Actividades : new Array(),
	ActividadRetroalimentacion: ""
}

var CDInteractive = {
	Nombre: "",
	NumPagesPDF: 0,
	ISBN: "",
	Autor:"",
	PDF: new Array(),
	Unidades: new Array()
}

var Coord = {
	id: 0,
	page: '',
	top: '',
	left: ''
}

var ActCoords = {
	Coords : new Array()
}

var Draw = {
	page : 0,
	data : ''
}

var CanvasDraws = {
	Draws : new Array()
}

function xmlDocParser(text) {	
	parser = new DOMParser();
	xmlDoc = parser.parseFromString(text,"text/xml");
	xml2Object(xmlDoc);
}

function readXmlFile(filepath) {		
	//readFile 				readFileSync
	fs.readFile(filepath, 'utf8', function(err, data) {  
		if (err) console.log(err);
		if(data)
			xmlDocParser(data);
	});
}

function readJSONFile(filepath) {
	ActCoords.Coords = new Array();	
	/*$.ajax({ 
	    url: filepath, 
	    dataType: 'json', 
	    async: false, 
	    success: function(result){
	        $.each(result, function(pos, data){        	
	            Coord = new Object();
	            Coord.id = data.id;
				Coord.page = data.page;
				Coord.top = data.top;
				Coord.left = data.left;
				console.log(Coord);
				ActCoords.Coords.push(Coord);
	        });
	    }
   	});*/
	$.each(JSON.parse(fs.readFileSync(filepath, 'utf8')), function(pos, data){        	
	            Coord = new Object();
	            Coord.id = data.id;
				Coord.page = data.page;
				Coord.top = data.top;
				Coord.left = data.left;
				ActCoords.Coords.push(Coord);
	        });

	/*$.getJSON(filepath, function(result){
        $.each(result, function(pos, data){        	
            Coord = new Object();
            Coord.id = data.id;
			Coord.page = data.page;
			Coord.top = data.top;
			Coord.left = data.left;
			ActCoords.Coords.push(Coord);
        });
    }); */
}

function readJSONDraws(filepath) {
	CanvasDraws.Draws = new Array();	
	$.getJSON(filepath, function(result){
        $.each(result, function(pos, data){        	
            Draw = new Object();
			Draw.page = data.page;
			Draw.data = data.data;
			CanvasDraws.Draws.push(Coord);
        });
    });    
}

function xml2Object(element) {
try{
	CDInteractive.Nombre = element.getElementsByTagName("Nombre")[0].childNodes[0].nodeValue;
	CDInteractive.NumPagesPDF = element.getElementsByTagName("NumPagesPDF")[0].childNodes[0].nodeValue;
	CDInteractive.ISBN = element.getElementsByTagName("ISBN")[0].childNodes[0].nodeValue;
	CDInteractive.Autor = element.getElementsByTagName("Autor")[0].childNodes[0].nodeValue;
	for(i = 0; i < element.getElementsByTagName("Unidad-Pagina").length; i++)
		CDInteractive.PDF.push(element.getElementsByTagName("Unidad-Pagina")[i].childNodes[0].nodeValue);	

	//console.log(element.getElementsByTagName("Actividades")[0].children[0].children);
	//console.log(element.getElementsByTagName("Actividades")[0].children[0].getElementsByTagName("Pagina")[0].textContent);
	for(i = 0; i < element.getElementsByTagName("Unidad").length;i++){
		Unidad = new Object();
		Unidad.Id = element.getElementsByTagName("Unidad")[i].getAttribute('id');
		Unidad.Actividades = new Array();
		for(j = 0; j < element.getElementsByTagName("Actividades")[i].children.length; j++){
			//console.log(element.getElementsByTagName("Actividades")[i].children[j].getElementsByTagName("Pagina")[0].textContent);
			Actividad = new Object();
			Actividad.Id = element.getElementsByTagName("Actividades")[i].children[j].getAttribute('id');
			Actividad.IdUnidad = i;
			Actividad.IdActividad = j;
			Actividad.Pagina = element.getElementsByTagName("Actividades")[i].children[j].getElementsByTagName("Pagina")[0].textContent;
			Actividad.NombActividad = element.getElementsByTagName("Actividades")[i].children[j].getElementsByTagName("NombActividad")[0].textContent;
			Actividad.Tipo = element.getElementsByTagName("Actividades")[i].children[j].getElementsByTagName("Tipo")[0].textContent;
			Actividad.Track = element.getElementsByTagName("Actividades")[i].children[j].getElementsByTagName("Track")[0].textContent;
			Actividad.NombreAct = element.getElementsByTagName("Actividades")[i].children[j].getElementsByTagName("NombreAct")[0].textContent;
			if(element.getElementsByTagName("Actividades")[i].children[j].getElementsByTagName("titulo")[0])
				Actividad.Titulo = element.getElementsByTagName("Actividades")[i].children[j].getElementsByTagName("titulo")[0].textContent;
			Actividad.Name = element.getElementsByTagName("Actividades")[i].children[j].getElementsByTagName("NombreAct")[0].getAttribute('name');
			Actividad.Instruccion = element.getElementsByTagName("Actividades")[i].children[j].getElementsByTagName("Instruccion")[0].textContent;			
			Actividad.EstructuraJuego = element.getElementsByTagName("Actividades")[i].children[j].getElementsByTagName("EstructuraJuego")[0];
			if(element.getElementsByTagName("Actividades")[i].children[j].getElementsByTagName("Archivo")[0])
				Actividad.Archivo = element.getElementsByTagName("Actividades")[i].children[j].getElementsByTagName("Archivo")[0].textContent; 
			Unidad.Actividades.push(Actividad);
		}
		CDInteractive.Unidades.push(Unidad);
	}
	
	for(v = 1; v < 7; v++){
		var Actividades = getMediaPage(v);
		for(var a in Actividades){
			if(Actividades[a].Tipo == 'Audio')
				addMediaIcon(Actividades[a].Id, '#magazine-viewport', 0, v, Actividades[a].Track);
			else if (Actividades[a].Tipo == 'Video') 
				addMediaIcon(Actividades[a].Id, '#magazine-viewport', 1, v, Actividades[a].NombreAct, Actividades[a].Name);	
			//console.log(getMediaPosition(Actividades[a].Id, v));
		}
	}
	
		
}catch(e){
	console.log(e.stack);
}
	//console.log(CDInteractive);
}

function addToJson(page, top, left) {
	if(page != null)if(page != '' ){
		var idAndPage = page.split(',');
		var obj = getMediaPosition(idAndPage[0], idAndPage[1]);
		if(ActCoords.Coords.length == 0) ActCoords.Coords = new Array();	
		Coord = new Object();
		Coord.id = idAndPage[0];
		Coord.page = idAndPage[1];
		Coord.top = top;
		Coord.left = left;
		if(obj.length == 0)
			ActCoords.Coords.push(Coord);
		else
			ActCoords.Coords.splice(
				functiontofindIndex(ActCoords.Coords, ["page", "id"], [idAndPage[1], idAndPage[0]]) , 
				1, 
				Coord
			);
	}
}

/*function addToJson(page, data) {	
	var obj = getCanvasDataPage(page);
	console.log(page);
	if(CanvasDraws.Draws.length == 0) CanvasDraws.Draws = new Array();	
	Draw = new Object();
	Draw.page = page;
	Draw.data = data;
	if(obj.length == 0)
		CanvasDraws.Draws.push(Draw);
	else
		CanvasDraws.Draws.splice(
			functiontofindIndexByKeyValue(CanvasDraws.Draws, "page", page) , 
			1, 
			Draw
		);
}*/

function getMediaPosition(id, page) {	
	return ActCoords.Coords.filter(function (obj) { return obj.page == page && obj.id == id; });;
}

function getCanvasDataPage(page) {	
	return CanvasDraws.Draws.filter(function (obj) { return obj.page == page; });;
}

function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
	for (var i = 0; i < arraytosearch.length; i++) 
		if (arraytosearch[i][key] == valuetosearch) 
			return i;
	return null;
}

function functiontofindIndex(arraytosearch, key, valuetosearch) {
	for (var i = 0; i < arraytosearch.length; i++) 
		if (arraytosearch[i][key[0]] == valuetosearch[0] && arraytosearch[i][key[1]] == valuetosearch[1]) 
			return i;
	return null;
}

function getMediaPage(page) {
	var Actividades  = new Array();
	for(var u in CDInteractive.Unidades)		
		for(var a in CDInteractive.Unidades[u].Actividades)			
			if(CDInteractive.Unidades[u].Actividades[a].Pagina == page)
				Actividades.push(CDInteractive.Unidades[u].Actividades[a]);		
	return Actividades;
}