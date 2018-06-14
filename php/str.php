<?php

// $a = null;
$a = 0;
var_dump(isset($a));die;
echo md5_file('./Cart.php');die;

// 格式数字
$number = 1234.56;
$english_format_number = number_format($number);
echo $english_format_number . "\n";
$nombre_format_francais = number_format($number, 2, '.', ',');
echo $nombre_format_francais . "\n";
var_dump(intval($nombre_format_francais));


// 字符串处理
$iFile = 423411114323;
$sFileName = sprintf('%09d', $iFile);
echo $sFileName . "\n";
$aFileName = str_split($sFileName, 3);
print_r(implode('/', $aFileName));

// array_column();

echo "\n".(time()-1527053644);

// 随机数
echo rand(1,3);


// 定界符
$eot = <<< EOT
hello world!
EOT;
echo $eot;
?>

<script>
// document.write(Math.round(4.7)); // 四舍五入
// document.write(Math.floor(Math.random()*3+1)); // 随机数
</script>