<?php

$badword = array(
    '李四', '习近平', '张三丰田',
);
$badword1 = array_combine($badword, array_fill(0, count($badword), '**'));
$bb = '我今天开着张三丰田上班，看见了李四再看习近平';
$str = strtr($bb, $badword1);
echo $str;

$arr = array_fill(0, count($badword), '**');
print_r($arr);
