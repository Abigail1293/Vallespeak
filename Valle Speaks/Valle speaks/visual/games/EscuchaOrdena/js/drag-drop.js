var dragSrcEl = null;
var ind = 0;

function handleDragStart(e) {
  this.style.opacity = '0.4';  // this / e.target is the source node.

  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

/*
* Call when a Drop it success
*/
function handleDrop(e) {
  // this / e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }
  // See the section on the DataTransfer object.
  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the columnwe dropped on.
    //dragSrcEl.innerHTML = this.innerHTML;

    //if(this.id != '') this.trigger("click");
    
    dragSrcEl.classList.add('hide-elemment');
    
    //if(this.innerHTML != "___________")$('#' + this.id).show();

    var request = e.dataTransfer.getData('text/html')

    this.innerHTML += 
      "<div class='d-inline-block'><h3><span id='word-"+ (ind++) +"' draggable='true' class='word-order move badge badge-normal rounded px-2 my-1 mx-1'>"+request+"</span></h3></div>";

    this.classList.add('over');

    //this.id = dragSrcEl.id;

    $(this).unbind('click');

    $(this).click(function(){  
      //var nameId = this.id;     
      
      //this.id = ''; 
      //this.innerHTML = '___________'; 
      //this.classList.remove('over');  

      //if(nameId)
      //  $('#' + nameId)[0].classList.remove('hide-elemment');
    });
    //$(this).remove();    
  }
  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  dragSrcEl.style.opacity = '1';
}

function addDragDropBehaviour(){
  var cols = document.querySelectorAll('.drag-reciver');
  [].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
  });

  var cols2 = document.querySelectorAll('.drag-markup');
  [].forEach.call(cols2, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('dragend', handleDragEnd, false);
  });
}