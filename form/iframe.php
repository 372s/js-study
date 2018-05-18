<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        label {
            display: inline-block;
            width: 150px;
            line-height: 25px;
            border: 1px solid grey;
            text-align:center;
            border-radius:3px;
        }
        .img {
            margin: 5px;
        }
    </style>
</head>
<body>
    <form action="form_action.php" target="iframe_id_1" method="post" enctype="multipart/form-data">
    <p>
        <label for="myfile"> 选择文件 </label>
        <input type="file" name="myfile" id="myfile" style="display:none;">
    </p>
</form>
<p class="container"> </p>
    <iframe frameborder="0" name="iframe_id_1" id="iframe_id_1" style="display:none;"></iframe>
</body>

<script>
    // console.log(window.URL);
    // console.log(document.URL);
    console.log(document.cookie);

    


    var myfile = document.getElementById('myfile');
    var $iframe = document.getElementById('iframe_id_1');
    myfile.onchange = function () {
        var _form = document.getElementsByTagName('form')[0];
        _form.submit();
    }
    $iframe.onload = function () {
        var response = (this.contentWindow || this.contentDocument).document.body.innerHTML;
        if (response) {
            response = JSON.parse(response);
        } else {
            response = {};
        }
        console.log(response);
        var _img = document.createElement('img');
        _img.width = 250;
        _img.classList.add('img');
        _img.src = response.name;
        document.getElementsByClassName('container')[0].appendChild(_img);
    }
</script>
</html>