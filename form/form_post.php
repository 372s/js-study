<?php

$arr = ['post' => $_POST, 'file' => $_FILES['avatar']['name']];
// $post = $_POST;
// $file = $_FILES;
echo json_encode($arr);