<?php


$array = [1, 2, 3];
echo implode(',', $array), "\n";

foreach ($array as &$value) {}    // 通过引用遍历
echo implode(',', $array), "\n";

foreach ($array as $value) {}     // 通过赋值遍历
echo implode(',', $array), "\n";