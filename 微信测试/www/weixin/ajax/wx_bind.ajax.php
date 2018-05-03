<?php
/**
 * 用户登录 绑定微信
 * 1、查旧表
 * 2、查新表
 */

if (! defined('WX_COOKIE_TIME')) {
    define('WX_COOKIE_TIME', 60*60*24*30);
}

$user_id = intval($_GET['user_id']);
$aRtn = ApiUtilFacade::initRtnInfo();
if ($user_id && isset($_COOKIE['wx_user_info']) && !empty($_COOKIE['wx_user_info'])) {
    $data = unserialize($_COOKIE['wx_user_info']);
    $cookie_name = md5('wx'.$user_id.$data['unionid']);
    if (!isset($_COOKIE[$cookie_name]) || $_COOKIE[$cookie_name] !== 'DONE') {
        // 查旧表
        $getBindOfP2p = getBindOfP2p($user_id, $data['unionid']);
        if (empty($getBindOfP2p)) {
            // 新表
            $aWeixin = array(
                'weixin_id' => '',
                'open_id' => $data['openid'],
                'union_id' => $data['unionid'],
                'weixin_name' => 'medlive',
                'name' => $data['nickname'],
                'user_id'=> $user_id,
            );
            UserWeixinBindFacade::addBind($aWeixin);
        }
        setcookie($cookie_name, 'DONE', time()+WX_COOKIE_TIME);
    }

}
ApiUtilFacade::echoData($aRtn);


// 获取旧表中绑定信息
function getBindOfP2p($user_id, $unionid){
    $oDB = DBz::getInstance('Passport');
    $sQuery = 'SELECT * FROM user_weixin_bind '.
        'WHERE userid = ' .$user_id. ' and union_id = "'.addslashes($unionid).'" limit 1';
    return $oDB->getRow($sQuery);
}