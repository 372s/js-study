<?php

// ===================== get_called_class() =======================
abstract class dbObject
{
    const TABLE_NAME = 'undefined';

    public static function GetAll()
    {
        // $c = __CLASS__; //
        $c = get_called_class(); // 后期静态绑定（"Late Static Binding"）类的名称
        return "SELECT * FROM `" . $c::TABLE_NAME . "`";
    }
}

class dbPerson extends dbObject
{
    const TABLE_NAME = 'persons';
}

class dbAdmin extends dbPerson
{
    const TABLE_NAME = 'admins';
}

echo dbPerson::GetAll() . "<br>"; //output: "SELECT * FROM `persons`"
echo dbAdmin::GetAll() . "<br>"; //output: "SELECT * FROM `admins`"

// =====================  static ============================
class A
{
    const MY_CONST = false;
    public function my_const_self()
    {
        return self::MY_CONST;
    }
    public function my_const_static()
    {
        return static::MY_CONST;
    }
}

class B extends A
{
    const MY_CONST = true;
}

$b = new B();
echo $b->my_const_self() ? 'yes' : 'no' . "<br>"; // output: no
echo $b->my_const_static() ? 'yes' : 'no' . "<br>"; // output: yes

// ============================= $this ================================
class C
{
    const CONST_INT = 10;

    public function getSelf()
    {
        return self::CONST_INT;
    }

    public function getThis()
    {
        return $this::CONST_INT;
    }
}

class D extends C
{
    const CONST_INT = 20;

    public function getSelf()
    {
        return parent::getSelf();
    }

    public function getThis()
    {
        return parent::getThis();
    }
}

$d = new D();

print_r($d->getSelf()); //10
print_r($d->getThis()); //20
