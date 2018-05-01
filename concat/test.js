// var arrOuter = [
//     [1,2],[3,4],[5,6]
// ];
// function flattening(arr) {
//     return [].concat(...arr);
//     // return Array.prototype.concat([], ...arr);
// }
// console.log(flattening(arrOuter));


// var arrOuter = [[1, 2], [3, 4], [5, 6]];
// function flattening(...arr) {
//     return arr;
// }
// console.log(flattening(arrOuter, arrOuter));

//////////////////
function f(...[a, b, c]) {
    return a + b + c;
}

// console.log( f(1) );          // NaN (b and c are undefined)
// console.log( f(1, 2, 3) );   // 6
// console.log( f(1, 2, 3, 4) ); // 6 (the fourth parameter is not destructured)

////////////
function fun1(...theArgs) {
    console.log(theArgs);
}

fun1();  // 弹出 "0", 因为theArgs没有元素
fun1(5); // 弹出 "1", 因为theArgs只有一个元素
fun1(5, 6, 7); // 弹出 "3", 因为theArgs有三个元素