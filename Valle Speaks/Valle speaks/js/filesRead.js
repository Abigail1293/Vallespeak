var chokidar = require('chokidar');

var CryptoJS = require("crypto-js");

var AreaConocimiento={nombre:"", subcategoria:[], path:""};
var Biblioteca=[];

var banteraContenido=false;

var seccion="inicio";
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
var selectedLibro=null;

var heW=0;

var pilaTest=[]

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


nwin.on('resize', function(w, h) {


	correccionScroll();
	/*var pAvance= (($(window).height())*100)/821;

	var tam=(pAvance*518)/100;

	//var nh=(h*37)/heW;
	$(".contLibros").css("height",(tam-61)+"px");
    console.log( 'resized to'+pAvance+"% tam: "+tam);*/
});

function correccionScroll(){
	var pAvance= (($(window).height())*100)/821;

	var tam=(pAvance*518)/100;

	//var nh=(h*37)/heW;
//	$(".contLibros").css("height",(tam-61)+"px");
  //  console.log( 'resized to'+pAvance+"% tam: "+tam);	
}

$(document).ready(function(){

	$(".contLibros").html('<span class="container-fluid"><div class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><div class="loader"></div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div></div></span>');

	var url = getUrlVars()["url"];
	console.log(url);
	
	var AC_sel=decript(url);
	$(".tituloBibliotecaVirtual").html(AC_sel);

	$('#txtBusqueda').keyup(function(){
		buscarLibro($('#txtBusqueda').val());
	})

	heW=$(window).height();
	console.log("height: "+heW);
	console.log("heightcONT: "+$(".contLibros").css("height"));

	correccionScroll();

	setTimeout(function(){ showSection(AC_sel); 
		

		setTimeout(function(){
			if(banteraContenido==false){
				$(".contLibros").html('<span class="container-fluid"><div class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">No se encontro contenido</div></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div></div></span>');
			}
		},100);

	}, 3000);
	$('[data-toggle="tooltip"]').tooltip();




})


function returnMenu(){
	
	$(".btnatras").transition({ scale: 0.8 }, function(){
		$(".btnatras").transition({ scale: 1 }, function(){
			window.location.replace("./menu.html");
		})
	});
}

function decript(path){
	var bytes  = CryptoJS.AES.decrypt(path.toString(), 'plandi');
	var plaintext = bytes.toString(CryptoJS.enc.Utf8);
	 
	console.log(plaintext);
	return plaintext;
}


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}



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
	console.log($(this));

	var decodedString = Base64.decode(info);
	
	//console.log(decodedString);

	var objLibro= JSON.parse(decodedString);
	

		var fs = require("fs");

				fs.readFile(objLibro.path, function(err, data) {
					if(err){
						console.log(err);
					}else{
						var strJson=data.toString('utf8');
						//console.log(strJson);
						
						var myPat = /%5C/g;
						var fileString = escape(strJson);
						fileString = fileString.replace(myPat,"%5C%5C");
						fileString = unescape(fileString);
						//console.log(fileString);


						//{"libro":"Fuerza","url":'C:\EstructuraOculta\Ciencias Exactas\Fisica\Fuerza',"numPages":67}
						var jsonLibro=JSON.parse(fileString);					
						if(jsonLibro.url==""){
							$(".contCanvas").html("<span class='badge msgVPND'>Vista previa no disponible</span> ")
						}else{
							var PathImg=jsonLibro.url+"\\resources\\pages\\page(1).png";
							$(".contCanvas").html("<img class='img-responsive imgPortada' src='"+PathImg+"'/>");
						}

					}
				})	





	//getFistPage(objLibro.path);
	var splitNombre=objLibro.nombre.split(".");
	$("#nombreLibro").html(splitNombre[0]+"<br><span class='txtArea'>"+objLibro.AC+"</span>");
	selectedLibro=objLibro;
}

function showLibro_1(){
	console.log(selectedLibro);
	if(selectedLibro!=null){

		var nw = require('nw.gui')
		
		var defaults = {
		    focus: true,
		    frame: false,
		    position: 'center',
		    width: 730,
		    height: 880,
		    title: selectedLibro.nombre,
		    icon:"icono.png",
		    toolbar: false //this is just for dev purpose
		};

		nw.Window.open('visorAngloDocs.html?doc='+selectedLibro.path, defaults, function(w) {
		   console.log('nw window', w);
		});
	}
}

