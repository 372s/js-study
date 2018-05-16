<script src="js-md5.js"></script>
<script src="md5.js"></script>
<!-- HTML -->
<form action="form_do.php" id="login-form" method="post" onsubmit="return checkForm();" enctype="multipart/form-data">

    <p>username: <input type="text" id="username" name="username"></p>

    <p>password: <input type="password" id="input-password" name="pwd"></p> 

    <p><input type="hidden" id="md5-password" name="password"></p>
    
    
    <p>图片预览：</p>
    <p><div id="test-image-preview" style="border: 1px solid #ccc; width: 100%; height: 200px; background-size: contain; background-repeat: no-repeat; background-position: center center;"><img src="" id="preview"></div></p>
    <p>
        <input type="file" id="test-image-file" name="test">
    </p>
    <p id="test-file-info"></p>

    <p><button type="submit">Submit</button></p>
</form>

<script>
function checkForm() {
    var username = document.getElementById('username');
    var input_pwd = document.getElementById('input-password');
    var md5_pwd = document.getElementById('md5-password');

    if (! username.value) {
        alert('请填写昵称');
        return false;
    }
    if (! input_pwd.value) {
        alert('请填写密码');
        return false;
    }
    //md5_pwd.value = toMD5(input_pwd.value);
    md5_pwd.value = md5(input_pwd.value);
    input_pwd.value = hex_md5(input_pwd.value);
    return true;

}


var fileInput = document.getElementById('test-image-file');
fileInput.addEventListener('change', function () {
    
    var info = document.getElementById('test-file-info');
    var preview = document.getElementById('test-image-preview');

    preview.style.backgroundImage = '';
    if (!fileInput.value) {
        info.innerHTML = '没有选择文件';
        return;
    }
    var file = fileInput.files[0];
    info.innerHTML = '文件: ' + file.name + '<br>' +
                        '大小: ' + file.size + '<br>' +
                        '修改: ' + file.lastModifiedDate;
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        alert('不是有效的图片文件!');
        return;
    }

    if(typeof FileReader == "undefined"){  
        //alert("您的浏览器不支持FileReader对象！"); 
        var wuc = window.URL.createObjectURL(file);
        preview.style.backgroundImage = 'url(' + wuc + ')';
        preview.onload = (function () {
            window.URL.revokeObjectURL(wuc);
            console.log(wuc);
        })(); /*当图片加载后释放内存空间，但在jQuery3.2.1中会报错。浏览器关闭后也会自动释放*/
        
    } else {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) { // 当文件读取完成后，自动调用此函数:
            var data = e.target.result;
            console.log(e);
            //index = data.indexOf(';base64,');
            preview.style.backgroundImage = 'url(' + data + ')';
        };
    }
    
});

</script> 

