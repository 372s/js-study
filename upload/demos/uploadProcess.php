<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        #myCanvas {
            border:1px solid #000000;
        }
    </style>
</head>
<body>
    <p>
        <input type="file" class="obj" onchange="sendFiles()">
    </p>
    <canvas id="myCanvas" width="200" height="20"></canvas>
</body>
<script>
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.fillStyle="#FF0000";
// ctx.fillRect(0,0,200,20);
function sendFiles() {
    var imgs = document.querySelectorAll(".obj");
    for (var i = 0; i < imgs.length; i++) {
        var file = imgs[i].files[i];
        new FileUpload(imgs[i].files[i], file);
    }
}
function FileUpload(img, file) {
    var reader = new FileReader();  
    // this.ctrl = createThrobber(img);
    var xhr = new XMLHttpRequest();
    this.xhr = xhr;
    // console.log(this.ctrl)
    var self = this;
    this.xhr.upload.addEventListener("progress", function(e) {
        if (e.lengthComputable) {
            var percentage = Math.round((e.loaded) / e.total * 200);
            // self.ctrl.update(percentage);
            ctx.fillRect(0,0,percentage,20);
            console.log(percentage);
        }
    }, false);
    
    xhr.upload.addEventListener("load", function(e){
            // self.ctrl.update(100);
            // var canvas = self.ctrl.ctx.canvas;
            // canvas.parentNode.removeChild(canvas);
        }, false);
    xhr.open("POST", "../upload.php");
    xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
    reader.onload = function(evt) {
        xhr.send(evt.target.result);
    };
    reader.readAsBinaryString(file);
}
</script>
</html>