function multiply(multiplier, ...theArgs) {  
    return theArgs.map(function(element) {  
        return multiplier * element;  
    });  
}
var arr = multiply(2, 1, 2, 3);   
console.log(arr); // [2, 4, 6]  


function sortRestArgs(...theArgs) {  
    var sortedArgs = theArgs.sort();  
    return sortedArgs;  
}  
//好像一位和两位混合不能进行排序，这需要看一下为甚？主要第一个为主  
console.log(sortRestArgs(5, 3, 7, 1)); // shows 1, 3, 5, 7  

/**
 * 对于参数对象arguments不能排序 
 */
function sortArguments() {  
    //arguments是参数对象不能直接使用sort()方法，因为不是数组实例，需要转换
    var sortedArgs = arguments.sort();   
    return sortedArgs; // this will never happen  
}  
// 会抛出类型异常，arguments.sort不是函数  
// console.log(sortArguments(5, 3, 7, 1));  


//以前函数  
function f(a, b) {  
    var args = Array.prototype.slice.call(arguments, f.length);  
    console.log(args);
}
f(1,3,3,5);

// 等效于现在  
function f1(a, b, ...args) {  
    console.log(args);
}
f1(2,3,4,5)