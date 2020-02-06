var CryptoJS = require("crypto-js");
var chokidar = require('chokidar');
var Biblioteca=[];

var urlSeelcted=null;

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



$(document).on("ready", function(){
	//alert(1)
	var url = getUrlVars()["url"];
	console.log(url);
	
	urlSeelcted=decript(url);
	console.log(urlSeelcted);
	scanDir(urlSeelcted);

})


function scanDir(pathSelected){
	chokidar.watch(pathSelected, {ignored: /(^|[\/\\])\../}).on('all', function (event, path){
		const pathObj = require('path');
		var URLAnalisis=analizarURL(path);

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
}


