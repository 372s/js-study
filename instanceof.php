<?php

class A {

}

$a = new A();

var_dump($a instanceof A);
if ($a instanceof A) {
    var_dump($a);
}