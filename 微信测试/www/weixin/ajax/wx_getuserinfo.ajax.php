<?php
/**
 * Created by PhpStorm.
 * User: wangqiang
 * Date: 2018/4/20
 * Time: 17:54
 */

/**
 * 用户最后一次登录
 * 强制登录
 */
$aRtn = ApiUtilFacade::initRtnInfo();
/*$arr = getUserId('o49jot_2DFj1qVVUYzyEGhVUKyEA');
if ($arr) {
    $aRtn['data'] = Profile::getInfo($arr['user_id']);
    $aRtn['data']['avatar'] = $aRtn['data']['avatar'] ? Upload::getURL($aRtn['data']['avatar']) : $aRtn['data']['avatar'];
    $aRtn['data']['url'] = 'http://'.$_SERVER['HTTP_HOST'].'/weixin/forcelogin.php'.'?referer=' . urldecode($_SERVER['HTTP_REFERER']).
        '&hashid='. hashUser($arr['user_id'], 'dasfgfsdbz') .'&checkid='. hashUser($arr['user_id'], 'hiewrsbzxc');
}*/

if (isset($_COOKIE['wx_user_info']) && !empty($_COOKIE['wx_user_info'])) {
    $data = unserialize($_COOKIE['wx_user_info']);
    $arr = getUserId($data['unionid']);
    if ($arr) {
        $aRtn['data'] = Profile::getInfo($arr['user_id']);
        $aRtn['data']['avatar'] = $aRtn['data']['avatar'] ? Upload::getURL($aRtn['data']['avatar']) : $aRtn['data']['avatar'];
        $aRtn['data']['url'] = 'http://'.$_SERVER['HTTP_HOST'].'/weixin/forcelogin.php'.'?referer=' . urldecode($_SERVER['HTTP_REFERER']).
            '&hashid='. hashUser($arr['user_id'], 'dasfgfsdbz') .'&checkid='. hashUser($arr['user_id'], 'hiewrsbzxc');
    }
}

ApiUtilFacade::echoData($aRtn);

/* 获取最后一次登录的用户 */
function getUserId($unionid) {
    $oDB = DBz::getInstance('Log');
    $sQuery = 'select user_id from 
        			user_weixin_bind 
        			where union_id = "'. $unionid .'"
        		order by id desc limit 1';
    return $oDB->getRow($sQuery);
}
