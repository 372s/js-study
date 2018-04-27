<?php
$b = [1,2,3];
$a = &$b[2];
$a = 1;
echo $b[2];die;
$array1 = array(1,2);
$x = &$array1[1]; // Unused reference
$array2 = $array1; // reference now also applies to $array2 !
$array2[1]=22; // (changing [0] will not affect $array1)
 print_r($array1);die;

$array = [
    0 => 'php',
    1 => 123,
    2 => 456,
    3 => 789,
];

foreach ($array as $key => &$value) {
    // echo "key=$key, value=$value" . "<br>";
}// 通过引用遍历
var_dump($array);
#begin first foreach
// $value = &$array[0];
// echo $value;
//noop
// $value = &$array[1];
// echo $value;
//noop
// $value = &$array[2];
#end foreach
// echo $value;
// echo implode(',', $array), "\n";
// echo $value;
// unset($value);
foreach ($array as $key => $value) {
    // echo "key=$key, value=$value" . "<br>";
}     // 通过赋值遍历
// echo implode(',', $array), "\n";
var_dump($array);