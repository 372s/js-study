<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <input type="file" id="fileElem" multiple accept="image/*" style="display:none"  onchange="handleFiles(this.files)">
    <label for="fileElem">Select some files</label>
    <div id="fileList">
    
    </div>
</body>


<script>
function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /^image\//;

        if (!imageType.test(file.type)) {
            continue;
        }

        var img = document.createElement("img");
        img.classList.add("obj"); // img.className = "obj";
        // console.log(img.classList);return false;
        img.file = file;
        img.style.width = "200px";
        console.log(img);
        var preview = document.getElementById('fileList');
        preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

        var reader = new FileReader();
        reader.onload = (function(aImg) { 
            return function(e) {
                console.log(e);
                aImg.src = e.target.result; 
            }; 
        })(img);
        reader.readAsDataURL(file);
    }

}
</script>
</html>