# 防止点击事件重复提交

## 1

```js
var flag = true;
    function fn(){
        if(flag){
            flag = false;
            alert('只会出现一次哦');
            setTimeout(function () { flag = true }, 5000);
        }
    }
```

## 2
```js
<button onclick="alert('只会出现一次哦,之后想点都点不了');this.disabled = true;">方式二</button>
```

### 3
```js
<script type="text/javascript">
    window.onload= function(){
        var btn=document.getElementById("btn");
        btn.setAttribute("disabled","disabled"); //
        setTimeout(function(){
            btn.removeAttribute("disabled"); // 
        },2000);
    }
</script>
````