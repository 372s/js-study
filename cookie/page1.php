<?php
// $value = 'something from somewhere';
// setcookie("TestCookie", $value, time()-1, '/');
// echo $_COOKIE["TestCookie"];die;
// // 打印一个单独的 Cookie
// // echo $_COOKIE["TestCookie"] . PHP_EOL;
// //  debug/test 查看所有 Cookie 的另一种方式
// // print_r($_COOKIE);
// // session_start();
// // echo session_id();
// // session_commit();
// 
?>
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
<script>
// setWxCookie("_wx_window_click_");
delWxCookie("_wx_window_click_");
if (getWxCookie('_wx_window_click_') == null) { // || getWxCookie('_wx_window_click_') == null // null不能用===
	alert("无");
} else {
	alert("有");
}

// 存cookie，记录弹框
function setWxCookie(name)
{
    var date = new Date();  //获取当前时间
    date.setTime(date.getTime()+300*1000); //获取30秒后的时间戳
    document.cookie = name+"=1;expires="+date.toGMTString();
}

// 定义一个函数，用来读取特定的cookie值。
function getWxCookie(cookie_name)
{
    var cookies = document.cookie ? document.cookie.split(';') : [];
    var c;
    for(var i=0; i<cookies.length; i++){
        c = cookies[i].split('=');
        if (c[0].replace(' ', '') === cookie_name) {
            return c[1];
        }
    }
}

function delWxCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getWxCookie(name);
	if(cval != null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
</script>