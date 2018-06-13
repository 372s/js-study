function body() {
    var F = 0,
    D = 0,
    A = 0,
    I = 0,
    G = 0,
    E = 0,
    B = window,
    J = document,
    C = J.documentElement;
    return F = C.clientWidth || J.body.clientWidth,
    D = B.innerHeight || C.clientHeight || J.body.clientHeight,
    I = J.body.scrollTop || C.scrollTop,
    A = J.body.scrollLeft || C.scrollLeft,
    G = Math.max(J.body.scrollWidth, C.scrollWidth || 0),
    E = Math.max(J.body.scrollHeight, C.scrollHeight || 0, D),
    {
        scrollTop: I,
        scrollLeft: A,
        documentWidth: G,
        documentHeight: E,
        viewWidth: F,
        viewHeight: D
    }
}
function exeJsonp(apiid, url) {
    var ss = document.getElementById(apiid);
    ss && document.body.removeChild(ss),
    ss = document.createElement("script"),
    ss.id = apiid,
    ss.src = url + "&t=" + Math.random(),
    ss.charset = "utf-8",
    document.body.appendChild(ss)
}
function initSearchForm() {
    var oInput = baidu("#search_txt"),
    defVal = oInput.attr("placeholder"),
    formO = baidu("#searchForm"),
    curVal = defVal,
    isEmpty = function() {
        var val = baidu.string(oInput.val()),
        reval = val.trim();
        return val.length <= 0 || reval === defVal
    },
    onFocus = function() {
        baidu.string(this.value).trim() === defVal && (this.value = "")
    },
    onBlur = function() {
        isEmpty() && (this.value = defVal),
        curVal = this.value
    },
    onSubmit = function(e) {
        isEmpty() && e.preventDefault()
    };
    oInput.on("focus", onFocus),
    oInput.on("blur", onBlur),
    formO.on("submit", onSubmit),
    formO.on("webkitspeechchange",
    function() {
        var newVal = oInput.val();
        curVal === defVal && oInput.val(newVal.replace(curVal, "")),
        formO.submit()
    })
}
function showPage(curPage, totalPage, totalCount, isShowEndPage, id) {
    if (document.getElementById(id)) {
        var pageStart = 0,
        pageEnd = 0,
        pageShow = 2,
        str = '<span class="total-page">共有结果<span class="total-count">' + totalCount + "</span>条</span>";
        if (0 === totalPage && (totalPage = 1), 1 === totalPage) return void(document.getElementById(id).innerHTML = str);
        curPage > 1 && (str += '<a href="javascript:void(0)" data-page=1 class="pagelink btn-page">首页</a>'),
        curPage > 1 && (str += '<a href="javascript:void(0)" data-page=' + (curPage - 1) + ' class="pagelink btn-page">上一页</a>'),
        pageStart = curPage - pageShow - 1,
        pageEnd = curPage + pageShow + 1,
        curPage <= pageShow && (pageEnd = pageShow + pageShow + 2),
        totalPage - curPage <= pageShow && (pageStart = totalPage - pageShow - pageShow - 1);
        for (var i = pageStart; i <= pageEnd; i++) 1 === i && (str += 1 === curPage ? '<a href="javascript:void(0)" data-page=1 class="current">1</a>': '<a href="javascript:void(0)" data-page=1 class="pagelink page-num">1</a>'),
        i > 1 && i <= totalPage && (str += i === curPage ? '<a href="javascript:void(0)" data-page=' + i + ' class="current">' + i + "</a>": '<a href="javascript:void(0)" data-page=' + i + ' class="pagelink page-num">' + i + "</a>");
        curPage < totalPage && (str += '<a href="javascript:void(0)" data-page=' + (curPage + 1) + ' class="pagelink btn-page">下一页</a>'),
        curPage < totalPage && isShowEndPage && (str += '<a href="javascript:void(0)" data-page=' + totalPage + ' class="pagelink btn-page">末页</a>'),
        document.getElementById(id).innerHTML = str
    }
}
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
var userAgent = navigator.userAgent.toLowerCase();
jQuery.browser = {
    version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
    safari: /webkit/.test(userAgent),
    opera: /opera/.test(userAgent),
    msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
    mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
},
jQuery.attachEvent = function(obj, evt, func, eventobj) {
    eventobj = eventobj || obj,
    obj.addEventListener ? obj.addEventListener(evt, func, !1) : eventobj.attachEvent && obj.attachEvent("on" + evt, func)
};
var $Class = {
    create: function() {
        var obj = arguments.length ? arguments[0] : null;
        return function() {
            return null == obj && (obj = this),
            (obj.$init || obj.init || obj.initialize).apply(obj, arguments),
            obj
        }
    }
},
footer = {
    init: function() {
        var ft = $(".footer");
        void 0 !== ft && ft.length > 0 && ($.attachEvent(window, "resize", this.adjust, document), this.adjust())
    },
    adjust: function() {
        var contentDiv = $(".sec-main .content"),
        mainDiv = $(".sec-main"),
        jubaoMainDiv = $("#jubaoMain"),
        bannerHeight = (contentDiv.height(), $(".banner").outerHeight() ? $(".banner").outerHeight() : 0),
        otherHeight = $(".header").outerHeight() + bannerHeight + $(".footer").outerHeight(),
        winHeight = $(window).height();
        $("body").height() < winHeight && (jubaoMainDiv.outerHeight() >= 0 ? jubaoMainDiv.outerHeight(winHeight - otherHeight) : mainDiv.height(winHeight - otherHeight))
    }
},
SetTab = $Class.create({
    options: {
        tabWrapId: "",
        cntWrapId: "",
        showIndex: null,
        classPrefix: "setTab-",
        tabOnClass: "side-active",
        eType: "click",
        eCallback: null
    },
    init: function(htOptions) {
        baidu.object.merge(this.options, htOptions || {},
        {
            overwrite: !0
        }),
        this.getElems(),
        this.tabs.length <= 0 || (this.bindEvt(), void 0 !== htOptions.showIndex && this.show(htOptions.showIndex))
    },
    getElems: function() {
        var opt = this.options;
        this.tabs = baidu("#" + opt.tabWrapId).children("." + opt.classPrefix + "tab"),
        this.cnts = $("#" + opt.cntWrapId).children("." + opt.classPrefix + "panel")
    },
    bindEvt: function() {
        var self = this,
        tabs = self.tabs,
        opt = self.options,
        eType = opt.eType;
        tabs.each(function(index, item) {
            baidu.dom(item)[eType](function(e) {
                self.show(index)
            })
        })
    },
    show: function(index) {
        var self = this,
        tabs = self.tabs,
        cnts = self.cnts,
        opt = self.options,
        tabOnClass = opt.tabOnClass; (index >= tabs.length || index < 0) && (index = 0),
        tabs.each(function(e) {
            tabs.eq(e).find("a").eq(0).removeClass(tabOnClass)
        }),
        tabs.eq(index).find("a").eq(0).addClass(tabOnClass),
        cnts.hide(),
        cnts.eq(index).show(),
        footer.adjust(),
        opt.eCallback && opt.eCallback(index)
    }
}),
login = {
    timer: null,
    data: null,
    passHost: "",
    staticPage: "",
    passTpl: "",
    init: function(host, spage, tpl) {
        this.passHost = host,
        this.staticPage = spage,
        this.passTpl = tpl,
        this.bindLogin(),
        this.bindHandle()
    },
    bindHandle: function() {
        var t = this,
        overLog = !1;
        $(".loginfo").bind("click", null,
        function() {
            t.clear(),
            $("#moreLoginInfo").hasClass("hid") ? ($("#login").removeClass("on"), $("#moreLoginInfo").removeClass("hid")) : $("#moreLoginInfo").addClass("hid")
        }),
        $(".loginfo").hover(function() {
            overLog = !0
        },
        function() {
            overLog = !1
        }),
        $(document).bind("click",
        function(e) {
            var e = e || window.event,
            elem = e.target || e.srcElement;
            $(elem);
            overLog || $("#moreLoginInfo").addClass("hid")
        })
    },
    bindLogin: function() {
        var btnLog = baidu("#btnLogin"),
        self = this;
        btnLog.on("click",
        function(e) {
            e.preventDefault(),
            self.popup()
        }),
        baidu("#form-panel").find("a.btnLog").on("click",
        function(e) {
            e.preventDefault(),
            self.popup()
        })
    },
    clear: function() {
        window.clearTimeout(this.timer)
    },
    hide: function() {
        $("#moreLoginInfo").hasClass("hid") || $("#moreLoginInfo").addClass("hid")
    },
    popup: function(onSucc, onFail) {
        var loginpop = this.loginpop;
        if (loginpop) return void loginpop.show();
        var defLoginFail = function() {
            window.location.href = login.passHost + "/?login&tpl=" + login.passTpl + "&u=" + escape(location.href)
        },
        onLoginFailed = onFail || defLoginFail,
        logCfg = {
            cache: !0,
            apiOpt: {
                product: login.passTpl,
                staticPage: login.staticPage,
                u: window.location.href
            },
            onSubmitedErr: onLoginFailed,
            onLoginSuccess: function() {
                void 0 !== typeof window.location.reload ? window.location.reload() : window.location.href = window.location.href
            }
        };
        onSucc && (logCfg.onLoginSuccess = onSucc),
        loginpop = passport.pop.init(logCfg),
        this.loginpop = loginpop,
        this.loginPanelInit = !0,
        loginpop.show()
    },
    count: function() {
        var errFun = function() {},
        t = this;
        $.ajax("/api/count", {
            type: "get",
            dataType: "json",
            success: function(result) {
                var isHasData = void 0 !== result.data && parseInt(result.data.total, 10) > 0;
                0 === result.errno && isHasData ? ($("#login").addClass("on"), t.data = result.data) : errFun()
            },
            error: errFun
        })
    }
},
uploadImg = {
    btns: null,
    init: function() {
        var self = this,
        btns = self.btns = baidu("#form-panel").find("a.btn-upload-img");
        btns.length <= 0 || btns.click(function(e) {
            e.preventDefault();
            var btn = baidu(this),
            w = 1 * btn.attr("pop-width"),
            h = 1 * btn.attr("pop-height");
            self.showPop(btn.attr("href"), w, h, btn)
        })
    },
    showPop: function(url, w, h, srcElem) {
        url = url + ( - 1 === url.indexOf("?") ? "?": "&") + "t=" + (new Date).getTime();
        var bro = $.browser;
        bro.msie && "6.0" === bro.version ? (void 0 === h || isNaN(h)) && (h = 300) : (void 0 === h || isNaN(h)) && (h = 242),
        Popup.init({
            title: "上传附件",
            type: "iframe",
            content: url,
            width: w || 505,
            height: h,
            element: srcElem
        })
    },
    clearImgPreview: function(formIdFlag) {
        var previewId = "form" + formIdFlag + "_imagePreview";
        document.getElementById(previewId).innerHTML = ""
    },
    showSmallImg: function(formIdFlag, picUrl) {
        var btnDelId = "form" + formIdFlag + "_upImg_del",
        htm = '<div class="small-image"><img src="' + picUrl + '" alt="" class="pic"/>';
        htm += ' <a href="#" id="' + btnDelId + '" class="img-del"></a></div>';
        var imgPrevew = baidu("#form" + formIdFlag + "_imagePreview");
        imgPrevew.hide(),
        imgPrevew.append(htm);
        var btnDel = baidu("#" + btnDelId);
        $("#form" + formIdFlag + "_imagePreview").parent().next().show(),
        btnDel.click(function(e) {
            e.preventDefault(),
            uploadImg.deleteImg(formIdFlag)
        })
    },
    deleteImg: function(formIdFlag) {
        var idPre = "form" + formIdFlag;
        document.getElementById(idPre + "_imagePreview").style.display = "none",
        document.getElementById(idPre + "_uploadImage").style.display = "",
        document.getElementById(idPre + "_imageId").value = "",
        uploadImg.arrayImgs($("#" + idPre + "_uploadImage").parent())
    },
    arrayImgs: function(hObj) {
        var ul = hObj.parent();
        hObj.hide(),
        hObj.appendTo(hObj.parent());
        var lis = ul.find("li");
        if (0 === lis.filter(":visible").length) lis.filter(":first").show();
        else if (lis.length > 1) {
            var lastli = lis.filter(":visible").filter(":last");
            0 === lastli.find(".btn-upload-img").filter(":visible").length && lastli.next().show()
        }
    },
    uploadImgSuccess: function(formIdFlag, picId) {
        if ("" !== picId && void 0 !== picId) {
            var idPre = "form" + formIdFlag;
            document.getElementById(idPre + "_uploadImage").style.display = "none",
            document.getElementById(idPre + "_imagePreview").style.display = "",
            document.getElementById(idPre + "_imageId").value = picId;
            var bro = $.browser;
            if (bro.msie && "6.0" === bro.version) {
                var img = $("#" + idPre + "_imagePreview");
                $("#" + idPre + "_imagePreview").find(".img-del").css({
                    left: img.position().left + 65
                })
            }
        }
    },
    showSmallImgLst: function(formIdNum, picUrl, index) {
        var htm = [];
        htm.push('<li class="smallImage" id="' + smImgId + '">'),
        htm.push('<img src="' + picUrl + '" alt="" style="width:120px;height:120px" class="pic"/>'),
        htm.push('<a href="#" id="' + btnDelId + '" formid="' + formIdNum + '" pindex="' + index + '">删除</a></li>');
        var imgPrevew = baidu("#form" + formIdNum + "_imagePreview");
        imgPrevew.hide(),
        imgPrevew.append(htm.join("")),
        baidu("#" + btnDelId).click(function(e) {
            e.preventDefault(),
            uploadImg.deleteImgLst(formIdNum, baidu.dom(this).attr("pindex"))
        })
    },
    deleteImgLst: function(formId, picIndex) {
        var smImgId = baidu("#form" + formId + "_smallImage" + picIndex),
        imgPreview = baidu("#form" + formId + "_imagePreview");
        smImgId.remove(),
        baidu("#form" + formId + "_imageId_" + picIndex).remove(),
        imgPreview.children("li").length <= 0 && (imgPreview.hide(), document.getElementById("form" + formId + "_uploadImage").style.display = "")
    },
    showImgLink: function(formIdFlag, picUrl) {
        var preview = (baidu("#form" + formIdFlag + "_uploadImage"), baidu("#form" + formIdFlag + "_imagePreview")),
        btnDelId = "form" + formIdFlag + "_upImg_del",
        htm = '<a href="' + picUrl + '" target="_blank">查看图片</a> <a href="#" id="' + btnDelId + '">删除</a>';
        preview.html(htm).hide(),
        baidu("#" + btnDelId).click(function(e) {
            e.preventDefault(),
            uploadImg.deleteImg(formIdFlag)
        })
    },
    showSmallImage: function(formIdNum, loc) {
        if (document.getElementById("form" + formIdNum + "_uploadImage") && "" !== loc) {
            var style = "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);";
            style += "width:120px;height:120px;";
            var forIe = '<div id=\'form" + formIdNum + "_IEpreview\' class="pic" style="' + style + '"></div>',
            forOt = "<img src='\"+ loc +\"' style='width:120px;height:120px' class=\"pic\"/>",
            isLtIe10 = baidu.browser.ie && baidu.browser.ie < 10,
            img = isLtIe10 ? forIe: forOt,
            btnDelId = "form" + formIdNum + "_upImg_del",
            inner = '<div class="smallImage">' + img + '<span><a href="#" id="';
            inner += btnDelId + '" formid="' + formIdNum + '">删除</a></div>';
            var imgPrev = baidu("#form" + formIdNum + "_imagePreview");
            if (imgPrev.html(inner), isLtIe10) {
                baidu("#form" + formIdNum + "_IEpreview")[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = loc
            }
            imgPrev.hide(),
            baidu("#" + btnDelId).click(function(e) {
                e.preventDefault(),
                uploadImg.deleteImage(formIdNum)
            })
        }
    },
    uploadImageSuccess: function(formIdNum, picId, picIdFlag) {
        if ("" !== picId && void 0 !== picId) {
            var idPre = "form" + formIdNum + (picIdFlag ? "_" + picIdFlag: "");
            document.getElementById(idPre + "_uploadImage").style.display = "none",
            document.getElementById(idPre + "_imagePreview").style.display = "",
            document.getElementById(idPre + "_imageId").value = picId
        }
    },
    deleteImage: function(formIdNum, picIdFlag) {
        var idPre = "form" + formIdNum + (picIdFlag ? "_" + picIdFlag: "");
        document.getElementById(idPre + "_imagePreview").style.display = "none",
        document.getElementById(idPre + "_uploadImage").style.display = "",
        document.getElementById(idPre + "_imageId").value = ""
    }
},
customDDl = {
    prevSel: null,
    init: function() {
        $("body").delegate(".bd-check-box .check-item", "click", this.bindClickCheck).delegate(".bd-radio .radio-item", "click", this.bindClickRadio).delegate(".bd-wrapper-dropdown ul li", "click", this.selectDownItem).delegate(".bd-wrapper-dropdown", "click", this.showDownList)
    },
    showDownList: function() {
        var self = $(this),
        id = self.children("input").attr("id");
        if (customDDl.prevSel !== id) {
            var allArrow = $("body").find(".i-arrow"),
            allDown = $("body").find(".dropdown");
            allArrow.removeClass("show"),
            allDown.hide()
        }
        var uldown = self.find(".dropdown"),
        arrow = self.find(".i-arrow");
        uldown.toggle(),
        arrow.toggleClass("show"),
        customDDl.prevSel = id
    },
    selectDownItem: function() {
        var self = $(this),
        par = self.parent();
        self.siblings().removeClass("on"),
        self.addClass("on");
        var sel = par.siblings(".selval");
        sel.text(self.text()),
        sel.attr("val", self.attr("val")),
        sel.removeClass("blank");
        var hid = par.siblings('input[type="hidden"]');
        return void 0 !== hid && hid.length && (hid.val(self.attr("val")), void 0 !== hid.change && "function" == typeof hid.change && hid.change()),
        par.siblings(".i-arrow").toggleClass("show"),
        par.toggle(),
        !1
    },
    bindClickCheck: function() {
        var self = $(this);
        self.toggleClass("on");
        var hid = self.siblings('input[type="hidden"]');
        if (void 0 !== hid && hid.length) {
            var vals = [];
            self.parent().find(".on").each(function() {
                vals.push($(this).attr("val"))
            }),
            hid.val(vals.join(",")),
            void 0 !== hid.change && "function" == typeof hid.change && hid.change()
        }
    },
    bindClickRadio: function() {
        var self = $(this);
        self.siblings().removeClass("on"),
        self.hasClass("on") || self.addClass("on");
        var hid = $(this).siblings('input[type="hidden"]');
        void 0 !== hid && hid.length && (hid.val($(this).attr("val")), void 0 !== hid.change && "function" == typeof hid.change && hid.change())
    }
};
baidu.dom(document).ready(function() {
    initSearchForm(),
    uploadImg.init(),
    login.count(),
    customDDl.init(),
    footer.init()
});