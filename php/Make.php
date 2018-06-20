<?php

class Make {

    public static $name = 1;

    public function __construct() {
        $this->name = 3;
    }

    public function ok() {

    }
}
echo Make::$name;die;

$m = new Make();
echo $m->name;
// 静态变量不能改变属性