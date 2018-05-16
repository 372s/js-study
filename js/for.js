var arr = new Array(3,4,45);
// console.log(arr);
forList(arr);

var obj = {"id":1,"name":"wangqiang"};
console.log(obj);
var str = JSON.stringify(obj);
console.log(str);

var ob = JSON.parse(str);
console.log(ob);


function forList(itemList) {
    for (var i =0, item; item = itemList[i++];){
        console.log(item);
    }
}