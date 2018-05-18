<style>
    .cover {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.5;
        filter: alpha(opacity=50);
        z-index: 100;
    }
    .pop_box {
        background-color: #fff;
        width: 74%;
        left: 13%;
        top: 50%;
        position: fixed;
        min-height: 50px;
        border-radius: 5px;
        z-index: 100;
        -webkit-transform: translate3d(0,-50%,0);
    }
    .pop_cont {
        padding: 40px 5%;
        font-size: 17px;
        line-height: 24px;
        color: #16191c;
        text-align: center;
        border-bottom: 1px solid #e3e3e3;
    }
    .pop_btm {
        display: -webkit-box;
    }
    .pop_btm {
        width: 100%;
        display: -webkit-box;
        border-top: 1px solid #e3e3e3;
    }
    input[type="button"] {
        cursor: pointer;
    }
    .pop_btn:first-child {
        border-right: 1px solid #e3e3e3;
        color: #43a0ff;
    }
    .pop_btn {
        display: block;
        -webkit-box-flex: 1;
        font-size: 17px;
        line-height: 46px;
        color: #16191c;
        text-align: center;
        width: 100%;
        border-right: 1px solid #e3e3e3;
    }
    input, button, select, textarea {
        -webkit-appearance: none;
        border: medium none;
        background: none;
        outline: none;
        font: 1em/normal "Microsoft YaHei","微软雅黑";
    }

    .pop_box { background-color: #fff; width: 74%; left: 13%; top: 50%; position: fixed; min-height: 50px; border-radius: 5px; z-index: 100; -webkit-transform: translate3d(0,-50%,0);}
.pop_cont { padding: 40px 5%; font-size: 17px; line-height: 24px; color: #16191c; text-align: center; border-bottom: 1px solid #e3e3e3;}
.pop_btm { display: -webkit-box;}
.pop_btn { display: block; -webkit-box-flex: 1; font-size: 17px; line-height: 46px; color: #16191c; text-align: center; width: 100%; border-right: 1px solid #e3e3e3;}
</style>

<div class="cover"></div>
<div class="pop_box">
    <div class="pop_cont">
        猜您可能对<span class="blue">神经内科</span>内容感兴趣，是否切换到该科室？
    </div>
    <div class="pop_btm">
        <input class="pop_btn locat_pop" value="切换" data-branch="2" type="button">
        <input class="pop_btn close_pop" value="取消" type="button">
    </div>
</div>

