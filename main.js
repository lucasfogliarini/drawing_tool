document.addEventListener("DOMContentLoaded", function(event) {
  var draw = document.getElementById("draw");
  var inputFile = document.getElementById("inputFile");
  var reader = new FileReader();
  reader.onload = function(){
    let commandLine = reader.result;
    try {
      let drawingInterpretor = new DrawingToolInterpretor(commandLine);
      let drawText = drawingInterpretor.draw();
      download(drawText,'output.txt');
    } catch (e) {
      alert(e);
    }
  };
  draw.addEventListener("click", function(){
    reader.readAsText(inputFile.files[0]);
  }, false);
});

function download(text, filename) {
    var file = new Blob([text], {type: 'text/plain'});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
