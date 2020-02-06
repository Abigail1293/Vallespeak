var chokidar = require('chokidar');
var AreaConocimiento={nombre:"", subcategoria:[], path:""};
var Biblioteca=[];

var seccion="inicio";
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
var selectedLibro=null;
var B64LibroString = null;

// Load native UI library
var ngui = require('nw.gui');

// Get the current window
var nwin = ngui.Window.get();

function cerrar(){
    //alert("close");
    nwin.close();
}

function maximizar(){
   //alert("max");
    nwin.maximize();
}

function minimizar(){
    //alert("min");
    nwin.minimize();
}


$(document).ready(function(){
	$('#txtBusqueda').bind('keypress', function(e) {
		 var code = e.keyCode || e.which;
		 if(code == 13) { //Enter keycode
		   //alert("buscando a: "+$('#txtBusqueda').val());
		   buscarLibro($('#txtBusqueda').val());
		   $('#txtBusqueda').val("")
		 }		
	});
    
    $('[data-toggle="tooltip"]').tooltip(); 

})

function analizarURL(url){
	//console.log(url);

	var SplitURL= url.split('\\');
	var respuesta=null;
	if(SplitURL.length>0){
		if(SplitURL.length==3){
			respuesta={
				TipoURL:1,
				Unidad:SplitURL[0],
				CC:SplitURL[1],
				RutaAbsCC:SplitURL[0]+"\\"+SplitURL[1],
				Nivel1:SplitURL[2],
				Path:url
			};
		}

		if(SplitURL.length==4){
			respuesta={
				TipoURL:2,
				Unidad:SplitURL[0],
				CC:SplitURL[1],
				RutaAbsCC:SplitURL[0]+"\\"+SplitURL[1],
				Nivel1:SplitURL[2],
				Nivel2:SplitURL[3],
				Path:url
			};
		}

		if(SplitURL.length==5){
			respuesta={
				"TipoURL":3,
				"Unidad":SplitURL[0],
				"CC":SplitURL[1],
				"RutaAbsCC":SplitURL[0]+"\\"+SplitURL[1],
				"Nivel1":SplitURL[2],
				"Nivel2":SplitURL[3],
				"Nivel3":SplitURL[4],
				"Path":url
			};
		}

	}else{
		respuesta={err:"error en el analisis de path"}
	}	
	//console.log(respuesta);
	return respuesta;
}

function muestraInfo(info){
	//alert(info);
	B64LibroString = info;
	var decodedString = Base64.decode(info);
	var objLibro= JSON.parse(decodedString);
	//console.log(objLibro);
	getFistPage(objLibro.path);
	var splitNombre=objLibro.nombre.split(".");
	$("#nombreLibro").html(splitNombre[0]+"<br>"+objLibro.AC);
	selectedLibro=objLibro;
}

function showLibro(){
	console.log(selectedLibro);
	if(selectedLibro!=null){

		var nw = require('nw.gui')
		
		var defaults = {
		    focus: true,
		    frame:false,
		    position: 'center',
		    width: 1200,
		    height: 750,
		    title: selectedLibro.nombre,
		    icon:"icono.png",
		    toolbar: true //this is just for dev purpose
		};

		/*nw.Window.open('visorAngloDocs.html?doc='+selectedLibro.path, defaults, function(w) {
		   console.log('nw window', w);
		});*/
		nw.Window.open('pivotPDF.html?doc='+B64LibroString, defaults, function(w) {
		   console.log('nw window', w);
		});
	}
}

function buscarLibro(palabra){
		console.log("palaba a buscar: "+palabra)
		var results = [];

		for(var i=0; i<=Biblioteca.length-1; i++){
				for(var j=0; j<=Biblioteca[i].subcategoria.length-1; j++){
					for(var k=0; k<=Biblioteca[i].subcategoria[j].files.length-1; k++){
						var splitLibro= Biblioteca[i].subcategoria[j].files[k].nombre.split(palabra);

						if(splitLibro.length>1){
							results.push(getItem(Biblioteca[i].subcategoria[j].files[k]));
						}
					}
				}
		}



		//alert(results.length);
		//console.log(results);
		pintarResultados(results);
}

function pintarResultados(resultados){
	$(".contLibros").html("");
	for(var i=0; i<=resultados.length-1; i++){
		$(".contLibros").append(resultados[i]);	
	}
	
}

function showSection(NombreSeccion){
	$(".contLibros").html("");
	seccion=NombreSeccion
	$(".ubicacion").html(seccion);

	if(NombreSeccion=="inicio"){
		for(var i=0; i<=Biblioteca.length-1; i++){
				for(var j=0; j<=Biblioteca[i].subcategoria.length-1; j++){
					for(var k=0; k<=Biblioteca[i].subcategoria[j].files.length-1; k++){
						$(".contLibros").append(getItem(Biblioteca[i].subcategoria[j].files[k]));
					}
				}
		}		
	}else{
		
		for(var i=0; i<=Biblioteca.length-1; i++){
			if(Biblioteca[i].nombre==NombreSeccion){
				for(var j=0; j<=Biblioteca[i].subcategoria.length-1; j++){
					for(var k=0; k<=Biblioteca[i].subcategoria[j].files.length-1; k++){
						$(".contLibros").append(getItem(Biblioteca[i].subcategoria[j].files[k]));
					}
				}
			}
		}		
	}

}

