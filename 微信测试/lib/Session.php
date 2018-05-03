<?php

// $Id: Session.php 61 2010-04-26 10:15:32Z zhengkai $

/**
 * Session
 *
 * @category passport
 * @package base
 */
class Session {
	
	private static $_iUser = NULL;
	
	public static $token_info = NULL;
	
	public static function auth($gate = FALSE) {
		if (is_numeric(self::$_iUser)) {
			if (self::$_iUser > 0) {
				self::setYmtInfo();
				return TRUE;
			}
			if (!$gate) {
				self::setYmtInfo();
				return FALSE;
			}
		}
		
		self::$token_info = NULL;
		//有token验证的也算已经登录的
		$sToken = self::isTokenAuth();
    	if (!empty($sToken)) {
			$aTokenInfo = AppDataFacade::validateUserInfoByToken($sToken);
			self::$token_info = $aTokenInfo;
			if (empty($aTokenInfo['err_msg'])) {
				self::$_iUser = $aTokenInfo['user_info']['id'];
				self::setYmtInfo();
				return TRUE;
			}	
        }
        
		//有hashid,checkid 验证的也算已经登录的
		$sToken = self::isHashAuth();
    	if (!empty($sToken)) {
    		$iUser = ForceLoginFacade::userCheck($_REQUEST['hashid'], $_REQUEST['checkid']);
			if (!empty($iUser)) {
				//userhash
				setcookie('userhash', EncryptFacade::aesEncrypt($_REQUEST['hashid']. '-' . $_REQUEST['checkid'],'mobile'), time()+60*60*24*30, '/', DOMAIN_MOBILE);
				self::$_iUser = $iUser;
				$aUser = Passport::id($iUser, TRUE);
				self::$token_info = $aUser;
				self::setYmtInfo();
				return TRUE;
			}	
        }
        
        //cookieauth
		$sToken = self::isCookieAuth();
    	if (!empty($sToken)) {
    		$sToken = EncryptFacade::aesDecrypt($sToken, 'mobile');
    		$aHash = explode('-', $sToken);
    		$iUser = ForceLoginFacade::userCheck($aHash[0], $aHash[1]);
			if (!empty($iUser)) {
				self::$_iUser = $iUser;
				$aUser = Passport::id($iUser, TRUE);
				self::$token_info = $aUser;
				self::setYmtInfo();
				return TRUE;
			}
        }        
        

		self::$_iUser = 0;
		
		$iUser = SessionCAS::auth($gate);
		
		$aUser = Passport::id($iUser, TRUE);
		if (empty($aUser)) {
			self::setYmtInfo();
			return FALSE;
		}

		self::$token_info = $aUser;

		self::$_iUser = $iUser;
		
		// 每隔 3 分钟，在在线列表上刷新下自己
		
		// memcache item 的过期时间是 10 分钟
		// 但只要超过 3 分钟，就重新延长 item 过期时间，以及插库
		
		// 这样判断是否在线的时候直接看 memcache 是否存在，而不访问数据库
		// 注意，为了保证操作不至太频繁，结果不是非常精确的
		// 但即使最差的情况下，也保证至少 10 - 3 = 7 分钟内用户活动过
		
		UserOnlineFacade::syncOnlineState($iUser);
		self::setYmtInfo();
		return TRUE;
	}
	
	public static function isTokenAuth(){
		if (!empty($GLOBALS['__auth_token__'])) {
			return $GLOBALS['__auth_token__'];
		} 
		if (!empty($_REQUEST['token'])) {
			return $_REQUEST['token'];
		} 
		return '';
	}
	
	public static function isHashAuth(){
		if (!empty($GLOBALS['__auth_hashid__']) && 
		    !empty($GLOBALS['__auth_checkid__'])) {
			return $GLOBALS['__auth_hashid__'];
		} 
		if (!empty($_REQUEST['hashid']) &&
			!empty($_REQUEST['checkid'])) {
			return $_REQUEST['hashid'];
		} 
		return '';
	}
	
	public static function isCookieAuth(){
		if (!empty($GLOBALS['__auth_cookie__'])) {
			return $GLOBALS['__auth_cookie__'];
		} 
		if (!empty($_COOKIE['userhash'])) {
			return $_COOKIE['userhash'];
		} 
		return '';
	}
	
	public static function gate() {
		return self::auth(true);
	}
	
