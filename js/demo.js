function f1(){
    var n=999;
    nAdd = function(){
        n+=1
    }
    function f2(){
        console.log(n);
    }
    return f2;
}
var result = f1();
// result(); // 999
//nAdd();
// result(); // 1000


function createFunctions(){
    var result = new Array();
    for (var i=0; i < 10; i++){
        result[i] = function(){
            return i;
        };
    }
    return result;
}
var funcs = createFunctions();
console.log(funcs[0]()); // result[0]
for (var i=0; i < funcs.length; i++){
    console.log(funcs[i]());
}


var oli = document.getElementsByTagName('li');
var i;
for(i = 0;i < 5;i++){
oli[i].onclick = function(){
alert(i);
}
}
console.log(i); // 5
//执行匿名函数
(function(){
alert(i); //5
}());

/**
上面是一个经典的例子，我们都知道执行结果是都弹出5，也知道可以用闭包解决这个问题，但是我刚开始始终不能明白为什么每次弹出都是5，为什么闭包可以解决这问题。后来捋一捋还是把它弄清晰了：

a. 先来分析没用闭包前的情况：for循环中,我们给每个li点击事件绑定了一个匿名函数，匿名函数中返回了变量i的值，当循环结束后，变量i的值变为5，此时我们再去点击每个li，也就是执行相应的匿名函数(看上面的代码)，这是变量i已经是5了，所以每个点击弹出5. 因为这里返回的每个匿名函数都是引用了同一个变量i，如果我们新建一个变量保存循环执行时当前的i的值，然后再让匿名函数应用这个变量，最后再返回这个匿名函数，这样就可以达到我们的目的了，这就是运用闭包来实现的！
 */

var oli = document.getElementsByTagName('li');
var i;
for(i = 0;i < 5;i++){
oli[i].onclick = (function(num){
var a = num; // 为了说明问题
return function(){
alert(a);
}
})(i)
}
console.log(i); // 5