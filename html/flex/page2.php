<!DOCTYPE html>
<html>
<head>
<style> 
div {
	display:-moz-box; /* Firefox */
	display:-webkit-box; /* Safari and Chrome */
	display:box;
	width:500px;
	border:1px solid black;
}

#p1 {
	-moz-box-flex:1; /* Firefox */
	-webkit-box-flex:1; /* Safari and Chrome */
	box-flex:1;
	border:1px solid red;
	text-align: center;
}

#p2 {
	-moz-box-flex:5; /* Firefox */
	-webkit-box-flex:5; /* Safari and Chrome */
	box-flex:5;
	border:1px solid blue;
	text-align: center;
}
</style>
</head>
<body>

<div>
<p id="p1">Hello</p>
<p id="p2">W3School</p>
</div>

<p><b>注释：</b>IE 不支持 box-flex 属性。</p>

</body>
</html>