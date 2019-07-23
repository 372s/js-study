;
(function($) {
    jQuery.extend({
        defaults: {
            show: true,
            userUri: '',
            resource: '',
            position: '',
            userId: '',
            success: function(status) {
                return status
            },
            error: function(status) {
                return status;
            }
        },
        onPopupBuilder: function(s) {
            s = $.extend({}, this.defaults, s);
            if (s.userUri === '') {
                console.error('完善信息跳转地址不能为空');
                return false;
            }
            if (s.resource === '') {
                console.error('来源不能为空');
                return false;
            }
            if (s.position === '') {
                console.error('位置信息不能为空');
                return false;
            }
            if (s.userId === '' || Number(s.userId) === 0) {
                console.error('用户ID不能为空');
                return false;
            }
            var data = {};
            data.user_id = s.userId;
            data.resource = s.resource;
            data.app_name = s.position;
            $.ajax({
                url: '/extend/test/validate.php',
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function(data) {
                    s.success(data);
                    // 记录弹窗
                    $.getJSON('/extend/test/add.php', data, function(res) {
                        // 如果弹窗
                        var common_cover = $('<div id="common_cover_2019" class="cover">');
                        var common_box_info = $('<div id="common_box_info_2019" class="pop_infor_box">');
                        var a = $('<a href="javascript:;" class="pop_infor_close">');
                        a.appendTo(common_box_info);
                        var box1 = $('<div class="pop_infor_cont">');
                        box1.html('积极响应国家号召，共建绿色网络环境<br/> 完善信息后，您将得到更多的优质服务').appendTo(common_box_info);
                        var box2 = $('<div class="pop_infor_btm">');
                        box2.appendTo(common_box_info);
                        var da = $('<a class="pop_infor_btn">');
                        da.attr('href', s.userUri).appendTo(box2);
                        $('body').append(common_cover).append(common_box_info);
                    });
                },
                error: function(data) {
                    s.error(data);
                }
            });
        }
    });
})(jQuery);