<?php
// $worknum = 5;
// switch ($worknum) {
//     case $worknum < 10:
//         echo $name = '小于10';
//         break;
//     case $worknum > 10:
//         echo $name = '大于10';
//         break;
// }

/**
 * 当$a=0时，switch判断为false，这是，case条件中，只有false情况下才会执行
 */
$a = 0;
switch (true) {
    case $a >= 0:
        echo 0;
        break;
    case $a >= 10:
        echo 1;
        break;
    default:
        echo 2;
        break;
}
// 0

$a = 0;
switch ($a) {
    case $a >= 0:
        echo 0;
        break;
    case $a >= 10:
        echo 1;
        break;
    default:
        echo 2;
        break;
}
// 1

/**
当$price大于0时程序没有任何问题，当$price等于0时最终的结果不是预期的"100以下",而是"1000以上"。
问题的原因就是switch case在执行的流程是 switch 位置的条件和 case 位置的条件做比较，再继续执行程序。
a.当$price大于0时，switch位置的条件为“真” true，然后用true 和 case 位置的条件作比较。这时程序是没有问题的，因为只要case位置的条件为true语句就跳出了。
b.当$price等于0时，就需要注意了。这个时候switch位置的条件为“假” false，语句继续执行的时候，只有当 case 位置的条件也为false 程序才会执行 case 冒号位置后的程序。而事实是 case 位置的所有调教都为“真”，所以最终的结果是执行default冒号后的语句。
 */
$price = 0;
switch ($price) {
    case $price <= 100:
        $price_between = "100以下";
        break;
    case $price <= 300:
        $price_between = "100-300";
        break;
    case $price <= 500:
        $price_between = "300-500";
        break;
    case $price <= 800:
        $price_between = "500-800";
        break;
    case $price < 1000:
        $price_between = "800-1000";
        break;
    default:
        $price_between = "1000以上";
}
echo $price_between; // "1000以上"

// 把 switch 位置的值由 $price 改成了 true ，这样问题就解决了。
$price = 0;
switch (true) {
    case $price <= 100:
        $price_between = "100以下";
        break;
    case $price <= 300:
        $price_between = "100-300";
        break;
    case $price <= 500:
        $price_between = "300-500";
        break;
    case $price <= 800:
        $price_between = "500-800";
        break;
    case $price < 1000:
        $price_between = "800-1000";
        break;
    default:
        $price_between = "1000以上";
}
echo $price_between; // "100以下"
