jQuery.extend({
    isSafe: false,
    createUploadIframe: function(a, d) {
        var b = "jUploadFrame" + a;
        if (window.ActiveXObject && (window.ky_browser ? window.ky_browser.isIE6 || window.ky_browser.isIE7: true)) {
            var c = document.createElement('<iframe id="' + b + '" name="' + b + '" />');
            if (typeof d == "boolean") c.src = "javascript:false";
            else if (typeof d == "string") c.src = d
        } else {
            c = document.createElement("iframe");
            c.id = b;
            c.name = b
        }
        c.style.position = "absolute";
        c.style.top = "-1000px";
        c.style.left = "-1000px";
        document.body.appendChild(c);
        return c
    },
    createUploadForm: function(a, d) {
        var b = "jUploadForm" + a,
        c = "jUploadFile" + a;
        b = $('<form action="" method="POST" name="' + b + '" id="' + b + '" enctype="multipart/form-data"></form>');
        var g = $("#" + d),
        j = $(g).clone();
        $(g).attr("id", c);
        $(g).before(j);
        $(g).appendTo(b);
        $(b).css("position", "absolute");
        $(b).css("top", "-1200px");
        $(b).css("left", "-1200px");
        $(b).appendTo("body");
        return b
    },
    ajaxFileUpload: function(a) {
        var d = this,
        b = $("#__hideWin"),
        c,
        g,
        j = (new Date).getTime();
        g = jQuery.createUploadIframe(j, a.secureuri);
        c = "jUploadFrame" + j;
        d.isSafe = !$("#frameId").attr("name");
        if (!b.length) {
            alert("\u7a0b\u5e8f\u9519\u8bef\uff0c\u76ee\u524d\u6d4f\u89c8\u5668\u4e0d\u88ab\u652f\u6301...");
            $(g).remove();
            return false
        }
        a = jQuery.extend({},
        jQuery.ajaxSettings, a);
        if (d.isSafe) {
            $(g).remove();
            c = "__hideWin";
            if (b.attr("busy")) {
                alert("\u5176\u4ed6\u4e0a\u4f20\u52a8\u4f5c\u672a\u5b8c\u6210\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5...");
                setTimeout(function() {
                    b.removeAttr("busy")
                },
                5E3);
                return false
            }
            b.attr("busy", true)
        }
        var h = jQuery.createUploadForm(j, a.fileElementId);
        g = "jUploadForm" + j;
        a.global && !jQuery.active++&&jQuery.event.trigger("ajaxStart");
        var m = false,
        f = {};
        a.global && jQuery.event.trigger("ajaxSend", [f, a]);
        var l = function(k) {
            var e = document.getElementById(c);
            try {
                if (e.contentWindow) {
                    f.responseText = e.contentWindow.document.body ? e.contentWindow.document.body.innerHTML: null;
                    f.responseXML = e.contentWindow.document.XMLDocument ? e.contentWindow.document.XMLDocument: e.contentWindow.document
                } else if (e.contentDocument) {
                    f.responseText = e.contentDocument.document.body ? e.contentDocument.document.body.innerHTML: null;
                    f.responseXML = e.contentDocument.document.XMLDocument ? e.contentDocument.document.XMLDocument: e.contentDocument.document
                }
            } catch(n) {
                jQuery.handleError(a, f, null, n)
            }
            if (f || k == "timeout") {
                m = true;
                var i;
                try {
                    i = k != "timeout" ? "success": "error";
                    if (i != "error") {
                        var o = jQuery.uploadHttpData(f, a.dataType);
                        a.success && a.success(o, i);
                        a.global && jQuery.event.trigger("ajaxSuccess", [f, a])
                    } else jQuery.handleError(a, f, i)
                } catch(p) {
                    i = "error";
                    jQuery.handleError(a, f, i, p)
                }
                a.global && jQuery.event.trigger("ajaxComplete", [f, a]);
                a.global && !--jQuery.active && jQuery.event.trigger("ajaxStop");
                a.complete && a.complete(f, i);
                jQuery(e).unbind();
                setTimeout(function() {
                    try {
                        if (d.isSafe) {
                            b.removeAttr("busy")
                        } else $(e).remove();
                        $(h).remove()
                    } catch(q) {
                        jQuery.handleError(a, f, null, q)
                    }
                },
                100);
                f = d.isSafe ? {}: null
            }
        };
        a.timeout > 0 && setTimeout(function() {
            m || l("timeout")
        },
        a.timeout);
        try {
            h = $("#" + g);
            $(h).attr("action", a.url);
            $(h).attr("method", "POST");
            $(h).attr("target", c);
            if (h.encoding) h.encoding = "multipart/form-data";
            else h.enctype = "multipart/form-data";
            $(h).submit()
        } catch(r) {
            jQuery.handleError(a, f, null, r)
        }
        g = function(k) {
            var e = document.getElementById(c);
            window.attachEvent ? e.attachEvent("onload", k) : e.addEventListener("load", k, false)
        };
        if (d.isSafe) {
            if (!b.data("inited")) {
                b.data("inited", true);
                g(function() {
                    window.safe_handler.onload()
                })
            }
            window.safe_handler.real_handler = function() {
                l()
            }
        } else g(function() {
            l()
        });
        return {
            abort: function() {}
        }
    },
    uploadHttpData: function(a, d) {
        var b = !d;
        b = d == "xml" || b ? a.responseXML: a.responseText;
        d == "script" && jQuery.globalEval(b);
        if (d == "json") if (jQuery.parseJSON) b = jQuery.parseJSON(b);
        else eval("data = " + b);
        d == "html" && jQuery("<div>").html(b).evalScripts();
        return b
    }
}); (function() {
    window.safe_handler = {
        real_handler: null,
        onload: function() {
            this.real_handler && this.real_handler()
        }
    }
})();