/**
 * @file Describe the file
 */

/**
 * exeJsonp
 *
 * @param {number} apiid id
 * @param {string} url 链接
 */
function exeJsonp(apiid, url) {
    var ss = document.getElementById(apiid);
    if (ss) {
        document.body.removeChild(ss);
    }
    ss = document.createElement('script');
    ss.id = apiid;
    ss.src = url + '&t=' + Math.random();
    ss.charset = 'utf-8';
    document.body.appendChild(ss);
}
var sugapi = 'http://' + window.location.host;
var suggestParam = {
    suggestionurl: sugapi + '/sug',
    // show max num of the results every time
    preMaxNum: 10,
    // can't send empty msg
    sendEmpty: false,
    suggestInputId: 'search_txt',
    suggestContainerId: 'searchSuggest',
    jsonpId: 'querySuggestionScript'
};
var suggestion = {
    cache: {
        words: [],
        data: []
    },
    input: baidu('#' + suggestParam.suggestInputId),
    activeSug: null,
    getList: function () {
        var list = baidu('#' + suggestParam.suggestContainerId).children();
        return list;
    },
    setActiveSug: function (li) {
        var activeLi = this.activeSug;
        if (activeLi) {
            activeLi[0].className = '';
        }
        if (li) {
            li.addClass('on');
        }
        this.activeSug = li;
    },
    clear: function () {
        var container = baidu('#' + suggestParam.suggestContainerId);
        container.html('').hide();
        suggestion.isShow = false;
        suggestion.setActiveSug(null);
    },
    hide: function () {
        baidu('#' + suggestParam.suggestContainerId).hide();
        suggestion.isShow = false;
        suggestion.setActiveSug(null);
    },
    fill: function (query) {
        if (!query || query.length === 0) {
            suggestion.clear();
            return;
        }
        var sgtContainer = baidu('#' + suggestParam.suggestContainerId);
        var suggestionList = [];
        var showNum = suggestParam['preMaxNum'] > query.length ? query.length : suggestParam['preMaxNum'];
        for (var i = 0; i < showNum; i++) {
            var tmpHtm = '<li index="' + i + '">' + query[i] + '</li>';
            suggestionList.push(tmpHtm);
        }
        sgtContainer.html(suggestionList.join('')).show();
        suggestion.isShow = true;
        suggestion.setActiveSug(null);
    },
    isShow: false,

    setInputVal: function (val) {
        if (this.input.attr('disabled')) { return; }
        this.input.val(val);
    },
    getInputVal: function () {
        return this.input.val();
    },
    /*
    select: function(question){
        this.setInputVal(question);
        this.clear();
        this.submit();
    },
    submit: function(){
        $("#btnChat").trigger("click");
    },*/
    /* //check content length
    checkLength: function(){
        var input = $("#" + suggestParam.suggestInputId),
        val = input.val();

        if(val.length > 30){
           input.val(val.substr(0, 30));
           return false;
    }
    return true;
},*/

    saveToCache: function (query) {
        // 存入缓存
        var cache = suggestion.cache;
        var input = baidu('#' + suggestParam.suggestInputId);
        var wordIndex = baidu.array(suggestion.cache.words).indexOf(input.val());
        // 如果历史查询过，但无结果，用新结果替换
        // 如果历史查询过，也有结果，移动到cahce的最后
        // 如果没有查询过，直接push进cache
        if (wordIndex > -1) {
            if (cache.data[wordIndex].length <= 0) {
                cache.words.splice(wordIndex, 1);
                cache.data.splice(wordIndex, 1);
            } else {
                cache.words[cache.words.length] = cache.words[wordIndex];
                cache.data[cache.data.length] = cache.data[wordIndex].concat();
                cache.words.splice(wordIndex, 1);
                cache.data.splice(wordIndex, 1);
                return (cache.words.length - 1);
            }
        }
        if (query && query.length > 0) {
            cache.words.push(input.val());
            cache.data.push(query);
        }
        return -1;
    }
};

/**
 * 查找
 * @param {Object} result Obj
 */
function searchSugCbk(result) {
    var query = result['s'];
    suggestion.fill(query);
    if (!query || query.length <= 0) { return; }
    suggestion.saveToCache(query);
}

