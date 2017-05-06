function openFile(event) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function(){
    let commandLine = reader.result;
    var drawingInterpretor = new DrawingToolInterpretor(commandLine);
    var output = document.getElementById('output');
    var text = drawingInterpretor.draw();
    download(text,'output.txt');
  };
  reader.readAsText(input.files[0]);
};

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
