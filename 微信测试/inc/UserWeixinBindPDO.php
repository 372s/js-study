<?php
class UserWeixinBindPDO{
	public static function getBindByWeixinName($iUser, $sWeixinName){
		$oDB = DBz::getInstance('Passport');
		$sQuery = 'SELECT 
						* 
					FROM 
						p2p_user_weixin_bind
					WHERE 
						weixin_name = "'. addslashes($sWeixinName). '" 
						AND userid = '.intval($iUser);
		return $oDB->getRow($sQuery) ?  : array();
	}
	
	//添加微信绑定记录
	public static function addBindInfo($aWeixin){
		$oDB = DBz::getInstance('Passport');
		$sQuery = 'INSERT IGNORE INTO 
						p2p_user_weixin_bind 
					SET 
						userid = ' . intval($aWeixin['userid']) . ', 
						weixin_id = "' . addslashes($aWeixin['weixin_id']) . '", 
						ymht_id = "' . addslashes($aWeixin['ymht_id']) . '",
						union_id = "' . addslashes($aWeixin['union_id']) . '",
						weixin_name = "' . addslashes($aWeixin['weixin_name']) . '",
						date_create = NOW()';
		return $oDB->exec($sQuery);
	}

	//更新微信绑定记录
	public static function updBindInfo($iBiz, $aWeixin){
		$oDB = DBz::getInstance('Passport');
		$sQuery = 'UPDATE
						p2p_user_weixin_bind 
					SET 
						weixin_id = "' . addslashes($aWeixin['weixin_id']) . '",
						ymht_id = "' . addslashes($aWeixin['ymht_id']) . '",
						union_id = "' . addslashes($aWeixin['union_id']) . '"
					WHERE
						id = ' . intval($iBiz);
		return $oDB->exec($sQuery);
	}

    /**
     * 获取微信绑定信息（新表 user_weixin_bind）
     */
    public static function getBind($user_id, $unionid){
        $oDB = DBz::getInstance('Log');
        $sQuery = 'SELECT * FROM user_weixin_bind '.
            'WHERE user_id = ' .$user_id. ' and union_id = "'.addslashes($unionid).'" limit 1';
        return $oDB->getRow($sQuery);
    }

    /**
     * 添加微信绑定信息（新表 user_weixin_bind）
     */
    public static function addBind($aWeixin){
        $oDB = DBz::getInstance('Log');
        $sQuery = 'INSERT IGNORE INTO 
					user_weixin_bind 
					(user_id,weixin_id,open_id,union_id,weixin_name, `name`, date_create)
				values (
					' . $aWeixin['user_id'] . ', 
					"' . addslashes($aWeixin['weixin_id']) . '", 
					"' . addslashes($aWeixin['open_id']) . '",
					"' . addslashes($aWeixin['union_id']) . '",
					"' . addslashes($aWeixin['weixin_name']) . '",
					"' . addslashes($aWeixin['name']) . '",
					NOW() )';
        return $oDB->getInsertID($sQuery);
    }
}