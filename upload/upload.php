<?php
// echo json_encode($_FILES['myfile']);die;
// print_r($_FILES['myfile']);die;
$name= $_FILES["myfile"]["name"];
$type= $_FILES["myfile"]["type"];
$size= $_FILES["myfile"]["size"];
$temp= $_FILES["myfile"]["tmp_name"];
$error= $_FILES["myfile"]["error"];

if ($error > 0) {
    echo json_encode(array('code' => 1, 'error' => $error));
} else {
    // $name = iconv("UTF-8","gb2312", $name);
    $ext = substr($name, strrpos($name, '.'));
    $name = md5($name).$ext;
    move_uploaded_file($temp, "uploaded/" .$name);
    echo json_encode(array('code' => 0, 'error' =>'', 'response' => "/test_git/upload/uploaded/" .$name));
}