<?php
$value = 'something from somewhere';
setcookie("TestCookie", $value, time()-1, '/');
echo $_COOKIE["TestCookie"];die;
// 打印一个单独的 Cookie
// echo $_COOKIE["TestCookie"] . PHP_EOL;
//  debug/test 查看所有 Cookie 的另一种方式
// print_r($_COOKIE);
// session_start();
// echo session_id();
// session_commit();
// 
?>
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>

<style>
	.wx_shadow { background-color: #ddd;  position: fixed; width: 100%; height: 100%; z-index: 100; opacity: 0.5;left: 0;top: 0;}
	.wx_pop_box { background-color: #fff;  position: fixed; width: 300px; height: 200px; z-index: 100; top:39%; left:39%; border-radius: 5px;}
	.wx_pop_cont {text-align: center; height: 150px; width: 300px; line-height: 150px; font-size: 20px;}
	.wx_pop_btm {width:300px; line-height: 50px; text-align: center; }
	/*input {border: 1px #ddd solid; line-height: 40px; background-color: #fff; width: 100%;margin-bottom: 200px;}*/
	input {
		/*background-color: #4CAF50;*/
		background-color: #fff;
	    /*border: none;*/
	    border: 1px solid #ddd;
	    /*color: white;*/
	    padding: 15px 32px;
	    margin: 0px 20px;
	    text-align: center;
	    text-decoration: none;
	    display: inline-block;
	    font-size: 16px;
	    line-height: 6px;
	    border-radius: 5px;
	    cursor:pointer;
	}
</style>
<div class="wx_shadow"></div>
<div class="wx_pop_box">
	<div class="wx_pop_cont">
		是否要绑定微信帐号？
	</div>
	<div class="wx_pop_btm">
		<input class="" type="button" value="确定">
		<input class="" type="button" value="取消">
	</div>
</div>

<script>
	$(function() {

	});
</script>