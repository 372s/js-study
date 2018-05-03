// 设置cookie在当天指定时间点过期并提示
function setCookie(name,value,Deadline,callback){
    // 获取当前日期对象
    var curDate = new Date();
    // 获取当前日期对应的时间戳
    var curTime = curDate.getTime();
    console.log(curTime);
    // 获取指定时间的时间戳
    var endTime = convertTime(curDate,Deadline);
    console.log(endTime);
    // 计算出指定时间与当前时间的时间差
    var disTime = endTime - curTime;
    // 设置cookie过期时间
    document.cookie = name + '=' + value + ';expires=' + disTime;
    // 在指定时间到达后执行回调
    setTimeout(callback,disTime);
}

// 获取指定时间的时间戳
function convertTime(nowDate,Deadline){
    // 分割参数Deadline
    var _dateArr = Deadline.split(':');
    console.log(_dateArr);
    // 分别获取参数中对应的时、分、秒
    var hours = parseInt(_dateArr[0]);
    var minutes = parseInt(_dateArr[1]);
    var seconds = parseInt(_dateArr[2]);
    // 设置对应时分秒
    nowDate.setHours(hours); 
    nowDate.setMinutes(minutes); 
    nowDate.setSeconds(seconds);
    // 获取当前天中指定时分秒对应的毫秒数
    var result = Date.parse(nowDate);
    return result;
}


setCookie('name','value','11:00:00',function(){
    alert('cookie过期了');
});