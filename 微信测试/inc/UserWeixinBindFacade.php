<?php
class UserWeixinBindFacade{
	const WEIXIN_BIND = 120;
	
	//通过微信id获取绑定信息
	public static function getBindByWeixinName($iUser, $sWeixinName){
		if (empty($sWeixinName) || empty($iUser)){
			return false;
		}
		return UserWeixinBindPDO::getBindByWeixinName($iUser, $sWeixinName);
	}
	
	//添加微信绑定记录
	public static function addBindInfo($aWeixin){
		if($aWeixin['weixin_name'] == 'neuro'){
			//神内科
			$iPoint = 20; 
		} elseif($aWeixin['weixin_name'] == 'ymht'){
			//医脉互通不加麦粒
			$iPoint = 0; 
		}else{
			//添加麦粒
	    	$iPoint = 10;
		}
		if (!empty($iPoint)) {
			self::addPoint4WeixinBind($aWeixin['userid'], $aWeixin['branch_id'], $iPoint);
		}
		return UserWeixinBindPDO::addBindInfo($aWeixin);
	}
	
	//添加微信绑定记录
	public static function updBindInfo($iUser, $aWeixin){
		return UserWeixinBindPDO::updBindInfo($iUser, $aWeixin);
	}	
	public static function getBranchByName($sWeixinName){
		$aBranch = array(
	 		1 => 'heart', //心血管内科
			2 => 'neuro', //神经内科
			3 => 'gi', //消化科
			4 => 'liver', //肝病科
			5 => 'endocr', //内分泌科
			6 => 'cancer', //肿瘤科
			7 => 'hema', //血液科
			8 => 'psy', //精神科
			9 => 'pul', //呼吸科
			10 => 'neph', //肾内科
			11 => 'imm', //风湿免疫科
			12 => 'infect', //感染科
			13 => 'surgery', //普通外科
			14 => 'ns', //神经外科
			15 => 'chest', //胸心外科
			16 => 'uro', //泌尿外科
			17 => 'orth', //骨科
			18 => 'ps', //整形外科
			19 => 'anes', //麻醉科
			20 => 'obgyn', //妇产科
			21 => 'ped', //儿科
			22 => 'oph', //眼科
			23 => 'ent', //耳鼻咽喉科
			24 => 'oral', //口腔科
			25 => 'derm', //皮肤性病科
			26 => 'em', //急诊/重症
			27 => 'xctmr', //影像科
			28 => 'lab', //检验科
			99 => 'medlive', //主账号
			100 => 'ymht', 	//医脉互通主账号
		);
		if(empty($sWeixinName)){
			return false;
		}
		return array_search($sWeixinName, $aBranch);
	}
	//绑定微信后，添加麦粒
	public static function addPoint4WeixinBind($iUser, $iBranch, $iPoint=10){
		if(empty($iUser) || empty($iBranch)){
			return false;
		} 
		$aParam = array(
				'action'=>'dealScore',
				'score'=>0,
				'gold'=>$iPoint,
				'uid'=>$iUser,
				'typeid'=>self::WEIXIN_BIND,
				'bizid'=>$iBranch,
		);
		return AddPointAPI::exec($aParam);
	}

    /**
     * 获取微信绑定信息（新表）
     */
    public static function getBind($user_id, $unionid){
        return UserWeixinBindPDO::getBind($user_id, $unionid);
    }

    /**
     * 添加微信绑定信息（新表）
     */
    public static function addBind($aWeixin){
        return UserWeixinBindPDO::addBind($aWeixin);
    }
}