(function () {
    var oInput = baidu('#' + suggestParam.suggestInputId);
    var formO = baidu('#searchForm');
    var placeholder = oInput.attr('placeholder');
    var curVal = placeholder;
    var isUOrDKey = false;
    var oninput = function (val) {
        val = baidu.string(val).trim();
        if (('' === val || val === placeholder) && !suggestParam.sendEmpty) {
            suggestion.clear();
            // 不发送空字符串
            return;
        }

        var wordIndex = suggestion.saveToCache();
        if (wordIndex > -1) {
            suggestion.fill(suggestion.cache.data[wordIndex]);
            return;
        }
        var sugUrl = suggestParam.suggestionurl + '?key=' + encodeURIComponent(val) + '&cb=searchSugCbk';
        var jsonpId = suggestParam.jsonpId;
        exeJsonp(jsonpId, sugUrl);
    };
    oInput.on('focus', function () {
        var val = baidu.string(this.value).trim();
        if (val === placeholder) {
            this.value = '';
            val = '';
        }
        if (val) { oninput(val); }
    }).on('blur', function () {
        if (baidu.string(this.value).trim() === '') {
            this.value = placeholder;
        }
        curVal = this.value;
    }).on('webkitspeechchange', function () {
        var newVal = this.value;
        if (curVal === placeholder) {
            this.value = newVal.replace(curVal, '');
        }
        formO.submit();
    }).bind('keyup', function (e) {
        if (e.which === 8) {
            // 退格键
            var bro = $.browser;
            if (bro.msie && bro.version === '9.0') {
                // ie9的oninput不支持退格键的解决办法
                oninput(baidu.string(oInput.val()).trim());
            }
        } else if (e.which === 13) {
            // 回车
            formO.submit();
        } else if (e.which === 38) {
            // UP
            isUOrDKey = true;
            if (!suggestion.isShow) { return; }
            var activeLi = suggestion.activeSug;
            var moveToLast = function () {
                var liList = suggestion.getList();
                var tmpActLi = liList.eq(liList.length - 1);
                suggestion.setInputVal(tmpActLi.text());
                suggestion.setActiveSug(tmpActLi);
            };
            if (activeLi) {
                var prevLi = activeLi.prev();
                if (prevLi[0]) {
                    suggestion.setInputVal(prevLi.text());
                    suggestion.setActiveSug(prevLi);
                } else {
                    moveToLast();
                }
            } else {
                moveToLast();
            }
        }else if (e.which === 40) {
            // Down
            isUOrDKey = true;
            if (!suggestion.isShow) { return; }
            var activeLi = suggestion.activeSug;
            var moveToFirst = function () {
                var liList = suggestion.getList();
                var tmpActLi = liList.eq(0);
                suggestion.setInputVal(tmpActLi.text());
                suggestion.setActiveSug(tmpActLi);
            };
            if (activeLi) {
                var nextLi = activeLi.next();
                if (nextLi[0]) {
                    suggestion.setInputVal(nextLi.text());
                    suggestion.setActiveSug(nextLi);
                }else {
                    moveToFirst();
                }
            }else {
                moveToFirst();
            }
        }
    });
    if (oInput[0].onpropertychange !== undefined) {
        if ('oninput' in oInput[0]) {
            oInput.on('input', function () {
                oninput(this.value);
            });
        } else {
            oInput[0].onpropertychange = function () {
                if (!isUOrDKey) {
                    oninput(this.value);
                }
                isUOrDKey = false;
            };
        }
    } else {
        oInput.on('input', function () {
            oninput(this.value);
        });
    }
    formO.on('submit', function (e) {
        var val = baidu.string(oInput.val()).trim();
        if (val === placeholder || val === '') {
            e.preventDefault();
        } else {
            formO.append('<input type="hidden" value="'
                  + encodeURIComponent(val)
                  + '" name="'
                  + oInput.attr('name')
                  + '"/>');
            oInput.removeAttr('name');
        }
    });
    var container = baidu('#' + suggestParam.suggestContainerId);
    container.delegate('li', 'click', function (e) {
        var li = baidu(this);
        suggestion.setInputVal(li.text());
        suggestion.clear();
        formO.submit();
    }).bind('mouseleave', function (e) {
        suggestion.setActiveSug(null);
    }).delegate('li', 'mouseenter', function (e) {
        suggestion.setActiveSug(baidu(this));
    });
    baidu(document).click(function (e) {
        if (e.target.id === suggestParam.suggestInputId) { return; }
        suggestion.clear();
    });
})();