	public static function toggleURI($uri = '') {
	}
	
	public static function go($bRedirect = FALSE) {
		// 如果在未登录页访问本站某个 URI，则跳转到 登录/注册 页面，本方法用于登录后跳回最初访问的页面。
		$sURI = '/';
		if (!empty($_POST['returnUrl'])) {
			$sURI = $_POST['returnUrl'];
		}
		if ($bRedirect) {
			if ($sURI == '/platform/') {
				$sURI = du(DOMAIN_MYMEDLIVE) . '/mymedlive/index.php';
			}
			Page::redirect($sURI);
		}
		return $sURI;
	}
	
	public static function info($sKey = 'all') {
		self::auth();
		if (self::$_iUser < 1) {
			return FALSE;
		}
		$aInfo = array('id' => self::$_iUser) + Passport::id(self::$_iUser);
		if ($sKey != 'all' && array_key_exists($sKey, $aInfo)) {
			return $aInfo[$sKey];
		}
		return $aInfo;
	}
	
	public static function id() {
		if (!self::auth()) {
			return 0;
		}
		return self::$_iUser;
	}
	
	public static function autoLoginWithUserId($iUser) {
		SessionCAS::autoLoginWithUserId($iUser);
	}
	
	public static function saveCookie($iUser, $sPassword, $bSave = FALSE) {
		self::autoLoginWithUserId($iUser);
	}
	
	public static function cleanCookie() {
		SessionCAS::logout();
	}
	
	public static function validateLogout() {
		SessionCAS::validateLogout();
	}
	
	public static function force_login($iUser) {
		return SessionCAS::force_login($iUser);
	}
	
	public static function private_login($usr, $pwd, $rememberme = FALSE, &$blocked = NULL) {
		return SessionCAS::private_login($usr, $pwd, $rememberme, $blocked);
	}
	
	public static function setYmtInfo() {
		//取得客户端辅助信息
		$sYmtExtInfo = sg($_COOKIE['ymtinfo'], '');
		//设置ymtinfo的信息
		if (!empty($sYmtExtInfo)) {
			$aYmtExtInfo = json_decode(base64_decode(urldecode($sYmtExtInfo)), true);
		} else {
			$aYmtExtInfo = '';
		}
		// 添加微信unionid
        $wx = sg($_COOKIE['wx_user_info'], '');
		$wx = $wx ? unserialize($wx) : '';
		$aDefault = array(
			'uid' => strval(empty(self::$_iUser)?0:self::$_iUser),	
			'resource' => 'web',
			'app_name' => 'medlive_mobile',
			'ext_version' => '2',
            'unionid' => $wx ? $wx['unionid'] : '',
		);
		if (!empty($aYmtExtInfo['resource'])) {
			$aDefault['resource'] = $aYmtExtInfo['resource']; 
		}
		if (!empty($aYmtExtInfo['app_name'])) {
			$aDefault['app_name'] = $aYmtExtInfo['app_name']; 
		}
	    if (TANGO_ENV != 'production') {
            $sDomain = 'medlive.test';
        } else {
        	$sDomain = 'medlive.cn';
        }
        $sNewCookie = base64_encode(json_encode($aDefault));
        if ($sNewCookie != $sYmtExtInfo) {
			setcookie('ymtinfo', $sNewCookie, -1, '/', $sDomain);
        }	
		return true;
	}
	
	/**
	 * 返回用户ip
	 */
	public static function ip() {
		if (getenv('HTTP_CLIENT_IP') && strcasecmp(getenv('HTTP_CLIENT_IP'), 'unknown')) {
			$ip = getenv('HTTP_CLIENT_IP');
		} elseif (getenv('HTTP_X_FORWARDED_FOR') && strcasecmp(getenv('HTTP_X_FORWARDED_FOR'), 'unknown')) {
			$ip = getenv('HTTP_X_FORWARDED_FOR');
		} elseif (getenv('REMOTE_ADDR') && strcasecmp(getenv('REMOTE_ADDR'), 'unknown')) {
			$ip = getenv('REMOTE_ADDR');
		} elseif (isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], 'unknown')) {
			$ip = $_SERVER['REMOTE_ADDR'];
		}
		return preg_match("/[\d\.]{7,15}/", $ip, $matches) ? $matches[0] : 'unknown';
	}
}