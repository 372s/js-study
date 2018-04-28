<?php
// page2.php

session_start();

echo 'Welcome to page #2<br />';

// session_unset删除所有session信息；unset()删除session某个参数数据；
// session_unset($_SESSION['favcolor']);
// unset($_SESSION['favcolor']);
session_destroy();
var_dump($_SESSION['favcolor']);

// 0： PHP_SESSION_DISABLED 会话是被禁用的。 
// 1： PHP_SESSION_NONE 会话是启用的，但不存在当前会话。 
// 2： PHP_SESSION_ACTIVE 会话是启用的，而且存在当前会话。 
// var_dump(session_status());

printf("%s，%s， %s", $_SESSION['favcolor'], $_SESSION['animal'], date('Y-m-d H:i:s', $_SESSION['time']));

session_write_close();
// 类似 page1.php 中的代码，你可能需要在这里处理使用 SID 的场景
echo '<br /><a href="session_page1.php">page 1</a>';
?> 