function getItem(libro){
		var Analisis=analizarURL(libro.path);
		var icono=Analisis.RutaAbsCC+"\\"+Analisis.Nivel1+"\\"+Analisis.Nivel2+"\\icono.jpg"
		libro.AC=Analisis.Nivel2;
		var Strlibro=JSON.stringify(libro);
		var B64Libro=Base64.encode(Strlibro);

		var splitPDF=libro.nombre.split(".");
		var item="<div onclick='muestraInfo(\""+B64Libro+"\")'><img src='"+icono+"' /><span>"+splitPDF[0]+"</span></div>";

		return item;
}
	
function addFile(i,j, libro){
	var isPDF=false;
	var isValidURL=false;

	/*primer filtro dearchivo -> agregar si es pdf */
	splitPDF=libro.nombre.split(".");
	if(splitPDF.length>0){
		if(splitPDF[1]=="pdf"){
			isPDF=true;
		}
	}

	/*segunda validacion pertenece la url a la estructura*/
	var Analisis=analizarURL(libro.path);
	if(Analisis.Nivel2==Biblioteca[i].subcategoria[j].nombre){
		isValidURL=true;
	}


	if(isPDF==true && isValidURL==true){
		Biblioteca[i].subcategoria[j].files.push(libro);
		var icono=Analisis.RutaAbsCC+"\\"+Analisis.Nivel1+"\\"+Analisis.Nivel2+"\\icono.jpg"
		libro.AC=Analisis.Nivel2;

		var Strlibro=JSON.stringify(libro);
		var B64Libro=Base64.encode(Strlibro);

		if(seccion=="inicio"){
			$(".contLibros").append("<div onclick='muestraInfo(\""+B64Libro+"\")'><img src='"+icono+"' /></div>")
		}		
	}


}

chokidar.watch('C://bibliotecaANGLO', {ignored: /(^|[\/\\])\../}).on('all', function (event, path){
	const pathObj = require('path');
	var URLAnalisis=analizarURL(path);

	  if(event=="addDir"){
	  	var area=pathObj.basename(path);
	  	  if(area!="bibliotecaANGLO"){
	  	  	if(URLAnalisis.TipoURL==1){
		  	  	Biblioteca.push({nombre:area, subcategoria:[], path:path});
		  	  	//$("#contMaterias").append("<li><a href='#' onclick='showSection(\""+area+"\")'>"+area+"</a></li>")
		  	  	//$("#contMaterias2").append(" <button type='button' onclick='showSection(\""+area+"\")' class='btn btn-default'><img class='imgAC' src='"+(URLAnalisis.Path+"\\icono.png")+"'/></button>");
		  	  	$(".ACC").append("<div id='item"+Biblioteca.length+"' onclick='showSection(\""+area+"\")' ><img src='"+(URLAnalisis.Path+"\\icono.png")+"'></div>");

	  	  	}
	  	  }
	  }

	  if(event=="add"){
	  	if(URLAnalisis.TipoURL==3){
	  		for(var i=0; i<=Biblioteca.length-1; i++){
	  			if(Biblioteca[i].nombre==URLAnalisis.Nivel1){
	  				/*buscar la subclasificacion*/
	  				if(Biblioteca[i].subcategoria.length>0){
	  					var encontrado=false;
		  				for(var j=0; j<=Biblioteca[i].subcategoria.length-1;j++){

		  					//console.log(Biblioteca[i].subcategoria[j].nombre+"=="+URLAnalisis.Nivel2);
		  					
		  					if(Biblioteca[i].subcategoria[j].nombre==URLAnalisis.Nivel2){
		  						//Biblioteca[i].subcategoria[j].files.push({nombre:URLAnalisis.Nivel3, path: URLAnalisis.Path});
		  						addFile(i,j, {nombre:URLAnalisis.Nivel3, path: URLAnalisis.Path});
		  						encontrado=true;
		  						break;
		  					}
		  				}


		  					/*agregando subcategoria, si no existe*/
		  					if(encontrado==false){
			  					Biblioteca[i].subcategoria.push({nombre:URLAnalisis.Nivel2, files:[]});
			  					//Biblioteca[i].subcategoria[0].files.push({nombre:URLAnalisis.Nivel3, path: URLAnalisis.Path});		  						
			  					addFile(i,0,{nombre:URLAnalisis.Nivel3, path: URLAnalisis.Path});
		  					}

	  				}else{
	  					/*agregando subcategoria*/
	  					Biblioteca[i].subcategoria.push({nombre:URLAnalisis.Nivel2, files:[]});
	  					//Biblioteca[i].subcategoria[0].files.push({nombre:URLAnalisis.Nivel3, path: URLAnalisis.Path});
	  					addFile(i,0,{nombre:URLAnalisis.Nivel3, path: URLAnalisis.Path});
	  				}
	  			}
	  		}
	  	}
	  	/*console.log(path);
	  	console.log(pathObj.basename(path));*/

	  	//console.log(Biblioteca);
	  	
	  }	
});

