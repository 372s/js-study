<?php
class Cart
{
    const PRICE_BUTTER  = 1.00;
    const PRICE_MILK    = 3.00;
    const PRICE_EGGS    = 6.95;

    public $products = array();
    
    public function add($product, $quantity)
    {
        $this->products[$product] = $quantity;
    }
    
    public function getQuantity($product)
    {
        return isset($this->products[$product]) ? $this->products[$product] :
               FALSE;
    }
    
    public function getTotal($tax)
    {
        $total = 0.00;
        
        $callback =
            function ($quantity, $product) use ($tax, &$total)
            {
                $pricePerItem = constant(__CLASS__ . "::PRICE_" . strtoupper($product));
                $total += ($pricePerItem * $quantity) * ($tax + 1.0);
            };
        
        array_walk($this->products, $callback);
        return round($total, 2);
    }
}

$my_cart = new Cart;
// 往购物车里添加条目
$my_cart->add('butter', 1);
$my_cart->add('milk', 3);
$my_cart->add('eggs', 6);

// 打出出总价格，其中有 5% 的销售税.
// print $my_cart->getTotal(0.05) . "\n";
// 最后结果是 54.29

$number = 1234.56;
$english_format_number = number_format($number);
echo $english_format_number . "\n";
$nombre_format_francais = number_format($number, 2, '.', ',');
echo $nombre_format_francais . "\n";
var_dump(intval($nombre_format_francais));


$iFile = 423411114323;
$sFileName = sprintf('%09d', $iFile);
echo $sFileName . "\n";
$aFileName = str_split($sFileName, 3);
print_r(implode('/', $aFileName));