var nw = require('nw.gui');

function OpenGame(name, url, unidad, actividad){
	var defaults = {
	    focus: true,
	    frame: false,
	    position: 'center',
	    width: 1220,
	    height: 880,
	    title: name,
	    icon:"icono.png",
	    toolbar: false 
	};
	//console.log('visual/pivotPDF.html?url='+jsonLibro.url+"&numpages="+jsonLibro.numPages);
	nw.Window.open('games/'+name+'/index.html?url='+url+"&unidad="+unidad + "&actividad=" + actividad, defaults, function(w) {
	   console.log('nw window', w);
	});		
}

function OpenPDF(file){
	nw.Shell.openItem(file);	
}