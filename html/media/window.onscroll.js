window.onscroll = function () {
	//alert(424);
	if(scrollTop() + windowHeight() >= documentHeight()) {
		var body = document.getElementsByTagName("body"); // 此为复数，用body[0]
		var div=document.createElement("div");
		div.className = "test2"; // div.setAttribute("class", "test2"); 
		div.innerHTML = '如果你的显示器水平分辨率为1024px的话将能看到本条规则的效果';
		body[0].appendChild(div);
	}
}

function scrollTop(){
	return Math.max(
		//chrome
		document.body.scrollTop,
		//firefox/IE
		document.documentElement.scrollTop
		);
}
//获取页面文档的总高度
function documentHeight(){
	//现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
	return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
}
function windowHeight(){
	//浏览器兼容性 BackCompat CSS1Compat
	return (document.compatMode == "CSS1Compat") ? document.documentElement.clientHeight: document.body.clientHeight;
}


window.onload = function () {
	// alert(document.body.clientHeight);
	// alert(document.compatMode); 
	//alert(navigator.userAgent.toLowerCase());
}