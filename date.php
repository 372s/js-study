<?php

/* 时间戳格式化 */
$date = new DateTime();
echo $date->getTimestamp() . "<br>"; // 获取时间戳 1523604211
echo $date->setTimestamp(1171502725)->format('U = Y-m-d H:i:s') . "<br>"; // 把时间戳格式化  1171502725 = 2007-02-15 01:25:25

//面向过程
$date_create = date_create();
echo date_format($date_create, 'U = Y-m-d H:i:s') . "<br>"; //1523604211 = 2018-04-13 07:23:31
echo date_timestamp_get(date_create()) . "<br>"; // 1523604255
echo time() . "<br>"; // 1523604255
echo microtime() . "<br>"; // 0.92173800 1523606156



// 把时间戳格式化
$ts = 1171502725;
$date = new DateTime("@$ts");
echo $date->format('U = Y-m-d H:i:s') . "\n";



die;
/* 时间增减 */
$date = new DateTime();
print_r($date->format('Y-m-d H:i:s') . "<br>"); // 当前时间
// print_r(strtotime($date)); // error

// 加10天
$date->add(new DateInterval('P10D'));
echo $date->format('Y-m-d H:i:s') . "<br>";

// 加1月
$date->add(new DateInterval('P1M'));
echo $date->format('Y-m-d H:i:s') . "<br>";

// 加1年
$date->add(new DateInterval('P1Y'));
echo $date->format('Y-m-d H:i:s') . "<br>";

// 加1周
$date->add(new DateInterval('P1W'));
echo $date->format('Y-m-d H:i:s') . "<br>";

// 加1小时
$date->add(new DateInterval('PT1H'));
echo $date->format('Y-m-d H:i:s') . "<br>";

// 加1分钟
$date->add(new DateInterval('PT1M'));
echo $date->format('Y-m-d H:i:s') . "<br>";

// 加1秒钟
$date->add(new DateInterval('PT1S'));
echo $date->format('Y-m-d H:i:s') . "<br>";



