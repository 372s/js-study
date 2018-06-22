### 1. PHP header设置Content-Type
```php
//php的header函数之设置content-type
//定义编码  
header( 'Content-Type:text/html;charset=utf-8 ');  
  
//Atom  
header('Content-type: application/atom+xml');  
  
//CSS  
header('Content-type: text/css');  
  
//Javascript  
header('Content-type: text/javascript');  
  
//JPEG Image  
header('Content-type: image/jpeg');  
  
//JSON  
header('Content-type: application/json');  
  
//PDF  
header('Content-type: application/pdf');  
  
//RSS  
header('Content-Type: application/rss+xml; charset=ISO-8859-1');  
  
//Text (Plain)  
header('Content-type: text/plain');  
  
//XML  
header('Content-type: text/xml');  
  
// ok  
header('HTTP/1.1 200 OK');  
  
//设置一个404头:  
header('HTTP/1.1 404 Not Found');  
  
//设置地址被永久的重定向  
header('HTTP/1.1 301 Moved Permanently');  
  
//转到一个新地址  
header('Location: http://www.example.org/');  
  
//文件延迟转向:  
header('Refresh: 10; url=http://www.example.org/');  
print 'You will be redirected in 10 seconds';  
  
//当然，也可以使用html语法实现  
// <meta http-equiv="refresh" content="10;http://www.example.org/ />  
  
// override X-Powered-By: PHP:  
header('X-Powered-By: PHP/4.4.0');  
header('X-Powered-By: Brain/0.6b');  
  
//文档语言  
header('Content-language: en');  
  
//告诉浏览器最后一次修改时间  
$time = time() - 60; // or filemtime($fn), etc  
header('Last-Modified: '.gmdate('D, d M Y H:i:s', $time).' GMT');  
  
//告诉浏览器文档内容没有发生改变  
header('HTTP/1.1 304 Not Modified');  
  
//设置内容长度  
header('Content-Length: 1234');  
  
//设置为一个下载类型  
header('Content-Type: application/octet-stream');  
header('Content-Disposition: attachment; filename="example.zip"');  
header('Content-Transfer-Encoding: binary');  
// load the file to send:  
readfile('example.zip');  
  
// 对当前文档禁用缓存  
header('Cache-Control: no-cache, no-store, max-age=0, must-revalidate');  
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past  
header('Pragma: no-cache');  
  
//设置内容类型:  
header('Content-Type: text/html; charset=iso-8859-1');  
header('Content-Type: text/html; charset=utf-8');  
header('Content-Type: text/plain'); //纯文本格式  
header('Content-Type: image/jpeg'); //JPG***  
header('Content-Type: application/zip'); // ZIP文件  
header('Content-Type: application/pdf'); // PDF文件  
header('Content-Type: audio/mpeg'); // 音频文件  
header('Content-Type: application/x-shockw**e-flash'); //Flash动画  
  
//显示登陆对话框  
header('HTTP/1.1 401 Unauthorized');  
header('WWW-Authenticate: Basic realm="Top Secret"');  
print 'Text that will be displayed if the user hits cancel or ';  
print 'enters wrong login data';
```

### 2. 下载xlsx文件
```php
$filename = rtrim($_SERVER['DOCUMENT_ROOT'],'/').'/app/files/payment_status.csv';  
header('Content-Disposition: attachment; filename=payment_status.xlsx');  
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');  
header('Content-Length: ' . filesize($filename));  
header('Content-Transfer-Encoding: binary');  
header('Cache-Control: must-revalidate');  
header('Pragma: public');  
readfile($filename);
```

### 3. PHP 跨域请求的设置
```php
// 指定允许其他域名访问  
header('Access-Control-Allow-Origin:*');  
// 响应类型  
header('Access-Control-Allow-Methods:POST');  
// 响应头设置  
header('Access-Control-Allow-Headers:x-requested-with,content-type');  

headers: {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" }

<?php  
$ret = array(  
    'name' => isset($_POST['name'])? $_POST['name'] : '',  
    'gender' => isset($_POST['gender'])? $_POST['gender'] : ''  
);  
  
header('content-type:application:json;charset=utf8');  
  
$origin = isset($_SERVER['HTTP_ORIGIN'])? $_SERVER['HTTP_ORIGIN'] : '';  
  
$allow_origin = array(  
    'http://www.client.com',  
    'http://www.client2.com'  
);  
  
if(in_array($origin, $allow_origin)){  
    header('Access-Control-Allow-Origin:'.$origin);  
    header('Access-Control-Allow-Methods:POST');  
    header('Access-Control-Allow-Headers:x-requested-with,content-type');  
}  
  
echo json_encode($ret);  
?>  
```


