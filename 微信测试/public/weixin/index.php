<?php
define('WX_COOKIE_TIME', 60*5);

if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false) { // 微信浏览器
    if (!isset($_COOKIE['wx_user_info']) || empty($_COOKIE['wx_user_info'])) {
        getWxUserInfo ();
    }
}

function getWxUserInfo () {
    // 获取用户信息
    $info = $_GET['info'];
    if ($info) {
        $result = json_decode(base64_decode($info),true);
        $url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$result['access_token'].'&openid='.$result['openid'].'&lang=zh_CN';
        $data = json_decode(https_request($url), true);
        setcookie('wx_user_info', serialize($data), time()+WX_COOKIE_TIME);
    } else {
        $app_id = 'wx42742ffc0cfef3a';
        $state = 'http://' . $_SERVER['HTTP_HOST']. $_SERVER['REQUEST_URI'];
        if (strpos($_SERVER['REQUEST_URI'], '?') !== false) {
            $state .= '&info=';
        } else {
            $state .= '?info=';
        }
        $redirect_uri = 'http://wxpay.medlive.cn/api.php?action=callbackauthuserinfo';
        $url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$app_id."&redirect_uri=".urlencode($redirect_uri).
            "&response_type=code&scope=snsapi_userinfo&state=".base64_encode($state)."#wechat_redirect";
        header('location: ' .$url);
    }
}

function https_request($url) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl,  CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $data = curl_exec($curl);
    if ($data === false){
        return 'ERROR: '.curl_error($curl);
    }
    curl_close($curl);
    return $data;
}
?>