<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        a {
            text-decoration:none
        }
    </style>
</head>
<body>
    <input type="file" id="fileElem" multiple accept="image/*" style="display:none" onchange="handleFiles(this.files)">
    <a href="#" id="fileSelect">Select some files</a> 
    <div id="fileList"></div>
</body>
<script>
window.URL = window.URL || window.webkitURL;

var fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");
fileList.innerHTML = "";
var list = document.createElement("ul");
fileList.appendChild(list);

fileSelect.addEventListener("click", function (e) {
    if (fileElem) {
        fileElem.click();
    }
    e.preventDefault(); // prevent navigation to "#"
}, false);

function handleFiles(files) {
    if (!files.length) {
        fileList.innerHTML = "<p>No files selected!</p>";
    } else {
        for (var i = 0; i < files.length; i++) {
            var li = document.createElement("li");
            list.appendChild(li);
            
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(files[i]);
            img.height = 100;
            img.style.border = "1px solid grey";
            img.style.backgroundColor = 'grey';
            img.onload = function() {
                window.URL.revokeObjectURL(this.src);
            }
            li.appendChild(img);
            var info = document.createElement("span");
            info.innerHTML = " [ " + files[i].name + " ] (" + files[i].size + " bytes)";
            li.appendChild(info);
        }
    }
}
</script>
</html>