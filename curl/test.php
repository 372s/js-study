<?php
require_once 'CurlClass.php';

$curl = new Curl();
$res = $curl->https_get('api.medlive.cn/guideline/text_guide_info_v2.ajax.php?id=1000');
print_r(json_decode($res, true));
