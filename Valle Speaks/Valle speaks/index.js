var PDFJS = require('pdfjs-dist');
var fs = require('fs');
var data = new Uint8Array(fs.readFileSync('documentos/test.pdf'));
//console.log(data.length);
PDFJS.diableWorker = true;
PDFJS.getDocument(data).then(function (pdfDocument) {
  console.log('Number of pages: ' + pdfDocument.numPages);
});