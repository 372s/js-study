$(document).ready(function () {
    //用户登录，绑定微信
    if (_medlive_userid) {
        $.get('/weixin/ajax/wx_bind.ajax.php?user_id='+_medlive_userid);
    }
    // 用户未登录，提示用户相关信息
    // if (_medlive_userid === 0) {
    if (_medlive_userid === 0 && typeof(getWxCookie('_wx_window_click_')) === 'undefined' && isWeiXinBrowse()) {
        setWxCookie();
        // 获取最近登录的用户信息，展示弹窗
        $.getJSON('/weixin/ajax/wx_getuserinfo.ajax.php', function(d) {
            var data = d.data;
            if(data && data.nick) {
                $('.login_box img').attr('src', data.avatar);
                $('.login_box .blue').html( data.nick );
                $('.login_box .login_btn').attr('data-url', data.url);
                $('.login_box').show();
            }
        });
    }

    // 确定操作，用户登录，并绑定
    $(document).on('click', '.login_box .login_btn', function () {
        $('.login_box').hide();
        location.href = $('.login_box .login_btn').data('url');
    });

    // 取消操作
    $(document).on('click', '.login_box .login_close_btn', function () {
        $('.login_box').hide();
    });
});

function isWeiXinBrowse(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

// 存cookie，记录弹框
function setWxCookie() {
    var date = new Date();  //获取当前时间
    date.setTime(date.getTime()+60*1000); //获取60秒后的时间戳
    document.cookie="_wx_window_click_=1;expires="+date.toGMTString();
}

// 定义一个函数，用来读取特定的cookie值。
function getWxCookie(cookie_name)
{
    var cookies = document.cookie ? document.cookie.split(';') : [];
    var c;
    for(var i=0; i<cookies.length; i++){
        c = cookies[i].split('=');
        if (c[0].replace(' ', '') === cookie_name) {
            return c[1];
        }
    }
}