<?php
/**
 * 用户未登录，首先获取用户上次登录的记录，弹窗提示用户登录，实现快速登录，然后与微信绑定。
 * 用户强制登录
 */
Session::gate();
header('location: '. ($_GET['referer'] ?: $_SERVER['HTTP_HOST']));

