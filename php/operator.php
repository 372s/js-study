<?php 
/**
 * 使用 ... 运算符定义变长参数函数
 * @param 
 * @param
 */
function f($req, $opt = null, ...$params) {
    // $params 是一个包含了剩余参数的数组
    printf('$req: %d; $opt: %d; number of params: %d'."\n",
           $req, $opt, count($params));
}

f(1);
f(1, 2);
f(1, 2, 3);
f(1, 2, 3, 4);
f(1, 2, 3, 4, 5);

/*
$req: 1; $opt: 0; number of params: 0
$req: 1; $opt: 2; number of params: 0
$req: 1; $opt: 2; number of params: 1
$req: 1; $opt: 2; number of params: 2
$req: 1; $opt: 2; number of params: 3
*/

// 举个例子
function add($a, $b, $c) {
    return $a + $b + $c;
}

$operators = [2, 3];
echo add(1, ...$operators); // 6