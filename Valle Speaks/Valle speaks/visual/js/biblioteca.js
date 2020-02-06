function getFistPage(url){
    //var url = 'documentos/test.pdf';
    $(".contCanvas").html("");
    $(".contCanvas").html("<canvas id='the-canvas'></canvas>");
    PDFJS.workerSrc = 'build/pdf.worker.js';

    // Asynchronous download of PDF
    var loadingTask = PDFJS.getDocument(url);
    loadingTask.promise.then(function(pdf) {      
      // Fetch the first page
      var pageNumber = 1;

      pdf.getPage(pageNumber).then(function(page) {
        console.log('Page loaded');
        
        var scale = 1.2;
        var viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.then(function () {
          console.log('Page rendered');
        });
      });
    }, function (reason) {
      // PDF loading error
      console.error(reason);
    });
}

function getFistPagePdf(url){
    //var url = 'documentos/test.pdf';
    //$(".contCanvas").html("");
    //$(".contCanvas").html("<canvas id='the-canvas'></canvas><canvas id='in-canvas'></canvas>");
    PDFJS.workerSrc = 'build/pdf.worker.js';

    // Asynchronous download of PDF
    var loadingTask = PDFJS.getDocument(url);
    loadingTask.promise.then(function(pdf) {      
      // Fetch the first page
      var pageNumber = 1;

      pdf.getPage(pageNumber).then(function(page) {
        console.log('Page loaded');
        
        var scale = 1.1;
        var viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.then(function () {
          console.log('Page rendered');
        });
      });

      pdf.getPage(pageNumber+1).then(function(page) {
        console.log('Page loaded');
        
        var scale = 1.1;
        var viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('in-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.then(function () {
          console.log('Page rendered');
        });
      });


    }, function (reason) {
      // PDF loading error
      console.error(reason);
    });

}
