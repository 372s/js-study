function getOS() {
    for (var sysAry = ["Android", "Ipad", "Iphone", "Macintosh", "Windows", "X11", "Linux"], name = "", i = 0, l = sysAry.length; i < l; i++) if (name = sysAry[i], baidu.platform["is" + name]) {
        "Windows" === name && (name += " " + baidu.platform.windows);
        break
    }
    return name
}
function getBrowser() {
    var browserAry = ["maxthon", "se360", "QQ", "TencentTraveler", "sogou", "theworld", "baidu", "chrome"];
    browserAry.push("firefox"),
    browserAry.push("ie"),
    browserAry.push("safari"),
    browserAry.push("opera");
    for (var name = "",
    i = 0,
    l = browserAry.length; i < l; i++) {
        name = browserAry[i];
        var version = baidu.browser[name];
        if (version) {
            "boolean" != typeof version && (name += " " + version);
            break
        }
    }
    return name
}
function parseJSON(data) {
    if (!data || "string" !== baidu.type(data)) return null;
    if (data = baidu.string(data).trim(), window.JSON && window.JSON.parse) return window.JSON.parse(data);
    var rvalidchars = /^[\],:{}\s]*$/,
    rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
    rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g;
    if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) return new Function("return " + data)();
    throw new Error("Invalid JSON: " + data)
}
function reloadPage(url) {
    var url = url.split("#"),
    anchor = url[1],
    params = url[0].split("?")[1];
    params ? (params = "&" + params, params.indexOf("&rdm=") > -1 ? params = params.replace(/&rdm=(\w+)\b/, "&rdm=" + ( + new Date).toString(32)) : params += "&rdm=" + ( + new Date).toString(32), params = params.substr(1)) : params = "rdm=" + ( + new Date).toString(32),
    url = url[0].split("?")[0] + "?" + params,
    anchor && (url = url + "#" + anchor),
    window.location.href = url
} !
function() {
    var ua = navigator.userAgent;
    baidu.browser.se360 = function() {
        return /360se/i.test(ua)
    } (),
    baidu.browser.QQ = function() {
        return /QQBrowser\/(\d+\.\d+)/i.test(ua) ? RegExp.$1: void 0
    } (),
    baidu.browser.TT = function() {
        return /TencentTraveler (\d+\.\d+)/i.test(ua) ? RegExp.$1: void 0
    } (),
    baidu.browser.sogou = function() {
        return /SE 2.X /i.test(ua)
    } (),
    baidu.browser.theworld = function() {
        return /theworld/i.test(ua)
    } (),
    baidu.browser.baidu = function() {
        var v = /BIDUBrowser (\d+\.\d+)/i.test(ua) ? RegExp.$1: void 0;
        return v || (v = /BIDUBrowser\/(\d+\.\d+)/i.test(ua) ? RegExp.$1: void 0),
        v
    } (),
    baidu.platform.isLinux || (baidu.platform.isLinux = function() {
        return /linux/i.test(ua)
    } ()),
    baidu.platform.windows || (baidu.platform.windows = function() {
        if (baidu.platform.isWindows) return /nt 6.1/i.test(ua) ? "7": /nt 6.0/i.test(ua) ? "Vista": /nt 5.2/i.test(ua) ? "2003": /(nt 5.1|Windows XP)/i.test(ua) ? "XP": /nt 5.0/i.test(ua) ? "2000": /nt/i.test(ua) ? "NT 4.0": /(.*98.+9x.*|Windows ME)/.test(ua) ? "Me": /98/.test(ua) ? "98": /95/.test(ua) ? "95": "UNKNOWN"
    } ())
} ();
var proxy = function(fn, scope, params) {
    return function() {
        fn.apply(scope || window, params)
    }
},
TipTog = $Class.create({
    options: {
        tipId: "",
        eType: "click",
        togClass: "on",
        callback: null
    },
    init: function(htOptions) {
        var self = this;
        baidu.object.merge(this.options, htOptions || {},
        {
            overwrite: !0
        });
        var opt = self.options;
        this.tipO = baidu("#" + opt.tipId),
        this.btnTog = baidu("#btnTog-" + opt.tipId),
        this.btnTog.bind(this.eType || "click",
        function(e) {
            e.preventDefault(),
            self.toggle()
        })
    },
    toggle: function() {
        var opt = this.options;
        this.tipO.toggleClass(opt.togClass),
        this.btnTog.toggleClass(opt.togClass)
    }
}),
Popup = {
    overlay: void 0,
    dialog: void 0,
    options: {
        type: "html",
        content: "",
        title: "提示",
        width: 400,
        height: 300,
        element: null,
        overlay: !0,
        confirmOk: function() {},
        confirmNo: function() {},
        onClose: function() {},
        alertOk: !0,
        contentMsg: "",
        contentInfo: ""
    },
    init: function(htOptions) {
        var self = this;
        baidu.object.merge(this.options, htOptions || {},
        {
            overwrite: !0
        });
        var opt = this.options;
        switch (this._generateDialog(), opt.type) {
        case "alert":
            this.alert();
            break;
        case "confirm":
            this.confirm();
            break;
        case "html":
            this.fillHtml();
            break;
        case "iframe":
            this.fillIframe()
        }
        baidu(window).bind("resize",
        function() {
            self.resize()
        })
    },
    _generateDialog: function() {
        var opt = this.options,
        htm = [];
        if (!this.dialog) {
            htm.push('<div class="pop-diag" id="popupDialog" style="display:none;"><div class="pop-diag-in">');
            var html = '<div class="pop-tit" id="popupTitle">';
            html += '<span class="pop-ico-close" onclick="Popup.hide();"></span>',
            html += opt.title + "</div>",
            htm.push(html),
            htm.push('<div class="pop-body" id="popupBody"></div>'),
            htm.push("</div></div>"),
            baidu.dom(document.body).append(htm.join("")),
            this.dialog = baidu("#popupDialog"),
            this.dialogTit = baidu("#popupTitle"),
            this.dialogBody = baidu("#popupBody")
        }
        opt.overlay && !this.overlay && (htm.push('<div class="pop-overlay" id="popupMask" style="display:none;"></div>'), baidu.dom(document.body).append(htm.join("")), this.overlay = baidu("#popupMask"), this.overlay.click(function() {
            Popup.hide()
        }))
    },
    _setDialogCnt: function(html) {
        this.dialogBody.html(html),
        this.show(),
        this._setSize(),
        this._setPosition()
    },
    _setSize: function() {
        var opt = this.options,
        dialog = this.dialog,
        tit = this.dialogTit,
        diagBody = this.dialogBody,
        imgWrapper = this.dialogBody.find(".pop-web-img"),
        pTop = 1 * diagBody.css("paddingTop").replace("px", ""),
        pBottom = 1 * diagBody.css("paddingBottom").replace("px", ""),
        bodyH = opt.height - tit.outerHeight() - pTop - pBottom,
        pLeft = 1 * diagBody.css("paddingLeft").replace("px", ""),
        pRight = 1 * diagBody.css("paddingRight").replace("px", ""),
        bodyW = opt.width - pLeft - pRight;
        dialog.width(opt.width).height(opt.height),
        diagBody.width(bodyW).height(bodyH),
        imgWrapper.width(bodyW).height(bodyH - 40),
        imgWrapper.css({
            "overflow-y": "auto",
            marginTop: "20px"
        }),
        diagBody.css("overflow-y", "auto")
    },
    resize: function(w, h) {
        w && (this.options.width = w),
        h && (this.options.height = h),
        this._setSize()
    },
    addSize: function(w, h) {
        w && (this.options.width += w),
        h && (this.options.height += h),
        this._setSize()
    },
    setPosition: function() {
        this._setPosition()
    },
    _setPosition: function() {
        if (this.overlay) {
            this.overlay.width("100%");
            var bodySize = body();
            this.overlay.height(Math.max(bodySize.documentHeight, bodySize.viewHeight)),
            baidu("body").css({
                overflow: "hidden"
            }),
            6 !== baidu.browser.ie && baidu("html").css({
                overflow: "hidden"
            })
        }
        var opt = this.options,
        dialog = this.dialog;
        dialog.css("marginTop", -1 * (opt.height / 2 - 1)),
        dialog.css("marginLeft", -1 * (opt.width / 2 - 1)),
        6 === baidu.browser.ie && null !== opt.element && void 0 !== opt.element && dialog.css({
            top: opt.element.offset().top
        })
    },
    alert: function() {
        var opt = this.options,
        htm = [];
        if (opt.contentMsg) {
            var titClass = opt.alertOk ? "msgOk": !1 === opt.alertOk ? "msgErr": "",
            html = '<div class="pop-cnt-cit">';
            html += "<strong" + (titClass ? ' class="' + titClass + '"': "") + ">",
            html += opt.contentMsg + "</strong></div>",
            htm.push(html),
            opt.contentInfo && htm.push('<div class="popup-cnt">' + opt.contentInfo + "</div>")
        } else htm.push('<div class="pop-cnt-tit"><strong>' + opt.content + "</strong></div>");
        var html = '<div class="popup-btn-area">';
        html += '<input type="button" value="确认" class="popupBtn" onclick="Popup.hide();"/></div>',
        htm.push(html),
        this._setDialogCnt(htm.join(""))
    },
    confirm: function() {
        var opt = this.options,
        htm = [];
        opt.contentMsg ? (htm.push('<div class="pop-cnt-tit">' + opt.contentMsg + "</div>"), opt.contentInfo && htm.push('<div class="popup-cnt">' + opt.contentInfo + "</div>")) : htm.push('<div class="pop-cnt-cit"><strong>' + opt.content + "</strong></div>"),
        htm.push('<div class="popup-btn-area"><input type="button" value="确认" class="popup-btn" id="popBtnCfmOk"/>'),
        htm.push('<input type="button" value="取消" class="popup-btn" id="popBtnCfmNo" /></div>'),
        _setDialogCnt(htm.join(""));
        var cfmOk = opt.confirmOk,
        cfmNo = opt.confirmNo;
        baidu("#popBtnCfmOk").click(function() {
            Popup.onclose(),
            cfmOk && cfmOk()
        }),
        baidu("#popBtnCfmNo").click(function() {
            Popup.onclose(),
            cfmNo && cfmNo()
        })
    },
    fillHtml: function() {
        var opt = this.options;
        this._setDialogCnt(opt.content)
    },
    fillIframe: function() {
        var opt = this.options,
        htm = '<iframe frameborder="0" src="' + opt.content + '"></iframe>';
        this._setDialogCnt(htm)
    },
    hide: function() {
        var opt = this.options;
        opt.overlay && (this.overlay.hide(), baidu("body").css({
            overflow: "auto"
        }), baidu("html").css({
            overflow: "auto"
        })),
        this.dialog.hide(),
        opt.onClose && opt.onClose()
    },
    show: function() {
        this.options.overlay && this.overlay.show(),
        this.dialog.show()
    }
},
vaildForm = {
    vaild: {
        email: /(?!(.*@baidu\.com))[a-zA-Z0-9_\.]+@[a-zA-Z0-9_]+\.[a-zA-Z]+/i,
        phone: /^\d{7,14}$/,
        mobile: /^1[34578]\d{9}$/,
        domain: /(t1|passport|hiphotos)\.baidu\.com/i,
        http: /^(https?:\/\/)/,
        url: /^(\w+\.)+\w{2,4}/,
        comUrl: /^((https?:\/\/)(\w+\.)+\w{2,4})|((\w+\.)+\w{2,4})/,
        time: /^(\d{2}|\d{4})[-\/\.年]{1}\d{1,2}[-\/\.月]{1}\d{1,2}(日)?(( \d{1,2}\:\d{1,2})|( \d{1,2}\:\d{1,2}\:\d{1,2}))?$/,
        ip: /^(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))(\.(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))){3}$/,
        number: /^\d+$/
    },
    msg: {
        emailEmpty: "请输入邮箱",
        emailErr: "邮箱格式有误",
        urlEmpty: "请输入域名",
        urlErr: "域名格式有误",
        httpErr: "链接地址前需要有http://",
        contentEmpty: "请输入描述",
        contentLong: "您输入的描述内容超过500个汉字，请删减部分描述文字",
        titleEmpty: "请输入标题",
        titleLong: "标题不能超过50个汉字",
        linkEmpty: "请输入投诉链接",
        linkExist: "您已添加该链接",
        linkRepeat: "此链接已被投诉过，请重新输入",
        idErr: "ID仅包含汉字、数字、字母和下划线",
        idEmpty: "请输入ID",
        idExist: "您已添加该ID",
        idLong: "您输入的ID不能超过7个汉字，请重试",
        ipEmpty: "请输入IP地址",
        ipErr: "您输入的不是IP地址，请重新输入",
        phoneEmpty: "请输入电话",
        phoneErr: "电话内容不正确",
        mobileEmpty: "请输入手机号码",
        mobileErr: "手机号码不正确",
        typeEmpty: "请选择问题类型",
        timeErr: "您输入日期格式有误",
        contactEmpty: "请填写联系方式",
        ok: '<img src="/resources/images/fk/right.png" />'
    },
    formartErrMsg: function(errMsg) {
        return '<span class="span-img"><img src="/resources/images/fk/form_ques.png" ／></span><span class="span-err">' + errMsg + '</span><div class="clear"></div>'
    },
    isEmpty: function(ipt) {
        return 0 === baidu.string("string" == typeof ipt ? ipt: ipt.value).trim().length
    },
    http: function(ipt) {
        var t = this,
        reg = t.vaild.http,
        str = baidu.string("string" == typeof ipt ? ipt: ipt.value).trim();
        return reg.test(str)
    },
    url: function(ipt) {
        var t = this,
        reg = t.vaild.url,
        str = baidu.string("string" == typeof ipt ? ipt: ipt.value).trim();
        return reg.test(str)
    },
    comUrl: function(ipt) {
        var t = this,
        reg = t.vaild.comUrl,
        str = baidu.string("string" == typeof ipt ? ipt: ipt.value).trim();
        return reg.test(str)
    },
    email: function(ipt) {
        var t = this,
        reg = t.vaild.email,
        str = baidu.string("string" == typeof ipt ? ipt: ipt.value).trim();
        return reg.test(str)
    },
    len: function(obj, minLen, maxLen) {
        var str = baidu.string("string" == typeof obj ? obj: obj.value).trim();
        if ("string" != typeof obj) {
            var dObj = baidu(obj);
            minLen || (minLen = void 0 === dObj.attr("minlength") ? 0 : 1 * dObj.attr("minlength")),
            maxLen || (maxLen = 1 * dObj.attr("maxlength"))
        }
        str = str.replace(/\r\n/g, ""),
        str = str.replace(/\n/g, "");
        var byteLen = baidu.string(str).getByteLength();
        return byteLen >= minLen && byteLen <= maxLen
    },
    phone: function(ipt) {
        var t = this,
        reg = t.vaild.phone,
        str = baidu.string("string" == typeof ipt ? ipt: ipt.value).trim();
        return reg.test(str)
    },
    mobile: function(ipt) {
        var t = this,
        reg = t.vaild.mobile,
        str = baidu.string("string" == typeof ipt ? ipt: ipt.value).trim();
        return reg.test(str)
    },
    ip: function(ipt) {
        var t = this,
        reg = t.vaild.ip,
        str = baidu.string("string" == typeof ipt ? ipt: ipt.value).trim(),
        rlt = reg.test(str);
        return rlt || (str.match(/:/g) && str.match(/:/g).length <= 7 && /::/.test(str) ? /^([\da-f]{1,4}(:|::)) {1,6}[\da-f]{1,4}$/i.test(str) && (rlt = !0) : /^([\da-f]{1,4}:) {7}[\da-f]{1,4}$/i.test(str) && (rlt = !0)),
        rlt
    },
    number: function(ipt) {
        var t = this,
        reg = t.vaild.number,
        str = baidu.string("string" == typeof ipt ? ipt: ipt.value).trim();
        return reg.test(str)
    },
    validId: function(ipt) {
        for (var str = baidu.string("string" == typeof ipt ? ipt: ipt.value).trim(), i = 0; i < str.length; i++) if (str.charCodeAt(i) < 127 && !str.substr(i, 1).match(/^\w+$/gi)) return ! 1;
        return ! 0
    },
    time: function(ipt) {
        var t = this,
        reg = t.vaild.time,
        str = baidu.string("string" == typeof ipt ? ipt: ipt.value).trim();
        return reg.test(str)
    },
    setChkMsg: function(ipt, errMsg, okMsg) {
        var id = "string" == typeof ipt ? ipt: ipt.getAttribute("id"),
        errO = baidu("#" + id + "_err"),
        okO = baidu("#" + id + "_ok");
        void 0 === okMsg && (okMsg = vaildForm.msg.ok),
        "" === errMsg ? (errO.html(errMsg).hide(), okO.html("").hide()) : errMsg ? (errO.html(vaildForm.formartErrMsg(errMsg)).show(), okO.html("").hide()) : (errO.html("").hide(), okO = okO[0] ? okO: errO, okO.html(okMsg).show())
    }
};
baidu.dom.extend({
    isRequired: function() {
        var required;
        if ("7" === baidu.browser.ie) {
            var outer = this[0].outerHTML;
            return /\srequired\b/i.test(outer.slice(0, outer.search(/\/?['"]?>(?![^<]*<['"])/))) ? "required": void 0
        }
        if (void 0 !== (required = this.attr("required")) && !1 !== required) return "required"
    },
    vaildForm: function(config) {
        var form = this,
        conFields = config.fields,
        check = function(obj, cfg, hid, emt) {
            var val = obj.val();
            cfg.okMsg && cfg.okMsg;
            var regExp = cfg.regExp,
            result = !0,
            errMsg = null;
            if (vaildForm.isEmpty(val) || cfg.placeholder === baidu.string(val).trim()) cfg.placeholder && obj.val(cfg.placeholder),
            cfg.required || obj.isRequired() ? (errMsg = void 0 !== emt ? emt: cfg.emptyMsg, result = null) : errMsg = "";
            else if (void 0 === hid && "isEmpty" !== regExp) {
                var regType = baidu.type(regExp);
                "string" === regType ? "len" !== regExp && cfg.longMsg && !vaildForm.len(obj[0]) ? (errMsg = cfg.longMsg, result = !1) : (result = vaildForm[regExp](obj[0])) || (errMsg = cfg.errMsg) : "regexp" === regType ? (result = regExp.test(baidu.string(val).trim())) || (errMsg = cfg.errMsg) : "function" === regType && ((result = regExp(baidu.string(val).trim())) || (errMsg = cfg.errMsg))
            }
            return vaildForm.setChkMsg(obj.attr("id"), errMsg),
            cfg.callback && (result = cfg.callback(obj[0], result)),
            result
        };
        if (conFields) for (var k in conFields) {
            var field = form.find(k);
            "hidden" === field.attr("type") && ($(k).attr("emptyMsg", conFields[k].emptyMsg), $.fn.hiddenChange = function() {
                var field = conFields["#" + baidu.dom(this).attr("id")];
                return check(baidu.dom(this), field, !0, baidu.dom(this).attr("emptyMsg"))
            });
            var placeholder = conFields[k].placeholder;
            field.bind(conFields[k].eType || "blur",
            function(key) {
                return function() {
                    check(baidu.dom(this), conFields[key])
                }
            } (k)),
            placeholder && (field.val(placeholder), field.bind("focus",
            function(placeholder) {
                return function() {
                    baidu.string(this.value).trim() === placeholder && (this.value = "")
                }
            } (placeholder)))
        }
        if (form.vaildConfig) form.vaildConfig = baidu.object.merge(form.vaildConfig, config, {
            overwrite: !0,
            recursive: !0
        });
        else {
            form.vaildConfig = config;
            var submitHandler = function(e) {
                config.beforeSubmit && config.beforeSubmit();
                var result = !0,
                fields = form.vaildConfig.fields,
                fieldJson = {};
                if (fields) for (var k in fields) if (!fields[k].noSubmit) {
                    var field = form.find(k);
                    field && field.each(function(index, item) {
                        item = baidu.dom(item);
                        var tmpRlt = check(item, fields[k]),
                        val = item.val();
                        fields[k].placeholder === baidu.string(val).trim() && item.val(""),
                        tmpRlt && (fieldJson[item.attr("name")] = item.val()),
                        result = result && tmpRlt
                    })
                }
                if (config.submitCbk && (result = config.submitCbk(result, fieldJson)), !result) return e.preventDefault(),
                !1;
                config.afterSubmit && window.setTimeout(function() {
                    config.afterSubmit()
                },
                0)
            };
            form.submit(submitHandler)
        }
    },
    vaildField: function(fieldId, key, val) {
        var form = this,
        fieldKey = "#" === fieldId.charAt(0) ? fieldId: "#" + fieldId,
        argLen = arguments.length,
        fieldCfg = form.vaildConfig.fields[fieldKey];
        if (void 0 !== fieldCfg) return 1 === argLen ? fieldCfg: 2 === argLen ? fieldCfg[key] : void(fieldCfg[key] = val)
    }
}),
baidu.dom(document).ready(function() {});;
var checkform = {
    isEmpty: function(ipt) {
        if (null == ipt) return ! 0;
        var str = "";
        return str = "string" == typeof ipt ? $.trim(ipt) : $.trim(ipt.val()),
        !str.length
    },
    checkField: function(conid, fname, foptions, field) {
        var valid = !0,
        container = $("#" + conid);
        field || (field = container.find('*[name="' + fname + '"]'));
        var spErr = container.find("#spErr_" + fname);
        if (field.length) {
            var empty = checkform.isEmpty(field);
            if (empty && "image" !== foptions.type && foptions.required ? (valid = !1, spErr.html(foptions.emptymsg ? foptions.emptymsg: ("select" === foptions.type ? "请选择": "请填写") + foptions.label)) : spErr.html(""), valid && !empty) {
                var type = field.attr("type"),
                patternStr = "";
                switch (type) {
                case "number":
                    patternStr = "^[1-9](\\d)*$";
                    break;
                case "email":
                    patternStr = "\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*"
                }
                foptions.pattern && (patternStr = foptions.pattern);
                if (!new RegExp(patternStr).test(field.val())) return spErr.html(foptions.errmsg ? foptions.errmsg: "请正确填写" + foptions.label),
                !1;
                if (field.attr("min")) {
                    var val = parseFloat(field.val(), 10),
                    min = parseFloat(field.attr("min"), 10);
                    if (val < min) return spErr.html(foptions.minmsg ? foptions.minmsg.replace("$min", min) : "输入数值超出最小（" + min + "）限制"),
                    !1
                }
                if (field.attr("max")) {
                    var val = parseFloat(field.val(), 10),
                    max = parseFloat(field.attr("max"), 10);
                    if (val > max) return spErr.html(foptions.maxmsg ? foptions.maxmsg.replace("$max", max) : "输入数值超出最大（" + max + "）限制"),
                    !1
                }
                if (field.attr("maxlength")) {
                    var val = field.val(),
                    maxlength = parseInt(field.attr("maxlength"), 10);
                    if (val.length > maxlength) return spErr.html(foptions.errmsg ? foptions.errmsg: "输入字符超最大长度（" + maxlength + "）限制"),
                    !1
                }
                if (foptions.length) {
                    var val = field.val();
                    if (val.length && val.length !== foptions.length) {
                        var msg = "长度不对";
                        return foptions.errmsg && (msg = foptions.errmsg),
                        spErr.html(msg),
                        !1
                    }
                }
                spErr.html("")
            } else if (valid && empty && foptions.requiredby) {
                var byField = container.find('*[name="' + foptions.requiredby + '"]'),
                byEmpty = checkform.isEmpty(byField);
                if (!byEmpty) return spErr.html(foptions.emptymsg ? foptions.emptymsg: ("select" === foptions.type ? "请选择": "请填写") + foptions.label),
                !1
            }
        }
        if (valid && "link" === foptions.type) {
            var reg = /^(https?:\/\/)/,
            val = field.val();
            val && !reg.test(val) && field.val("http://" + val);
            for (var repeat = 0,
            fieldLst = container.find('*[name="' + fname + '"]'), i = 0, l = fieldLst.length; i < l; i++) {
                var otherField = $(fieldLst[i]);
                $.trim(otherField.val()) === val && repeat++
            }
            repeat > 1 && (spErr.html("您已添加该链接"), valid = !1)
        }
        return valid
    },
    isValid: function(conid, fields) {
        var valid = !0;
        if (fields) for (var key in fields) if (fields.hasOwnProperty(key)) for (var selector = '*[name="' + key + '"]',
        selectObjs = $("#" + conid).find(selector), i = 0; i < selectObjs.length; i++) valid = checkform.checkField(conid, key, fields[key], $(selectObjs[i])) && valid;
        return valid
    },
    checkEvents: function(conid, fields, fn) {
        fn || (fn = function() {
            return ! 0
        });
        var container = $("#" + conid);
        if (fields) for (var key in fields) if (fields.hasOwnProperty(key)) {
            var selector = '*[name="' + key + '"]',
            field = container.find(selector),
            type = field.attr("type");
            if ("file" === type) continue;
            if (!fields[key].emptymsg) {
                var placeHolder = field.attr("placeHolder");
                fields[key].emptymsg = placeHolder
            }
            "number" === type ? field.bind("keypress", checkform.checkNumber) : container.delegate(selector, "blur change", {
                conid: conid,
                key: key,
                field: fields[key]
            },
            function(r) {
                var self = $(this);
                setTimeout(function() {
                    var a, customChangedFn = r.data.field.changedfn;
                    if (customChangedFn) {
                        var custFnObjs = customChangedFn.split("."),
                        l = custFnObjs.length;
                        if (l) switch (l) {
                        case 1:
                            window[custFnObjs[0]](self);
                            break;
                        case 2:
                            window[custFnObjs[0]][custFnObjs[1]](self);
                            break;
                        case 3:
                            window[custFnObjs[0]][custFnObjs[1]][custFnObjs[2]](self)
                        }
                    }
                    return a = checkform.checkField(r.data.conid, r.data.key, r.data.field, self),
                    fn(),
                    a
                },
                200)
            })
        }
    },
    checkNumber: function(e) {
        var key = window.event ? e.keyCode: e.which;
        return !! key && /[\d]/.test(String.fromCharCode(key))
    },
    checkHidden: function(obj) {
        obj.change && "function" == typeof obj.change && obj.change()
    }
};;
//上传
var uploadControl = {
    maxFileSize: 5,
    uploadFields: {},
    picItemIndex: 0,
    fileItemIndex: 0,
    init: function(fields) {
        this.uploadFields = fields,
        $("body").delegate(".pic-list .del-pic", "click", this.deleteImage).delegate('.icon-pic input[type="file"]', "change", this.afterSelectImage).delegate('.file-wrapper input[type="file"]', "change", this.afterSelectFile).delegate(".file-list .del-icon", "click", this.deleteFile)
    },
    checkFiles: function(fileSelector, files, fieldName, fOptions, isSubmit) {
        var valid = !0,
        len1 = fileSelector ? fileSelector.length: 0,
        len2 = files ? files.length: 0,
        len = len1 + len2;
        if (!fOptions && !len) return ! 0;
        if (fOptions.required && !len && (valid = !1, uploadControl.showMsgTip(fieldName, "请上传至少一" + ("image" === fOptions.type ? "张图片": "个文件"))), len && fOptions.number && fOptions.number < len && (valid = !1, uploadControl.showMsgTip(fieldName, "最多可以上传" + fOptions.number + ("image" === fOptions.type ? "张图片": "个文件"))), valid && len2) for (var i = 0; i < len2 && (valid = uploadControl.checkFileSize(fieldName, files[i])); i++);
        if (isSubmit) {
            if ("image" === fOptions.type) for (var i = 0; i < fileSelector.length; i++) if (!$(fileSelector[i]).attr("src")) {
                valid = !1,
                uploadControl.showMsgTip(fieldName, "图片正在上传中...");
                break
            }
            if ("file" === fOptions.type) for (var i = 0; i < fileSelector.length; i++) if (!$(fileSelector[i]).data("filename")) {
                valid = !1,
                uploadControl.showMsgTip(fieldName, "文件正在上传中...");
                break
            }
        }
        return valid
    },
    checkFileSize: function(fieldName, file) {
        var size = file.size,
        ok = size < 1024 * uploadControl.maxFileSize * 1024;
        return ok || uploadControl.showMsgTip(fieldName, "上传文件的大小不能超出" + uploadControl.maxFileSize + "M"),
        ok
    },
    deleteImage: function() {
        var delIcon = $(this),
        picContainer = delIcon.closest(".pic-list"),
        iconUpload = picContainer.find(".icon-pic");
        delIcon.closest(".pic-item").remove();
        var fieldName = iconUpload.find("input").attr("name"),
        pics = picContainer.find(".upload-pic"),
        field = uploadControl.uploadFields[fieldName];
        pics.length < field.number && iconUpload.show(),
        uploadControl.showMsgTip(fieldName, "")
    },
    deleteFile: function() {
        var delIcon = $(this),
        fileContainer = delIcon.closest(".file-list"),
        fileWrapper = fileContainer.siblings(".file-wrapper");
        delIcon.closest(".up-file-name").remove();
        var fieldName = fileWrapper.find("input").attr("name"),
        field = uploadControl.uploadFields[fieldName],
        flen = fileContainer.find(".up-file-name").length; (!flen || flen < field.number) && fileWrapper.show(),
        uploadControl.showMsgTip(fieldName, "")
    },
    addImage: function(obj, uniIndex) {
        var iconUpload = obj.closest(".icon-pic");
        iconUpload.before($("#uploadWrapper").html().replace(/\_index/g, "_" + uniIndex));
        var pics = obj.closest(".pic-list").find(".upload-pic"),
        field = uploadControl.uploadFields[obj.attr("name")];
        pics.length === field.number && iconUpload.hide()
    },
    addFile: function(obj, uniIndex) {
        var htm = '<div class="up-file-name" id="fileItem_' + uniIndex + '" data-filename=""></div>',
        fileWrapper = obj.closest(".file-wrapper"),
        fileListCon = fileWrapper.siblings(".file-list"),
        field = uploadControl.uploadFields[obj.attr("name")];
        fileListCon.append(htm),
        field.number && fileListCon.find(".up-file-name").length !== field.number || fileWrapper.hide()
    },
    afterSelectImage: function() {
        var self = $(this),
        fileList = self[0].files,
        selector = self.closest(".pic-list").find("img.upload-pic"),
        fieldName = self.attr("name");
        if ($("#spErr_" + fieldName).html(""), uploadControl.checkFiles(selector, fileList, fieldName, uploadControl.uploadFields[fieldName])) {
            console.log("you can upload files");
            for (var i = 0; i < fileList.length; i++) {
                var uniIndex = uploadControl.picItemIndex;
                uploadControl.addImage(self, uniIndex);
                var formData = new FormData;
                formData.append("pic", fileList[i]),
                formData.append("index", uniIndex),
                $.ajax({
                    url: "/api/mpic",
                    type: "POST",
                    data: formData,
                    xhr: function() {
                        var myXhr = $.ajaxSettings.xhr();
                        return myXhr.upload && (myXhr.upload.uploadIndex = uniIndex, myXhr.upload.addEventListener("progress",
                        function(e) {
                            uploadControl.uploadPicProgressHandling(e, this.uploadIndex)
                        },
                        !1)),
                        myXhr
                    },
                    processData: !1,
                    contentType: !1,
                    success: function(res, name, xhr) {
                        uploadControl.uploadPicSuccess(fieldName, res)
                    },
                    error: function(res) {
                        uploadControl.uploadPicFailed(fieldName, res)
                    },
                    complete: function() {}
                }),
                uploadControl.picItemIndex++
            }
        }
        return $(this).val(""),
        !1
    },
    afterSelectFile: function() {
        var self = $(this),
        fileList = self[0].files;
        console.log(fileList);
        var selector = self.closest(".file-list").find(".up-file-name"),
        fieldName = self.attr("name");
        if ($("#spErr_" + fieldName).html(""), uploadControl.checkFiles(selector, fileList, fieldName, uploadControl.uploadFields[fieldName])) {
            console.log("you can upload files");
            for (var i = 0; i < fileList.length; i++) {
                var uniIndex = uploadControl.fileItemIndex;
                self.closest(".file-wrapper").siblings(".file-uploading").show(),
                uploadControl.addFile(self, uniIndex);
                var formData = new FormData;
                formData.append("file", fileList[i]),
                formData.append("index", uniIndex),
                $.ajax({
                    url: "/api/uploadfile",
                    type: "POST",
                    data: formData,
                    xhr: function() {
                        var myXhr = $.ajaxSettings.xhr();
                        return myXhr.upload && (myXhr.upload.uploadIndex = uniIndex, myXhr.upload.addEventListener("progress",
                        function(e) {},
                        !1)),
                        myXhr
                    },
                    processData: !1,
                    contentType: !1,
                    success: function(res, name, xhr) {
                        uploadControl.uploadFileSuccess(fieldName, res)
                    },
                    error: function(res) {
                        uploadControl.uploadFileFailed(fieldName, res)
                    },
                    complete: function() {
                        self.closest(".file-wrapper").siblings(".file-uploading").hide()
                    }
                }),
                uploadControl.fileItemIndex++
            }
        }
        return $(this).val(""),
        !1
    },
    uploadPicSuccess: function(fieldName, result) {
        var res = $.parseJSON(result);
        if (console.log(res), res.err_no) {
            if (9 === res.err_no ? uploadControl.showMsgTip(fieldName, "请确定图片类型为：JPEG/BMP/PNG/GIF") : 1 === res.err_no || 2 === res.err_no ? uploadControl.showMsgTip(fieldName, "请确定上传的图片不超过" + uploadControl.maxFileSize + "M") : uploadControl.showMsgTip(fieldName, "上传失败 , 请稍后重试"), res.index) {
                var curPic = $("#picItem_" + res.index),
                picContainer = curPic.closest(".pic-list"),
                iconUpload = picContainer.find(".icon-pic");
                curPic.remove();
                var pics = picContainer.find(".upload-pic"),
                field = uploadControl.uploadFields[iconUpload.find("input").attr("name")];
                pics.length < field.number && iconUpload.show()
            }
        } else {
            var picItem = $("#picItem_" + res.index);
            picItem.find("img").data("src", res.resps[0]),
            picItem.find("img").attr("src", res.resps[1]),
            picItem.find("img").data("name", res.filename),
            picItem.find(".uploading").remove(),
            uploadControl.showMsgTip(fieldName, "")
        }
    },
    uploadPicProgressHandling: function(e, curItemIndex) {
        if (e.lengthComputable) {
            var picItem = $("#picItem_" + curItemIndex),
            progressBar = picItem.find(".progress-bar");
            if (e.loaded === e.total) progressBar.attr("style", "width: 100%;");
            else {
                var percent = (e.loaded / e.total * 100).toFixed(2);
                progressBar.attr("style", "width: " + percent + "%;")
            }
        }
    },
    uploadPicFailed: function(fieldName, e) {
        console.log(e),
        uploadControl.showMsgTip(fieldName, "上传失败 , 请稍候再试")
    },
    uploadFileSuccess: function(fieldName, result) {
        var res = $.parseJSON(result);
        if (console.log(res), res.err_no) {
            9 === res.err_no ? uploadControl.showMsgTip(fieldName, "请确定文件类型为.txt、.doc、.docx格式") : 1 === res.err_no || 2 === res.err_no ? uploadControl.showMsgTip(fieldName, "请确定文件大小不超过" + uploadControl.maxFileSize + "M") : uploadControl.showMsgTip(fieldName, "上传失败 , 请稍后重试");
            var obj = $('*[name="' + fieldName + '"]'),
            fileWrapper = obj.closest(".file-wrapper"),
            fileListCon = fileWrapper.siblings(".file-list"),
            field = uploadControl.uploadFields[fieldName];
            $("#fileItem_" + res.index).remove(),
            (!field.number || fileListCon.find(".up-file-name").length < field.number) && fileWrapper.show()
        } else {
            var fileItem = $("#fileItem_" + res.index);
            fileItem.data("filename", res.newname),
            fileItem.append("<span>" + res.filename + '</span><span class="del-icon"></span>'),
            uploadControl.showMsgTip(fieldName, "")
        }
    },
    uploadFileFailed: function(fieldName, e) {
        console.log(e),
        uploadControl.showMsgTip(fieldName, "上传失败 , 请稍候再试"),
        $('*[name="' + fieldName + '"]').closest(".file-wrapper").show()
    },
    showMsgTip: function(fieldName, msg) {
        $("#spErr_" + fieldName).html(msg)
    },
    getImageList: function(iptfilename, datatype) {
        var objFile = $(".pic-list").find('input[type="file"][name="' + iptfilename + '"]'),
        imgList = objFile.closest(".pic-list").find(".pic-item img"),
        imgData = [];
        return imgList.each(function(i, img) {
            imgData.push($(this).data("name"))
        }),
        datatype && "string" === datatype ? imgData.join(",") : imgData
    },
    getFileList: function(iptfilename, datatype) {
        var objFile = $(document.body).find('input[type="file"][name="' + iptfilename + '"]'),
        fileList = objFile.closest(".file-wrapper").siblings(".file-list").find(".up-file-name"),
        fileData = [];
        return fileList.each(function(i, fl) {
            fileData.push($(this).data("filename"))
        }),
        datatype && "string" === datatype ? fileData.join(",") : fileData
    }
};;
var quesPage = {
    init: function() {
        this.initMenu(),
        this.initQues(),
        this.initFanKui(),
        this.adjustMainHeight(),
        this.imgLoaded()
    },
    imgLoaded: function() {
        var imgElement = $(".content").find("img");
        $(".sec-main").height("auto");
        for (var i = 0; i < imgElement.length; i++) imgElement[i].onload = function() {
            quesPage.adjustMainHeight()
        }
    },
    adjustMainHeight: function() {
        footer.adjust();
        var mainDiv = $(".sec-main"),
        mainHeight = mainDiv.height(),
        contentDiv = $(".content"),
        sideBarHeight = $("#sideBar").height(),
        contentHeight = contentDiv.height();
        mainHeight >= sideBarHeight && sideBarHeight > contentHeight ? contentDiv.height(mainHeight) : mainHeight < sideBarHeight && sideBarHeight > contentHeight ? contentDiv.height(sideBarHeight) : (contentDiv.height("auto"), contentDiv.height() >= mainHeight ? $(".sec-main").height("auto") : contentDiv.height(mainHeight))
    },
    initMenu: function() {
        $("#sideBar").delegate(".fst-cate li", "click",
        function() {
            var self = $(this);
            if (self.hasClass("haschild")) self.toggleClass("opened"),
            self.find(".sec-cate").toggle(),
            quesPage.adjustMainHeight();
            else {
                var lnkObj = self.find("a");
                lnkObj.attr("target") && "_blank" === lnkObj.attr("target") ? window.open(lnkObj.attr("href")) : window.location.href = lnkObj.attr("href")
            }
        }).delegate(".sec-cate li", "click",
        function() {
            var self = $(this);
            return window.location.href = self.find("a").attr("href"),
            !1
        })
    },
    initQues: function() {
        var qLst = $(".q-list").eq(0);
        qLst && qLst.length && qLst.delegate("div.ques-can-collasp span", "click",
        function() {
            var qDiv = $(this).parent(),
            On = qDiv.attr("on-show");
            "0" === On ? ($(".article").hide(), $(".js-ques-show").attr("on-show", 0), $(".js-ques-show").removeClass("ques-show").removeClass("ques-hide").addClass("ques-hide"), $("#article_" + qDiv.data("id")).toggle(), qDiv.removeClass("ques-hide").addClass("ques-show"), qDiv.attr("on-show", 1)) : "1" === On && ($("#article_" + qDiv.data("id")).toggle(), qDiv.removeClass("ques-show").addClass("ques-hide"), qDiv.attr("on-show", 0)),
            quesPage.adjustMainHeight()
        })
    },
    initFanKui: function() {
        for (var btn = $(".btn-fankui-y, .btn-fankui-n"), i = 0; i < btn.length; i++) {
            var fankui = btn.attr("hasFankui");
            fankui && (btn.attr("disabled", "true"), "1" === fankui ? btn.parent().find(".fankui-box-y").show() : btn.parent().find(".fankui-box-n").show())
        }
        $(".go-list").delegate("button", "click",
        function() {
            var self = $(this),
            params = {
                is_valid: 2,
                qid: self.attr("name")
            };
            1 === self.data("type") ? (params.is_valid = 1, self.parent().find(".fankui-box-y").show()) : self.parent().find(".fankui-box-n").show(),
            $.post("/api/quesuserinfo", params,
            function() {
                btn.attr("disabled", "true")
            })
        })
    }
};;
var searchPage = {
    baseUrl: "/ajaxgetsearch",
    prodIndex: 10,
    prodPageSize: 10,
    init: function(keywords) {
        this.baseUrl = this.baseUrl + "?keywords=" + keywords,
        this.initProdBar(),
        this.initPage(),
        this.adjustMainHeight(),
        this.titleHover()
    },
    adjustMainHeight: function() {
        var prodBarHeight = $("#prodBar").height(),
        otherHeight = $(".header").outerHeight() + $(".banner").outerHeight() + $(".footer").outerHeight(),
        minHeight = $(window).height() - otherHeight,
        contentDiv = $(".sec-main .content");
        contentDiv.height("auto");
        var contentHeight = contentDiv.height();
        prodBarHeight > contentHeight ? ($("#prodBar").height("auto"), contentDiv.outerHeight(prodBarHeight), minHeight > prodBarHeight && (contentDiv.outerHeight(minHeight), $("#prodBar").outerHeight(minHeight))) : (contentDiv.height("auto"), minHeight > contentHeight && contentDiv.outerHeight(minHeight))
    },
    initProdBar: function() {
        $("#prodBar").delegate("li", "click",
        function() {
            var self = $(this);
            if (!self.hasClass("on")) {
                var pid = self.data("id"),
                url = searchPage.baseUrl + "&pid=" + pid;
                window.scroll(0, 0),
                $("#mainContent").html('<img class="img-loader" src="/resources/pc/images/bg/b-loading.gif"/>'),
                $("#mainContent").load(url,
                function(response, status, e) {
                    "success" === status && (searchPage.showPageInfo(), $("#prodBar").find("li.on").removeClass("on"), self.addClass("on"), searchPage.adjustMainHeight())
                })
            }
        }).delegate(".next-prod", "click",
        function() {
            var prodLis = ($(this), $("#prodBar").find("li"));
            if (prodLis && prodLis.length > searchPage.prodPageSize) {
                $("#prodBar").find("li:not(.hid)").addClass("hid");
                for (var willShowEndIndex = searchPage.prodIndex + searchPage.prodPageSize,
                i = searchPage.prodIndex; i < willShowEndIndex; i++) i < prodLis.length && ($(prodLis[i]).removeClass("hid"), searchPage.prodIndex++);
                $(".search-more .prev-prod").show(),
                searchPage.prodIndex === prodLis.length && $(".search-more .next-prod").hide(),
                window.scroll(0, 0),
                searchPage.adjustMainHeight()
            }
        }).delegate(".prev-prod", "click",
        function() {
            var prodLis = ($(this), $("#prodBar").find("li"));
            if (prodLis) {
                if ($("#prodBar").find("li:not(.hid)").addClass("hid"), searchPage.prodIndex === prodLis.length) {
                    for (var willShowEndIndex = searchPage.prodIndex - prodLis.length % searchPage.prodPageSize - 1,
                    willShowStartIndex = willShowEndIndex - searchPage.prodPageSize,
                    i = willShowEndIndex; i > willShowStartIndex; i--) $(prodLis[i]).removeClass("hid");
                    searchPage.prodIndex -= prodLis.length % searchPage.prodPageSize
                } else for (var willShowIndex = searchPage.prodIndex - 2 * searchPage.prodPageSize,
                i = searchPage.prodIndex - searchPage.prodPageSize - 1; i >= willShowIndex; i--) i < prodLis.length && ($(prodLis[i]).removeClass("hid"), searchPage.prodIndex--);
                $(".search-more .next-prod").show(),
                searchPage.prodIndex === searchPage.prodPageSize && $(".search-more .prev-prod").hide(),
                window.scroll(0, 0),
                searchPage.adjustMainHeight()
            }
        });
        var prodLis = $("#prodBar").find("li");
        prodLis && prodLis.length > searchPage.prodPageSize && ($(".search-more").show(), $(".search-more .next-prod").show())
    },
    initPage: function() {
        $("#mainContent").delegate("#page .pagelink", "click",
        function() {
            var self = $(this);
            if (!self.hasClass("current")) {
                var prodLi = $("#prodBar").find("li.on"),
                pid = prodLi.data("id"),
                page = parseInt(self.data("page"), 10),
                url = searchPage.baseUrl + "&pid=" + pid + "&page=" + page;
                window.scroll(0, 0),
                $("#mainContent").html('<img class="img-loader" src="/resources/pc/images/bg/b-loading.gif"/>'),
                $("#mainContent").load(url,
                function(response, status, e) {
                    "success" === status && (searchPage.showPageInfo(), searchPage.adjustMainHeight())
                })
            }
        })
    },
    showPageInfo: function() {
        var pageNum = parseInt($("#hidPageNum").val(), 10),
        tatalPage = parseInt($("#hidTotalPage").val(), 10),
        totalCount = parseInt($("#hidTotalCount").val(), 10);
        showPage(pageNum, tatalPage, totalCount, !0, "page")
    },
    titleHover: function() {
        $(".q-tit a").mouseover(function() {
            $(this).find("span").css("color", "#2c81ff")
        }),
        $(".q-tit a").mouseout(function() {
            $(this).find("span").css("color", "#f00")
        })
    }
};;
var specialObject = {
    getWebmasterSpecialSubmitData: function(data) {
        var newData = {},
        dataField = {};
        dataField.product_id = 105,
        dataField.userAgent = navigator.userAgent,
        dataField.documentcookie = document.cookie,
        dataField.email = data.email,
        dataField.issuedesc = data.content,
        newData.fb_necdata = JSON.stringify(dataField);
        var picImg = $(".pic-list .upload-pic");
        newData.fb_prodata = '{"pic_url":"' + (picImg.length ? picImg.data("src") : "") + '"}';
        var htm = '<input type="hidden" name="necData" id="fb_necdata" value="">';
        if (htm += '<input type="hidden" name="proData" id="fb_prodata" value="">', !$("#submitForm").length) {
            var submitElement = document.createElement("form");
            submitElement.action = $("#action").val(),
            submitElement.method = "post",
            submitElement.target = "ifr",
            submitElement.id = "submitForm";
            var ifrElement = document.createElement("iframe");
            ifrElement.id = "ifr",
            ifrElement.name = "ifr",
            ifrElement.height = "0",
            ifrElement.width = "0",
            ifrElement.style = "display:none",
            document.body.appendChild(ifrElement),
            document.body.appendChild(submitElement)
        }
        var submitForm = $("#submitForm");
        return submitForm.html(htm),
        $("#fb_necdata").val(newData.fb_necdata),
        $("#fb_prodata").val(newData.fb_prodata),
        submitForm.submit(),
        !0
    },
    wangpanAmountChanged: function(obj) {
        parseFloat(obj.val(), 10) >= 100 ? ($("#mail_type").val(""), tousuForm.addFields.mail_type.required = !1, $("#mail_type").closest(".fankui-item").hide()) : ($("#mail_type").val("邮费到付"), tousuForm.addFields.mail_type.required = !0, $("#mail_type").closest(".fankui-item").show())
    }
},
tousuForm = {
    commonFields: {},
    addFields: {},
    specialSubmitCategories: [{
        pid: 1,
        category_id: 4,
        submitFn: specialObject.getWebmasterSpecialSubmitData
    }],
    init: function(cfields, afields) {
        this.commonFields = cfields,
        this.addFields = afields,
        checkform.checkEvents("mainContent", this.commonFields),
        checkform.checkEvents("mainContent", this.addFields);
        var fileFields = {};
        for (var key in this.addFields) if (this.addFields.hasOwnProperty(key)) {
            var field = $("#mainContent").find('*[name="' + key + '"]'),
            type = field.attr("type");
            "file" === type && (fileFields[key] = this.addFields[key])
        }
        fileFields !== {} && uploadControl.init(fileFields),
        this.bindLinkEvents(),
        this.bindButtonEvents(),
        this.bindTextAreaEvent(),
        this.bindProCity(),
        this.bindCheckChange(),
        this.adjustMainHeight()
    },
    adjustMainHeight: function() {
        footer.adjust();
        var mainDiv = $(".sec-main"),
        mainHeight = mainDiv.height(),
        contentDiv = $(".content");
        contentDiv.height("auto");
        var sideBarHeight = $("#sideBar").height(),
        contentHeight = contentDiv.height();
        mainHeight >= sideBarHeight && mainHeight > contentHeight ? contentDiv.height(mainHeight) : mainHeight < sideBarHeight && sideBarHeight > contentHeight ? contentDiv.height(sideBarHeight) : mainHeight < contentHeight && mainDiv.height("auto")
    },
    bindLinkEvents: function() {
        $(document.body).delegate(".lnk-pop-kz", "click", popObject.popWebmasterKz).delegate("ul.kzpicList li", "click", popObject.popWebmasterKzPicLi).delegate(".lnk-pop-word", "click", popObject.popWebmasterWord).delegate(".lnk-pop-showshare", "click", popObject.popMapLinkShare).delegate(".lnk-show-reportlink", "click", popObject.popShowReportLnkExample).delegate(".lnk-show-bzh", "click", popObject.popShowLnkBaoZhengHan).delegate(".lnk-show-piclink", "click", popObject.popShowPicOriLink)
    },
    bindButtonEvents: function() {
        $(document.body).delegate(".btn-add-link", "click", tousuForm.addLink).delegate(".input-box .del-icon", "click", tousuForm.deleteLink).delegate("#btnSubmitAdd", "click", tousuForm.submitTousu)
    },
    specialSubmitCategory: function(pid, cid) {
        for (var specialItem = null,
        i = 0; i < tousuForm.specialSubmitCategories.length; i++) {
            var item = tousuForm.specialSubmitCategories[i];
            if (item.pid === pid && item.category_id === cid) {
                specialItem = item;
                break
            }
        }
        return specialItem
    },
    bindTextAreaEvent: function() {
        $("#mainContent").delegate(".del-area", "click",
        function() {
            $(this).siblings("textarea").val("")
        })
    },
    addLink: function() {
        var box = $(this).prev(".sp-err").prev(".input-box"),
        boxLen = $(this).parent().find(".input-box").length,
        maxLen = $(this).data("number");
        boxLen < maxLen && ($(this).prev(".sp-err").before(box.prop("outerHTML")), boxLen === maxLen - 1 && $(this).prop("disabled", !0), tousuForm.adjustMainHeight())
    },
    deleteLink: function() {
        var box = $(this).parent();
        box.parent().find(".input-box").length > 1 && (box.remove(), tousuForm.adjustMainHeight()),
        $(".btn-add-link").prop("disabled", !1)
    },
    submitTousu: function() {
        $("#os_info").val(getOS()),
        $("#browser_info").val(getBrowser()),
        $("#screen").length && !$("#screen").val() && $("#screen").val(window.screen.width + "x" + window.screen.height);
        var valid = checkform.isValid("mainContent", tousuForm.commonFields);
        valid = checkform.isValid("mainContent", tousuForm.addFields) && valid;
        for (var name in tousuForm.addFields) tousuForm.addFields.hasOwnProperty(name) && ("image" === tousuForm.addFields[name].type && (valid = uploadControl.checkFiles($('*[name="' + name + '"]').closest(".pic-list").find("img.upload-pic"), null, name, tousuForm.addFields[name], !0) && valid), "file" === tousuForm.addFields[name].type && (valid = uploadControl.checkFiles($('*[name="' + name + '"]').closest(".file-wrapper").siblings(".file-list").find(".up-file-name"), null, name, tousuForm.addFields[name], !0) && valid));
        if (valid) {
            var self = $(this);
            self.attr("disabled", !0),
            self.text("数据提交中...");
            var data = {};
            for (var name in tousuForm.commonFields) tousuForm.commonFields.hasOwnProperty(name) && (data[name] = $('*[name="' + name + '"]').val());
            for (var name in tousuForm.addFields) tousuForm.addFields.hasOwnProperty(name) && ("image" === tousuForm.addFields[name].type ? data[name] = uploadControl.getImageList(name, tousuForm.addFields[name].datatype) : "file" === tousuForm.addFields[name].type ? data[name] = uploadControl.getFileList(name, tousuForm.addFields[name].datatype) : "links" === name ? (data[name] = [], $('*[name="' + name + '"]').each(function() {
                data[name].push($(this).val())
            })) : data[name] = $('*[name="' + name + '"]').val());
            console.log(data);
            var pid = parseInt($("#pid").val(), 10),
            cid = parseInt($("#category_id").val(), 10),
            submitOptions = tousuForm.specialSubmitCategory(pid, cid);
            if (submitOptions && (!0, submitOptions.submitFn && "function" == typeof submitOptions.submitFn && !0 === (data = submitOptions.submitFn(data)))) return void tousuForm.showSubmitResult(!0);
            var postUrl = "/toususubmit";
            $("#action").length && $("#action").val() && (postUrl = $("#action").val()),
            $.ajax({
                url: postUrl,
                type: "POST",
                dataType: "json",
                data: data,
                success: function(result) {
                    result && !result.errno ? tousuForm.showSubmitResult(!0) : tousuForm.showSubmitResult(!1, result.errmsg)
                },
                error: function(e) {
                    tousuForm.showSubmitResult(!1)
                },
                complete: function() {
                    tousuForm.adjustMainHeight()
                }
            })
        }
    },
    showSubmitResult: function(success, msg) {
        var mainObj = $("#mainContent"),
        html = "";
        html = success ? '<div class="tousu-result success"><i></i><h5>反馈成功</h5><p>我们会尽快审核处理，并将结果通过百度账号下发给您<br/>您也可在<a href="/pscenter">个人中心</a>查看反馈进度</p></div>': '<div class="tousu-result failed"><i></i><h5>反馈失败</h5><p>' + (msg || "服务器忙，请您稍后进行反馈。") + "</p></div>",
        mainObj.html(html),
        footer.adjust(),
        window.scroll(0, 0)
    },
    bindProCity: function() {
        if (null !== cityData) {
            for (var htm = [], i = 0; i < cityData.length; i++) htm.push('<li val="' + cityData[i].text + '">' + cityData[i].text + "</li>");
            $("#province").siblings(".dropdown").html(htm),
            $(document.body).delegate("#province", "change", {
                conid: "mainContent",
                key: "province",
                field: tousuForm.addFields.province
            },
            function() {
                var self = $(this),
                proVal = self.val(),
                chtm = [],
                cityObj = $("#city");
                cityObj.val(""),
                cityObj.siblings(".selval").text("请选择城市").attr("val", "").addClass("blank");
                for (var i = 0; i < cityData.length; i++) if (proVal === cityData[i].text) {
                    for (var j = 0; j < cityData[i].children.length; j++) chtm.push('<li val="' + cityData[i].children[j].text + '">' + cityData[i].children[j].text + "</li>");
                    cityObj.siblings(".dropdown").html(chtm);
                    break
                }
            })
        }
    },
    bindCheckChange: function() {
        for (var name in tousuForm.addFields) if (tousuForm.addFields.hasOwnProperty(name) && (tousuForm.addFields[name].changein && $(document.body).delegate('*[name="' + name + '"]', "change", {
            conid: "mainContent",
            key: name,
            field: tousuForm.addFields[name]
        },
        function() {
            for (var self = $(this), kname = self.attr("name"), typeVal = self.val(), arrChangin = tousuForm.addFields[kname].changein, i = 0; i < arrChangin.length; i++) {
                var changeObj = $('*[name="' + arrChangin[i] + '"]'),
                lineObj = changeObj.closest(".fankui-item"),
                isRequired = lineObj.find(".bitian").length;
                typeVal === lineObj.attr("showtype") ? (lineObj.removeClass("hid"), isRequired && (tousuForm.addFields[arrChangin[i]].required = !0)) : (lineObj.hasClass("hid") || lineObj.addClass("hid"), isRequired && (tousuForm.addFields[arrChangin[i]].required = !1))
            }
        }), tousuForm.addFields[name].changefor)) {
            var forField = tousuForm.addFields[name].changefor,
            forFieldValue = tousuForm.addFields[forField].value;
            forFieldValue !== tousuForm.addFields[name].showtype && tousuForm.addFields[name].required && (tousuForm.addFields[name].required = !1)
        }
    }
},
popObject = {
    popWebmasterKz: function(e) {
        e.preventDefault();
        var htm = [];
        htm.push('<ul class="kzpicList">'),
        htm.push('<li class="on"><div class="pop-list-title">如何获取快照链接？</div><i></i>'),
        htm.push('<p class="pop-list-con">将鼠标移动至“百度快照”的链接上，点击鼠标<strong>右键</strong>，选择<strong>复制链接地址</strong>即可获取百度快照链接。不同浏览器下，复制链接地址的选项可能不同。</p>'),
        htm.push('<img src="/resources/images/add/webmaster_kuaizhao.jpg"/></li>'),
        htm.push('<li><div class="pop-list-title">如何获取索引链接？</div><i></i>'),
        htm.push('<p class="pop-list-con">将鼠标移动至该条结果的标题上，点击鼠标<strong>右键</strong>，选择<strong>复制链接地址</strong>即可获取索引链接。不同浏览器下，复制链接地址的选项可能不同。</p>'),
        htm.push('<img src="/resources/images/add/webmaster_suoyin.jpg" width="540"/></li>'),
        htm.push("</ul>"),
        htm = htm.join(""),
        Popup.init({
            type: "html",
            content: htm,
            width: 630,
            height: 520
        }),
        $("#popupBody").css({
            "overflow-x": "auto"
        }),
        $("#popupBody").css({
            "overflow-y": "hidden"
        })
    },
    popWebmasterKzPicLi: function() {
        var li = $(this);
        if (!li.hasClass("on")) {
            li.parent().children().removeClass("on"),
            li.addClass("on")
        }
    },
    popWebmasterWord: function(e) {
        e.preventDefault(),
        Popup.init({
            type: "html",
            content: '<div class="pop-web-img"><img src="/resources/images/add/webmaster_word.png?2018"/></div>',
            width: 600,
            height: 480
        })
    },
    popMapLinkShare: function(e) {
        e.preventDefault(),
        Popup.init({
            type: "html",
            content: '<div class="pop-web-img"><img src="http://img.baidu.com/img/tousu/map_guide.jpg" width="700" height="295"></div>',
            width: 750,
            height: 400
        })
    },
    popShowReportLnkExample: function(e) {
        e.preventDefault(),
        Popup.init({
            type: "html",
            content: '<div class="pop-web-img"><img src="/resources/images/add/zhidao_shili.jpg"></div>',
            width: 630,
            height: 470
        })
    },
    popShowLnkBaoZhengHan: function(e) {
        e.preventDefault(),
        Popup.init({
            type: "html",
            content: '<div class="pop-web-img"><img src="http://img.baidu.com/img/tousu/zhidao_bzh.jpg"width="574"  height="466"></div>',
            width: 620,
            height: 540
        })
    },
    popShowPicOriLink: function(e) {
        e.preventDefault(),
        Popup.init({
            type: "html",
            content: '<div><img src="http://img.baidu.com/img/tousu/image_tips.jpg" width=501 height=400></div>',
            width: 580,
            height: 480
        })
    }
};;
var jubaoForm = {
    commonFields: null,
    init: function(fields) {
        this.commonFields = fields,
        this.initJubaoType(),
        this.bindProdEvent(),
        this.bindTextAreaEvent(),
        this.bindSubmitJubao()
    },
    initJubaoType: function() {
        $(".jubao-type").delegate(".type-item", "click",
        function() {
            var self = $(this);
            self.hasClass("on") ? $(".jubao-container").toggle() : ($(".type-item.on").removeClass("on"), self.addClass("on"), $("#type").val(self.data("type")), $(".lbl-type").text(self.find(".tit").text()), $(".jubao-container").show()),
            footer.adjust(),
            window.location.hash = "#add"
        })
    },
    bindProdEvent: function() {
        $("#pid").bind("change",
        function() {
            var pid = $(this).val();
            $("#jubaoDetailInfo").load("/ajaxgetjubaofields?pid=" + pid,
            function(response, status, e) {
                if ("success" === status && jubaoFields) {
                    var fileFields = {};
                    for (var key in jubaoFields) if (jubaoFields.hasOwnProperty(key)) {
                        var selector = '*[name="' + key + '"]',
                        field = $("#jubaoDetailInfo").find(selector),
                        type = field.attr("type");
                        "file" === type && (fileFields[key] = jubaoFields[key])
                    }
                    fileFields !== {} && uploadControl.init(fileFields),
                    checkform.checkEvents("jubaoDetailInfo", jubaoFields)
                }
            })
        })
    },
    bindTextAreaEvent: function() {
        $(".jubao-container").delegate(".del-area", "click",
        function() {
            $(this).siblings("textarea").val("")
        })
    },
    bindSubmitJubao: function() {
        $(".jubao-container").delegate("#btnSubmitJubao", "click",
        function() {
            $("#jubao_os").val(getOS()),
            $("#jubao_browser").val(getBrowser());
            var valid = checkform.isValid("jubaoForm", jubaoForm.commonFields);
            valid = checkform.isValid("jubaoForm", jubaoFields) && valid;
            for (var name in jubaoFields) jubaoFields.hasOwnProperty(name) && "image" === jubaoFields[name].type && (valid = uploadControl.checkFiles($('*[name="' + name + '"]').closest(".pic-list").find("img.upload-pic"), null, name, jubaoFields[name], !0) && valid);
            if (valid) {
                var self = $(this);
                self.attr("disabled", !0),
                self.val("数据提交中...");
                var data = {};
                for (var name in jubaoForm.commonFields) jubaoForm.commonFields.hasOwnProperty(name) && (data[name] = $('*[name="' + name + '"]').val());
                for (var name in jubaoFields) jubaoFields.hasOwnProperty(name) && ("image" === jubaoFields[name].type ? data[name] = uploadControl.getImageList(name, jubaoFields[name].datatype) : data[name] = $('*[name="' + name + '"]').val());
                $.ajax({
                    url: "/jubaosubmit",
                    type: "POST",
                    dataType: "json",
                    data: data,
                    success: function(result) {
                        result && !result.errno ? jubaoForm.showSubmitResult(!0) : jubaoForm.showSubmitResult(!1, result.errmsg)
                    },
                    error: function(e) {
                        jubaoForm.showSubmitResult(!1)
                    }
                })
            }
        })
    },
    showSubmitResult: function(success, msg) {
        var mainObj = $("#jubaoMain"),
        html = "";
        html = success ? '<div class="jubao-result success"><i></i><h5>受理成功</h5><p>我们会尽快审核处理，并将结果通过百度账号下发给您<br/>您也可在<a href="/pscenter">个人中心</a>查看举报进度</p></div>': '<div class="jubao-result failed"><i></i><h5>反馈失败</h5><p>' + (msg || "服务器忙，请您稍后进行反馈。") + "</p></div>",
        mainObj.html(html),
        footer.adjust(),
        window.scroll(0, 0),
        window.location.hash = "#"
    }
};