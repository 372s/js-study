<?php

$mysqli = new mysqli('localhost', 'root', '', 'test');
$arr = array('id'=>123,'name'=>'我们都是中国人');
$value = json_encode_zh($arr);
var_dump($value);
var_dump($mysqli->query("insert into `bbb` (`name`) values('".$value."')"));

function json_encode_zh($array)
{
    if(version_compare(PHP_VERSION,'5.4.0','<')){
        $str = json_encode($array);
        $str = preg_replace_callback("#\\\u([0-9a-f]{4})#i",function($matchs){
                return iconv('UCS-2BE', 'UTF-8', pack('H4', $matchs[1]));
            },$str);
        return $str;
    }else{
        return json_encode($array, JSON_UNESCAPED_UNICODE);
    }
}