

const directory = 'security';
const filename = 'dom-oreo-ab.security';
const path = directory + '/' + filename;
var fs = require('fs');
var moment = require('moment');
var aesjs = require('aes-js');

//Estructura de tiempo 2019-03-24 01:14:00
/*
* caducidad		->		Fecha y hora en que caduca el software
*/
function securityInit(caducidad) {	
	if(caducidad == null || caducidad == ''){ 
		if(fs.existsSync(path))fs.unlinkSync(path);
		return true; 
	}
	var dateTime = require('node-datetime');
	var dt = dateTime.create();
	var actual = dt.format('Y-m-d H:M:S');
	//Si la fecha de caducidad es despues de la actual entonces verificar si no hubo cambios manuales en la fecha de sistemas
	return moment(caducidad).isAfter(actual) ? verificarCambioFechaManual(actual) : false;
}

function verificarCambioFechaManual(actual) {	
	const keypass = new Buffer('Pl@Ndi+k3y5?h@5h');
	if(fs.existsSync(path)){
		var fechaAnterior = readSecurityFile(path); 
		//Si la fecha almacena anterior mente es despues de la fecha actual, entonces existio algun cambio de la fecha
		if(moment(decrypData(keypass, fechaAnterior)).isAfter(actual)){
			$('<div />', {'class': 'exit-message'}).
			html('<div>Cambió de fecha</div>').
				appendTo($('body')).
				delay(2000).css({zIndex:100, top:40});
			return false;
		} 
	}	
	writeSecurityFile(path, encrypData(keypass, actual));
	return true;
}

function encrypData(keypass, value) {
	// Convert text to bytes
	var textBytes = aesjs.utils.utf8.toBytes(value);
	// The counter is optional, and if omitted will begin at 1
	var aesCtr = new aesjs.ModeOfOperation.ctr(keypass, new aesjs.Counter(0));
	var encryptedBytes = aesCtr.encrypt(textBytes);
	// To print or store the binary data, you may convert it to hex
	var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
	return encryptedHex;
}

function decrypData(keypass, value) {
	// When ready to decrypt the hex string, convert it back to bytes
	var encryptedBytes = aesjs.utils.hex.toBytes(value);
	// The counter mode of operation maintains internal state, so to
	// decrypt a new instance must be instantiated.
	var aesCtr = new aesjs.ModeOfOperation.ctr(keypass, new aesjs.Counter(0));
	var decryptedBytes = aesCtr.decrypt(encryptedBytes);
	// Convert our bytes back into text
	var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
	return decryptedText;
}

function readSecurityFile(filepath) {
	return fs.readFileSync(filepath, 'utf8');
}

function writeSecurityFile(filepath, output) {
	fs.writeFile(filepath, output, function(err) {
  		if (err) throw err;
	});
}