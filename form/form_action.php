<?php
$file = $_FILES['myfile'];
if (! is_dir('uploads/')) {
    mkdir('uploads/', 0777, true);
}
$ext = substr($file['name'], strrpos($file['name'], '.'));
$name = md5($file['name']) . $ext;
move_uploaded_file($_FILES['myfile']['tmp_name'], 'uploads/'.$name);
echo json_encode(array('name' => '/test_git/form/uploads/'.$name));