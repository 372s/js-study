<textarea name="" id="" cols="30" rows="10">
<input type="button" value="确定" />
</textarea>

<?php

// $js = file_get_contents('array1.js');
if ($js = @file_get_contents('array1.js')) {
    echo 1;
} else {
    echo 0;
}
print_r(json_decode($js, true));die;

function array_insert(&$array, $position, $insert_array)
{
    $first_array = array_splice($array, 0, $position);
    // return $first_array;
    $array = array_merge($first_array, $insert_array, $array);
}

$arr = array(
    'tt' => 1333,
    'cc' => 333,
    'aaz' => 2333,
    'ee' => 78,
);
$temp["bb"] = 33;

print_r(array_slice($arr, 0, 1));
print_r(array_merge(array_slice($arr, 0, 1), $temp, $arr));

die;
array_insert($arr, 1, $temp);
print_r($arr);die;

$info = array(
    'autor' => array('name' => 'kkk'),
    'artical_type' => array('name' => ' 文章类型'),
    'durgtag' => array('name' => '  不良反应标签'),
    'catid' => array('name' => 234),
    'copyfrom' => array('name' => '来源'),
);
$drugs = array('category' => array('name' => '我不一样'));
// array_splice($info, 2, 0, $drugs);
array_insert($info, 2, $drugs);
print_r($info);die;

$badword = array(
    '李四', '习近平', '张三丰田',
);
$badword1 = array_combine($badword, array_fill(0, count($badword), '**'));
$bb = '我今天开着张三丰田上班，看见了李四再看习近平';
$str = strtr($bb, $badword1);
echo $str;

$arr = array_fill(0, count($badword), '**');
print_r($arr);

$a = 4;
$ar = [1, 2, 3];
if (in_array($a, $ar)) {
    $b = 1;
} elseif ($a != 5) {
    $b = 6;
} elseif ($a == 4) {
    $b = 4;
}
echo $b;
?>


