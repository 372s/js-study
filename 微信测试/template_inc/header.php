<?php 
$aTango['page_title'] = sg($aTango['page_title'],'医脉通');
$aTango['page_keyword'] = sg($aTango['page_keyword'],'医脉通,临床进展,用药参考,临床指南,医学文献,病例,医生论坛,医学会议,诊疗知识库,pubmed中文版,pubmed数据库,医学调研,医学软件,医生圈');
$aTango['page_description'] = sg($aTango['page_description'],'医脉通，医生的学术秘书，为医生提供专业的医学信息服务，包括疾病诊疗知识、病例讨论、医学前沿资讯、医学资源下载、医学文献检索、全文与翻译、医生在线交流与讨论，节省医生的工作和学习的时间，提高效率，减轻医生压力。');
?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
	<title><?php echo $aTango['page_title'];?></title>
	<meta name="keywords" content="<?php echo $aTango['page_keyword'];?>" />
	<meta name="description" content="<?php echo $aTango['page_description'];?>" />
	<link rel="stylesheet" href="/css/common.css">
	<link rel="stylesheet" href="/css/swiper.min.css">
	<script type="text/javascript" src="/js/swiper.min.js"></script>
	<script type="text/javascript" src="/js/jquery.js"></script>
	<script type="text/javascript" src="/js/common.js"></script>
	<script src="<?php echo du(DOMAIN_WEBRES, true).'/jquery.cookie.js';?>" type="text/javascript"></script>
	<!-- <script type="text/javascript" name="baidu-tc-cerfication" src="http://apps.bdimg.com/cloudaapi/lightapp.js#ed7a841bfb4cafcf321ac687b5e916ca"></script> -->
	<?php
	if (TANGO_ENV == 'production') {
	?>
	<script>
	var _hmt = _hmt || [];
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "//hm.baidu.com/hm.js?62d92d99f7c1e7a31a11759de376479f";
	  var s = document.getElementsByTagName("script")[0];
	  s.parentNode.insertBefore(hm, s);
	})();
	</script>
	<?php
	}
	?>
	<script>
		var _medlive_userid = <?php echo Session::id();?>; //用户在JS中使用
	</script>
    <?php
    $uri = $_SERVER['SCRIPT_NAME'];
    if (strpos(strtolower($uri), 'guide2') === FALSE && strpos(strtolower($uri), 'branch2') === FALSE) {
    ?>
        <script type="text/javascript" src="/weixin/js/wechat_bind_s.js"></script>
    <?php } ?>
</head>

<body>
<?php if (strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false) { // 微信浏览器 ?>
<link rel="stylesheet" href="/weixin/css/style.css">
<div class="login_box">
    <div class="login_close">
        <input class="login_close_btn" type="button" />
    </div>
    <div class="login_cont">
        <div class="tit">
            欢迎回到医脉通！
        </div>
        <div class="user_infor">
            <div class="user_pic">
                <img src="/weixin/images/pic.png" />
            </div>
            <div class="user_txt">
                <p>您已经使用<span class="blue">sevenfeng</span>登录</p>
                <p>是否继续使用此账户？</p>
            </div>
            <div class="btn_block">
                <input class="login_btn" type="button" value="继续"/>

                <?php $sUrl = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>
                <a class="other_login" href="<?php echo Link::getLoginUrl($sUrl);?>">使用其他账户登录</a>
            </div>
        </div>
    </div>
</div>
<?php } ?>