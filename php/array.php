<?php
/* 引用 */
function &test(){
    static $b=0;//申明一个静态变量
    $b=$b+1;
    echo $b;
    return $b;
}

$a=test();//这条语句会输出　$b的值　为１
$a=5;
$a=test();//这条语句会输出　$b的值　为2

$a=&test();//这条语句会输出　$b的值　为3
$a=5;
$a=test();//这条语句会输出　$b的值　为6
die;
class nowamagic
  {
    public static $nm = 0;
    function nmMethod()
    {
      self::$nm ++ ;
      echo self::$nm . '<br />';
    }
  }
  $nmInstance = new nowamagic();
  $nmInstance -> nmMethod();
  $nmInstance = new nowamagic();
  $nmInstance -> nmMethod();
  die;
// 例子1：如果$a引用两次$b都是1；加上引用第二次$b为101
function test(&$a) {
    $a = $a + 100;
}
$b = 1;
echo $b;
test($b);
echo $b;

// 例子3
function boo(){
    static $b=0;//申明一个静态变量
    $b=$b+1;
    return $b;
}
print_r(boo());
print_r(boo());
print_r(boo());die;


$key = array('d', '3');
$input_array = array('a', 'b');
// print_r(array_chunk($input_array, 10));
// print_r(array_chunk($input_array, 2, true));

// print_r(array_combine($key, $input_array));



//////////////////////////
$a = array_fill(5, 6, '****');
$b = array_fill(-1, 4, 'pear');
// print_r($a);
// print_r($b);

$keys = array('foo', 5, 10, 'bar');
$a = array_fill_keys($keys, 'banana');
// print_r($a);


//////////////////////////
$badword = array(
    '李四','习近平','张三丰田'
);
$badword1 = array_combine($badword, array_fill(0, count($badword), '**'));
$bb = '我今天开着张三丰田上班，看见了李四再看习近平';
$str = strtr($bb, $badword1);
// echo $str;

$addr = '123412341234';
$addr = strtr($addr, "", "saa");
// var_dump($addr);

/////////////////////////////
function odd($var)
{
    // returns whether the input integer is odd
    return($var & 1);
}

function even($var)
{
    // returns whether the input integer is even
    return(!($var & 1));
}

$array1 = array("a"=>1, "b"=>2, "c"=>3, "d"=>4, "e"=>5);
$array2 = array(6, 7, 8, 9, 10, 11, 12);

// echo "Odd :\n";
// print_r(array_filter($array1, "odd"));
// echo "Even:\n";
// print_r(array_filter($array2, "even"));

// 例子1
$tmp = array(' AAAA BBBB CCCC ', 'aaaa bbbb c ', ' dddddd eeeeee');

function array_walk_func(&$v, $k) {
    $v = trim($v);
}
array_walk($tmp, 'array_walk_func');
// var_dump($tmp);

// 例子2
$fruits = array("d" => "lemon", "a" => "orange", "b" => "banana", "c" => "apple");

function test_alter(&$item1, $key, $prefix)
{
    $item1 = "$prefix: $item1"; // 改变本身
}

function test_print($item2, $key)
{
    echo "$key. $item2<br />\n"; // 不改变本身
}

array_walk($fruits, 'test_print');
array_walk($fruits, 'test_alter', 'fruit');
// var_dump($fruits);



