var selected=null;
var chokidar = require('chokidar');
var AreaConocimiento={nombre:"", subcategoria:[], path:""};
var Biblioteca=[];
var CryptoJS = require("crypto-js");



// Load native UI library
var ngui = require('nw.gui');

// Get the current window
var nwin = ngui.Window.get();

function cerrar(){
    //alert("close");

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


	//correccionScroll();
	/*var pAvance= (($(window).height())*100)/821;

	var tam=(pAvance*518)/100;

	//var nh=(h*37)/heW;
	$(".contLibros").css("height",(tam-61)+"px");
    console.log( 'resized to'+pAvance+"% tam: "+tam);*/
});


function encript(path){
	var ciphertext = CryptoJS.AES.encrypt(path, 'plandi');	
	return ciphertext;
}

function decript(path){
	var bytes  = CryptoJS.AES.decrypt(path.toString(), 'plandi');
	var plaintext = bytes.toString(CryptoJS.enc.Utf8);
	 
	console.log(plaintext);
	return plaintext;
}

function cerrar(){
	    nwin.close();
}
function animacionBotones(){

$(".contAreas>img").mouseover(function(){
		var path=$(this).attr("src");
		var strPath=path.split("/")
		//console.log(strPath[strPath.length-1]);
		var overPath="";

		for(var i=0; i<=strPath.length-2; i++){
			overPath+=strPath[i]+"/";
		}
		overPath+="/icono_o.png"
		//console.log(overPath);
		//$(this).attr("src",overPath);
	  //console.log($(this).attr("src"));

		if(selected==null){
			$(this).attr("src",overPath);
		}else{
			if($(this).attr("id")!=selected){
				$(this).attr("src",overPath);
			}		
		}

	});


	$(".contAreas>img").mouseleave(function(){
		var path=$(this).attr("src");
		var strPath=path.split("/")
		//console.log(strPath[strPath.length-1]);
		var overPath="";

		for(var i=0; i<=strPath.length-2; i++){
			overPath+=strPath[i]+"/";
		}
		overPath+="/icono.png"
		//console.log(overPath);
		
		//console.log("selected")
		//console.log(selected)
		if(selected==null){
			$(this).attr("src",overPath);
		}else{
			if($(this).attr("id")!=selected){
				$(this).attr("src",overPath);
			}		
		}
	});

	$(".contAreas>img").click(function(){
		var path=$(this).attr("src");
		var strPath=path.split("/")
		//console.log(strPath[strPath.length-1]);
		var overPath="";

		for(var i=0; i<=strPath.length-2; i++){
			overPath+=strPath[i]+"/";
		}
		overPath+="/icono_a.png"
		//console.log(overPath);
		$(this).attr("src",overPath);
		$(this).transition({ scale: 1.1 });

		if(selected==null){
			selected=$(this).attr("id");		
		}else{
			if(selected==$(this).attr("id")){
				console.log("el mismo")
			}else{
				$("#"+selected).transition({ scale: 1 });		
				selected=$(this).attr("id");			
			}

		}

		//animacionBotones();

	  //console.log($(this).attr("src"));
	});	

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

var index=0;
chokidar.watch('C://piaLite2', {ignored: /(^|[\/\\])\../}).on('all', function (event, path){
	const pathObj = require('path');
	var URLAnalisis=analizarURL(path);
	

	  if(event=="addDir"){
	  	var area=pathObj.basename(path);
	  	  if(area!="piaLite2"){
	  	  	if(URLAnalisis.TipoURL==1){
		  	  	Biblioteca.push({nombre:area, subcategoria:[], path:path});
		  	  	
		  	  	console.log({nombre:area, subcategoria:[], path:path});
		  	  	

		  	  	$(".contAreas").append('<img src="'+path+"/icono.png"+'" id="item'+index+'" onclick="goTo('+index+')">');
		  	  	index++;
		  	  	animacionBotones();
		  	  	//$("#contMaterias").append("<li><a href='#' onclick='showSection(\""+area+"\")'>"+area+"</a></li>")
		  	  	//$("#contMaterias2").append(" <button type='button' onclick='showSection(\""+area+"\")' class='btn btn-default'><img class='imgAC' src='"+(URLAnalisis.Path+"\\icono.png")+"'/></button>");
		  	  	//$(".ACC").append("<div id='item"+Biblioteca.length+"' data-toggle='tooltip' data-placement='bottom' title='"+area+"' onclick='showSection(\""+area+"\")' ><img src='"+(URLAnalisis.Path+"\\icono.png")+"'></div>");
		  	  	//$('[data-toggle="tooltip"]').tooltip();
		  	  	//efectoBotones();



	  	  	}
	  	  }
	  }

});

var areaSeleccionada=null;

function goTo(index){
	console.log(Biblioteca[index]);
	$("#logoSelected").attr("src",Biblioteca[index].path+"/icono_s.png");
	$(".NombreArea").html(Biblioteca[index].nombre);

	areaSeleccionada=encript(Biblioteca[index].nombre).toString();

}


 var cmd=require('node-cmd');
const fs = require('fs');


function apertura(){



	//var ruta =' explorerC:/GamesGenerator/'
	
var ruta = 'C:/GamesGenerator/GeneradorJuegos.exe';

       cmd.get(
          ruta,
           function(err, data, stderr){
           	if(err){
             console.log(err)
           	}

           	if(stderr){
           	console.log(stderr);
           	}

           }
       );
       
}


function videos(){



var ruta =' explorer C:\\GamesGenerator\\videos';

       cmd.get(
       	
          ruta,
           function(err, data, stderr){
           	if(err){
             console.log(err)
           	}

           	if(stderr){
           	console.log(stderr);
           	}

           }
       );

}
function audios(){

var ruta =' explorer C:\\GamesGenerator\\audios';

       cmd.get(
       	
          ruta,
           function(err, data, stderr){
           	if(err){
             console.log(err)
           	}

           	if(stderr){
           	console.log(stderr);
           	}

           }
       );
}
function sounds(){

var ruta =' explorer C:\\GamesGenerator\\sounds';

       cmd.get(
       	
          ruta,
           function(err, data, stderr){
           	if(err){
             console.log(err)
           	}

           	if(stderr){
           	console.log(stderr);
           	}

           }
       );
}


function showLibros(){
	if(areaSeleccionada==null){

	}else{
		console.log(areaSeleccionada);
		window.location.replace("./index.html?url="+areaSeleccionada);
		//decript(areaSeleccionada);
	}
}

