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