function showLibro(){
	console.log(selectedLibro);

	//console.log("comvirtiendo libro: "+selectedLibro.path);
		var fs = require("fs");

				fs.readFile(selectedLibro.path, function(err, data) {
					if(err){
						console.log(err);
					}else{
						var strJson=data.toString('utf8');
						console.log(strJson);
						
						var myPat = /%5C/g;
						var fileString = escape(strJson);
						fileString = fileString.replace(myPat,"%5C%5C");
						fileString = unescape(fileString);
						console.log(fileString);


						//{"libro":"Fuerza","url":'C:\EstructuraOculta\Ciencias Exactas\Fisica\Fuerza',"numPages":67}
						var jsonLibro=JSON.parse(fileString);
						console.log(jsonLibro);

						/*invocando libro */
						var nw = require('nw.gui')
						
						var defaults = {
						    focus: true,
						    frame: false,
						    position: 'center',
						    width: 1220,
						    height: 880,
						    title: selectedLibro.nombre,
						    icon:"icono.png",
						    toolbar: false 
						};

						//console.log('visual/pivotPDF.html?url='+jsonLibro.url+"&numpages="+jsonLibro.numPages);

						nw.Window.open('visual/pivotPDF.html?url='+jsonLibro.url+"&numpages="+jsonLibro.numPages + '&idioma=eng', defaults, function(w) {
						   console.log('nw window', w);
						});						


					}
				})	


}

function buscarLibro(palabra){
		/*console.log("palaba a buscar: "+palabra)*/
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
		
		//console,log(resultados[i]);
		
		$(".contLibros").append(resultados[i]);	
		efectoSelected();
	}
	
}

function showSection(NombreSeccion){
	banteraContenido=false;
	$(".contLibros").html("");
	seccion=NombreSeccion
	$(".ubicacion").html(seccion);

	if(NombreSeccion=="inicio"){
		$(".ubicacion").html("Todos");
		for(var i=0; i<=Biblioteca.length-1; i++){
				for(var j=0; j<=Biblioteca[i].subcategoria.length-1; j++){
					for(var k=0; k<=Biblioteca[i].subcategoria[j].files.length-1; k++){
						//$(".contLibros").append(getItem(Biblioteca[i].subcategoria[j].files[k]));
						getItem(Biblioteca[i].subcategoria[j].files[k])
					}
				}
		}		
	}else{
		
		for(var i=0; i<=Biblioteca.length-1; i++){
			if(Biblioteca[i].nombre==NombreSeccion){
				for(var j=0; j<=Biblioteca[i].subcategoria.length-1; j++){
					for(var k=0; k<=Biblioteca[i].subcategoria[j].files.length-1; k++){
						//$(".contLibros").append(getItem(Biblioteca[i].subcategoria[j].files[k]));
						getItem(Biblioteca[i].subcategoria[j].files[k])

					}
				}
			  
			}
		}


	}

}

function getItem(libro){
		
		console.log(libro);

		var Analisis=analizarURL(libro.path);
		
		console.log(libro.path);

		var icono=Analisis.RutaAbsCC+"\\"+Analisis.Nivel1+"\\"+Analisis.Nivel2+"\\icono.png"

		console.log(icono);

		libro.AC=Analisis.Nivel2;
		var Strlibro=JSON.stringify(libro);
		var B64Libro=Base64.encode(Strlibro);

		var splitPDF=libro.nombre.split(".");


				var fs=require("fs");

				fs.readFile(libro.path, function(err, data) {
					if(err){
						console.log(err);
					}else{
						var strJson=data.toString('utf8');
						console.log(strJson);

						decodeJson(strJson);
						
						var myPat = /%5C/g;
						var fileString = escape(strJson);
						fileString = fileString.replace(myPat,"%5C%5C");
						fileString = unescape(fileString);
						console.log("*"+fileString+"*");



						//{"libro":"Fuerza","url":'C:\EstructuraOculta\Ciencias Exactas\Fisica\Fuerza',"numPages":67}
						console.log(1);
						
						try{ var jsonL=JSON.parse(fileString); console.log(jsonL)}catch(err){console.log(err)}
						
						var jsonLibro=JSON.parse(fileString);

						console.log(jsonLibro);

						if(jsonLibro.url==""){
							//$(".contCanvas").html("<span class='badge msgVPND'>Vista previa no disponible</span> ")

						}else{
							var PathImg=jsonLibro.url+"\\resources\\pages\\page(1).png";
							//$(".contCanvas").html("<img class='img-responsive imgPortada' src='"+PathImg+"'/>");
							icono=PathImg;
						}											

						//console.log(jsonLibro.url);


					}

					
						var nombreL=libro.nombre.split('.');

						$(".contLibros").append("<div onclick='muestraInfo(\""+B64Libro+"\")'><img src='"+icono+"' /></div>")
						banteraContenido=true;
						efectoSelected();
						/*var item="<div onclick='muestraInfo(\""+B64Libro+"\")'><img src='"+icono+"' /><span>"+nombreL[0]+"</span></div>";
						return item;*/
				})	


		

		
}


