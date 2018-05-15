<?php
// print_r($_FILES['myfile']);die;
$name= $_FILES["myfile"]["name"];
$type= $_FILES["myfile"]["type"];
$size= $_FILES["myfile"]["size"];
$temp= $_FILES["myfile"]["tmp_name"];
$error= $_FILES["myfile"]["error"];

if ($error > 0) {
    echo json_encode(array('name' => $error, 'error' => $error));die;
} else {
    move_uploaded_file($temp, "uploaded/" .$name);
    echo json_encode(array('name' => 0, 'error' => "uploaded/" .$name));die;
}