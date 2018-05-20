<?php
// echo json_encode($_FILES['myfile']);die;
// print_r($_FILES['myfile']);die;
$name= $_FILES["myfile"]["name"];
$type= $_FILES["myfile"]["type"];
$size= $_FILES["myfile"]["size"];
$temp= $_FILES["myfile"]["tmp_name"];
$error= $_FILES["myfile"]["error"];

$error_msg = '';
if ($error > 0) {
    switch ($_FILES['myfile']['error']) {
        case 1:
            $error_msg = "上传文件大小超出配置文件规定值";
            break;
        case 2:
            $error_msg = "上传文件大小超出表单中的约定值";
            break;
        case 3:
            $error_msg = "上传文件不全";
            break;
        case 4:
            $error_msg = "没有上传文件";
            break;
    }
    echo json_encode(array('code' => 1, 'error' => $error_msg));
} else {
    if (! is_dir('uploaded/')) {
        mkdir('uploaded/', 0777, true);        
    }
    // $name = iconv("UTF-8","gb2312", $name);
    // $ext = substr($name, strrpos($name, '.'));
    $name = md5($name).strrchr($name, ".");  // 区别strstr()
    move_uploaded_file($temp, "uploaded/" .$name);
    echo json_encode(array('code' => 0, 'error' =>'', 'response' => "/test_git/upload/uploaded/" .$name));
}