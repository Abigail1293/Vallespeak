function getFistPage(url){
    //var url = 'documentos/test.pdf';
    $(".contCanvas").html("");
    $(".contCanvas").html("<canvas id='the-canvas'></canvas>");
    PDFJS.workerSrc = 'build/pdf.worker.js';

    // Asynchronous download of PDF
    var loadingTask = PDFJS.getDocument(url);
    loadingTask.promise.then(function(pdf) {
      console.log('PDF loaded');
      
      // Fetch the first page
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function(page) {
        console.log('Page loaded');
        
        var scale = 0.5;
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
      //console.log(url);
      console.error(reason);
    });

}

function getFistPageTest(url){
    try{

    PDFJS.workerSrc = 'build/pdf.worker.js';

    // Asynchronous download of PDF
    var loadingTask = PDFJS.getDocument(url);
    loadingTask.promise.then(function(pdf) {
      console.log("OK");
    }, function (reason) {
      // PDF loading error
      console.log(url);
      //console.error(reason);
    });

    }catch(err){
      console.log(err);
    }


}


/*setTimeout(function(){
    //alert("Hello");
 
    //$('.contLibros>div').css("background-color", "red");


    $('.contLibros>div').bind("click", function (e) {

        $(".selected").css("background-color", "#d8d8d8");
        $(".selected").removeClass("selected");

        $(this).addClass("selected");
        $(this).css("background-color", "#B9D700");
        //alert("hola");
    });


 }, 1000);*/


function efectoSelected(){

    $('.contLibros>div').bind("click", function (e) {

        $(".selected").css("background-color", "#d8d8d8");
        $(".selected").removeClass("selected");

        $(this).addClass("selected");
        $(this).css("background-color", "#5eb034");
        //alert("hola");
    });

}


    

