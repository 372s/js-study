<!DOCTYPE html>
<html>
<head>
    <title>dnd binary upload</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <style>
    #dropzone {
        margin:30px; 
        width:500px; 
        height:300px;
        border:1px dotted grey;
        /* text-align:center; */
        /* line-height:300px; */
    }
    img {
        display:inline-block;
        border:1px #ccc solid;
        margin:10px 10px;
    }
    #container {
        width:500px; 
        position:absolute;
        top:130px;
        left:38px;
        /* border:1px #ccc solid; */
        height:200px;
    }
    </style>
</head>
<body>
    <div>
        <div id="dropzone">Drag & drop your file here...
            <div id="container"></div>
        </div>
    </div>
</body>
<script type="text/javascript">
    function sendFile(file) {
        var uri = "../upload.php";
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        
        xhr.open("POST", uri, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var info = JSON.parse(xhr.responseText);
                // console.log(info); // handle response.
                var img = document.createElement('img');
                img.src = info.response;
                img.style.width = "50px";
                //console.log(document.getElementById("dropzone"));
                document.getElementById("container").appendChild(img);
            }
        };
        fd.append('myfile', file);
        // Initiate a multipart/form-data upload
        xhr.send(fd);
    }

    window.onload = function() {
        var dropzone = document.getElementById("dropzone");
        dropzone.ondragover = dropzone.ondragenter = function(event) {
            event.stopPropagation();
            event.preventDefault();
        }

        dropzone.ondrop = function(event) {
            event.stopPropagation();
            event.preventDefault();

            var filesArray = event.dataTransfer.files;
            var fileLength = filesArray.length;
            for (var i=0; i < fileLength; i++) {
                sendFile(filesArray[i]);
            }
        }
    }
</script>
</html>