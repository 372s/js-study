window.onload = function() {
	waterFull('main', 'box');
	var DataIn = {
		"data": [{
			"src": '0.jpg'
		},
		{
			"src": '1.jpg'
		},
		{
			"src": '2.jpg'
		},
		{
			"src": '3.jpg'
		},
		{
			"src": '4.jpg'
		},
		{
			"src": '5.jpg'
		}]
	};
	window.onscroll = function() {
		var oparent = document.getElementById('main');
		if (checkScrollSlide) {
			for (var i = 0; i < DataIn.data.length; i++) {
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oparent.appendChild(oBox);
				var opic = document.createElement('div');
				opic.className = 'pic';
				oBox.appendChild(opic);
				var oImg = document.createElement('img');
				oImg.src = './images/' + DataIn.data[i].src;
				opic.appendChild(oImg);
			}
			waterFull('main', 'box');
		}
	}
}
function waterFull(parent, children) {
	var oParent = document.getElementById(parent); 
	//var oBoxs = parent.querySelectorAll(".box"); 
	var oBoxs = getByClass(oParent,children); //计算整个页面显示的列数 
	var oBoxW = oBoxs[0].offsetWidth; var cols = Math.floor(document.documentElement.clientWidth/oBoxW); //设置main的宽度，并且居中 
	oParent.style.cssText = 'width:'+oBoxW * cols +'px; margin: 0 auto'; //找出高度最小的图片，将下一个图片放在下面 //定义一个数组，存放每一列的高度，初始化存的是第一行的所有列的高度 
	var arrH = []; 
	for(var i = 0; i< oBoxs.length ; i++){ 
		if(i < cols){ 
			arrH.push(oBoxs[i].offsetHeight); 
		} else { 
			var minH = Math.min.apply(null,arrH); 
			var minIndex = getMinhIndex(arrH,minH); 
			oBoxs[i].style.position = 'absolute'; 
			oBoxs[i].style.top= minH + 'px'; 
			//oBoxs[i].style.left = minIndex * oBoxW + 'px'; 
			oBoxs[i].style.left = oBoxs[minIndex].offsetLeft+'px'; 
			arrH[minIndex] += oBoxs[i].offsetHeight; 
		} 
	} 
} 

function getByClass(parent,className){ 
	var boxArr = new Array();//用来获取所有class为box的元素 
	oElement = parent.getElementsByTagName('*'); 
	for (var i = 0; i <oElement.length; i++) { 
		if(oElement[i].className == className){ 
			boxArr.push(oElement[i]); 
		}
	}
	return boxArr; 
} 
	
//获取当前最小值得下标 
function getMinhIndex(array,min){ 
	for(var i in array){ 
		if(array[i] == min)  return i; 
	} 
} 

//检测是否具备滚动条加载数据块的条件 
function checkScrollSlide(){ 
	var oparent = document.getElementById('main'); 
	var oBoxs = getByClass(oparent,'box'); 
	var scrollH = document.body.scrollTop || document.documentElement.scrollTop + document.body.clientHeight || document.documentElement.clientHeight; 
	var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight/2); 
	return (lastBoxH < scrollH )? true : false; 
}