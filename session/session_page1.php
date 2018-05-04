<?php
// page1.php

session_start();

echo 'Welcome to page #1'. "\n\r";

$_SESSION['favcolor'] = 'green';
$_SESSION['animal']   = 'cat';
$_SESSION['time']     = time();

session_write_close();

print_r($_SERVER['PHP_SELF']);
// 如果使用 cookie 方式传送会话 ID
echo '<br /><a href="session_page2.php">page 2</a>';

// 如果不是使用 cookie 方式传送会话 ID，则使用 URL 改写的方式传送会话 ID
echo '<br /><a href="session_page2.php?' . SID . '">page 2</a>';
?> 