function decodeJson(data){
	console.log("decodeJson");
	var separadores= data.split(",");
	console.log(separadores);
	/*quitando campos*/
	var s=separadores[1].split('"url":');
	console.log(s);
	/*quitando cables*/

	var ruta=s[1].replace('"',"");
	console.log(ruta);

}

	
function addFile(i,j, libro){
	var isPDF=false;
	var isValidURL=false;

	/*primer filtro dearchivo -> agregar si es pdf */
	splitPDF=libro.nombre.split(".");
	if(splitPDF.length>0){
		if(splitPDF[1]=="json"){
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
		//console.log(getFistPageTest(libro.path));
		//pilaTest.push(libro);
		

		var icono=Analisis.RutaAbsCC+"\\"+Analisis.Nivel1+"\\"+Analisis.Nivel2+"\\icono.png"
		libro.AC=Analisis.Nivel2;
		//console.log(libro);
		var Strlibro=JSON.stringify(libro);
		var B64Libro=Base64.encode(Strlibro);

		/*var PathImg=libro.url+"\\resources\\pages\\page(1).png";

		console.log(libro.path)	

		var json=require(libro.path);*/

		/*console.log(json);*/

		//console.log(libro);
				var fs=require("fs");

				fs.readFile(libro.path, function(err, data) {
					if(err){
						console.log(err);
					}else{
						var strJson=data.toString('utf8');
						//console.log(strJson);
						
						var myPat = /%5C/g;
						var fileString = escape(strJson);
						fileString = fileString.replace(myPat,"%5C%5C");
						fileString = unescape(fileString);
						//console.log(fileString);


						//{"libro":"Fuerza","url":'C:\EstructuraOculta\Ciencias Exactas\Fisica\Fuerza',"numPages":67}
						var jsonLibro=JSON.parse(fileString);

						if(jsonLibro.url==""){
							//$(".contCanvas").html("<span class='badge msgVPND'>Vista previa no disponible</span> ")

						}else{
							var PathImg=jsonLibro.url+"\\resources\\pages\\page(1).png";
							//$(".contCanvas").html("<img class='img-responsive imgPortada' src='"+PathImg+"'/>");
							icono=PathImg;
						}											

						console.log(jsonLibro.url);


					}

					if(seccion=="inicio"){
						var nombreL=libro.nombre.split('.');

						//$(".contLibros").append("<div onclick='muestraInfo(\""+B64Libro+"\")'><img src='"+icono+"' /><span>"+nombreL[0]+"</span></div>")
						efectoSelected();
					}

				})	

						//console.log("'"+json+"'");



		
	}


}

function efectoBotones(){

	$("div[id*='item']").mouseenter(function(){
		$(this).transition({ rotate: '15deg' }, 100, function(){
			$(this).transition({ scale: 1.1 });
		});
	})


	$("div[id*='item']").mouseleave(function(){
		$(this).transition({ rotate: '0deg' }, 100, function(){
			$(this).transition({ scale: 1 });
		});
	})

}

chokidar.watch('C://piaLite2', {ignored: /(^|[\/\\])\../}).on('all', function (event, path){
	const pathObj = require('path');
	var URLAnalisis=analizarURL(path);

	  if(event=="addDir"){
	  	var area=pathObj.basename(path);
	  	  if(area!="piaLite2"){
	  	  	if(URLAnalisis.TipoURL==1){
		  	  	Biblioteca.push({nombre:area, subcategoria:[], path:path});
		  	  	//$("#contMaterias").append("<li><a href='#' onclick='showSection(\""+area+"\")'>"+area+"</a></li>")
		  	  	//$("#contMaterias2").append(" <button type='button' onclick='showSection(\""+area+"\")' class='btn btn-default'><img class='imgAC' src='"+(URLAnalisis.Path+"\\icono.png")+"'/></button>");
		  	  	//$(".ACC").append("<div id='item"+Biblioteca.length+"' data-toggle='tooltip' data-placement='bottom' title='"+area+"' onclick='showSection(\""+area+"\")' ><img src='"+(URLAnalisis.Path+"\\icono.png")+"'></div>");
		  	  	// $('[data-toggle="tooltip"]').tooltip();
		  	  	 //efectoBotones();
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


