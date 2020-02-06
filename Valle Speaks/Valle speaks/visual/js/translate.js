function getResourceString(text){
	switch(text){
		case 'Página 1':
			return idioma == 'eng' ? 'Page 1' : text;
		case 'Página':
			return idioma == 'eng' ? 'Page' : text;
		case 'Marcar Página':
			return idioma == 'eng' ? 'Page Maker' : text;
		case 'Ir a página marcada':
			return idioma == 'eng' ? 'Go to page marked' : text;
		case 'Anterior':
			return idioma == 'eng' ? 'Last Page' : text;
		case 'Ir a página':
			return idioma == 'eng' ? 'Go to Page' : text;
		case 'Marcar Página':
			return idioma == 'eng' ? 'Mark Page' : text;
		case 'Siguiente':
			return idioma == 'eng' ? 'Next Page' : text;
		case 'Salir':
			return idioma == 'eng' ? 'Exit' : text;
		case 'Imprimir':
			return idioma == 'eng' ? 'Print' : text;
		case 'Lápiz':
			return idioma == 'eng' ? 'Pencil' : text;
		case 'Lápiz 1':
			return idioma == 'eng' ? 'Pencil 1' : text;
		case 'Lápiz 2':
			return idioma == 'eng' ? 'Pencil 2 ' : text;
		case 'Lápiz 3':
			return idioma == 'eng' ? 'Pencil 3' : text;
		case 'Marcador':
			return idioma == 'eng' ? 'Marker' : text;
		case 'Marcador 1':
			return idioma == 'eng' ? 'Marker 1' : text;
		case 'Marcador 2':
			return idioma == 'eng' ? 'Marker 2 ' : text;
		case 'Marcador 3':
			return idioma == 'eng' ? 'Marker 3' : text;
		case 'Borrador':
			return idioma == 'eng' ? 'Eraser' : text;
		case 'Limpiar':
			return idioma == 'eng' ? 'Clean' : text;
		case 'Captura':
			return idioma == 'eng' ? 'Capture' : text;
		case 'Captura':
			return idioma == 'eng' ? 'Screenshot' : text;
		case 'Agregar Nota':
			return idioma == 'eng' ? 'Add Note' : text;
		case 'Zoom':
			return idioma == 'eng' ? 'Zoom' : text;
		case 'Color Lápiz':
			return idioma == 'eng' ? 'Color Pencil' : text;
		case '¡Alerta!':
			return idioma == 'eng' ? 'Hey!' : text;
		case 'Ingresa el numero de página':
			return idioma == 'eng' ? 'Input your page number' : text;
		case 'Cancelar':
			return idioma == 'eng' ? 'Cancel' : text;
		case '¿Confirmación?':
			return idioma == 'eng' ? 'Are you sure?' : text;
		case 'Estas seguro de querer eliminar la nota de esta página':
			return idioma == 'eng' ? 'Delete note from this page' : text;
		case 'Audio':
			return idioma == 'eng' ? 'Track' : text;
		case 'Reproducir audio':
			return idioma == 'eng' ? 'Play audio' : text;
		case 'Reproducir video':
			return idioma == 'eng' ? 'Play video' : text;
		case 'Iniciar Juego':
			return idioma == 'eng' ? 'Play Game' : text;
		case 'Juego':
			return idioma == 'eng' ? 'Game' : text;
		case 'Abrir PDF':
			return idioma == 'eng' ? 'Open PDF' : text;
		case 'PDF':
			return idioma == 'eng' ? 'PDF' : text;
	}
}

function addhelpInfo(){	
	$('#home').mouseenter(function() { helpInfo(getResourceString('Página 1')); }).mouseleave(function() { helpInfo(''); });
	$('#tag').mouseenter(function() { helpInfo(getResourceString('Marcar Página')); }).mouseleave(function() { helpInfo(''); });
	$('#go-pagemark').mouseenter(function() { helpInfo(getResourceString('Ir a página marcada')); }).mouseleave(function() { helpInfo(''); });
	$('#back').mouseenter(function() { helpInfo(getResourceString('Anterior')); }).mouseleave(function() { helpInfo(''); });
	$('#ir').mouseenter(function() { helpInfo(getResourceString('Ir a página')); }).mouseleave(function() { helpInfo(''); });
	$('#tag').mouseenter(function() { helpInfo(getResourceString('Marcar Página')); }).mouseleave(function() { helpInfo(''); });
	$('#forward').mouseenter(function() { helpInfo(getResourceString('Siguiente')); }).mouseleave(function() { helpInfo(''); });
	$('#close-window').mouseenter(function() { helpInfo(getResourceString('Salir')); }).mouseleave(function() { helpInfo(''); });
	$('#print').mouseenter(function() { helpInfo(getResourceString('Imprimir')); }).mouseleave(function() { helpInfo(''); });
	/******************************************************************************************************/
	$('#pencil').tooltip({title: getResourceString('Lápiz')})
	$('#pencil').mouseenter(function() { helpInfo(getResourceString('Lápiz')); }).mouseleave(function() { helpInfo(''); });
	$('#pencil-1').mouseenter(function() { helpInfo(getResourceString('Lápiz 1')); }).mouseleave(function() { helpInfo(''); });
	$('#pencil-2').mouseenter(function() { helpInfo(getResourceString('Lápiz 2')); }).mouseleave(function() { helpInfo(''); });
	$('#pencil-3').mouseenter(function() { helpInfo(getResourceString('Lápiz 3')); }).mouseleave(function() { helpInfo(''); });
	$('#pencil-mark').mouseenter(function() { helpInfo(getResourceString('Marcador')); }).mouseleave(function() { helpInfo(''); });
	$('#pencil-mark-1').mouseenter(function() { helpInfo(getResourceString('Marcador 1')); }).mouseleave(function() { helpInfo(''); });
	$('#pencil-mark-2').mouseenter(function() { helpInfo(getResourceString('Marcador 2')); }).mouseleave(function() { helpInfo(''); });
	$('#pencil-mark-3').mouseenter(function() { helpInfo(getResourceString('Marcador 3')); }).mouseleave(function() { helpInfo(''); });
	$('#eraser').mouseenter(function() { helpInfo(getResourceString('Borrador')); }).mouseleave(function() { helpInfo(''); });
	$('#clear').mouseenter(function() { helpInfo(getResourceString('Limpiar')); }).mouseleave(function() { helpInfo(''); });
	$('#screenshot').mouseenter(function() { helpInfo(getResourceString('Captura')); }).mouseleave(function() { helpInfo(''); });
	$('#notes').mouseenter(function() { helpInfo(getResourceString('Agregar Nota')); }).mouseleave(function() { helpInfo(''); });
	$('#zoom-media').mouseenter(function() { helpInfo(getResourceString('Zoom')); }).mouseleave(function() { helpInfo(''); });
	$('#color-lapiz').mouseenter(function() { helpInfo(getResourceString('Color Lápiz')); }).mouseleave(function() { helpInfo(''); });
	$('.footPlandi').mouseenter(function() { helpInfo('PLANDI-Plataformas Educativas'); }).mouseleave(function() { helpInfo(''); });
	$('#titulo-impresion').html(getResourceString('¡Alerta!'));
	$('#mens-impresion').html(getResourceString('Ingresa el numero de página'));
	$('.cancel-translate').html(getResourceString('Cancelar'));
	$('#titulo-nota').html(getResourceString('¿Confirmación?'));
	$('#mens-nota').html(getResourceString('Estas seguro de querer eliminar la nota de esta página'));
}