<?php
var_dump(1==1);die;
echo date('Y-m-d H:i:s', '1427472000');die;

$favcolor="green";
switch ($favcolor)
{
case "red":
    echo "你喜欢的颜色是红色!";
    break;
case "blue":
    echo "你喜欢的颜色是蓝色!";
    break;
case "green":
    echo "你喜欢的颜色是绿色!";
    break;
default:
    echo "你喜欢的颜色不是 红, 蓝, 或绿色!";
}


// echo rand(1,3);
$eot = <<< EOT
hello world!
EOT;
echo $eot;
?>

<script>
// document.write(Math.round(4.7)); // 四舍五入
document.write(Math.floor(Math.random()*3+1)); //
</script>