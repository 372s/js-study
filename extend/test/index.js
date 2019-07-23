;(function($){
    $.fn.extend({
        "MyPlugin":function(opts){
            var option = $.extend({}, this.defaults, opts);
            console.log(option);
        }
    })
})(jQuery);