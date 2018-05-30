#### 一、院长频道 （列表页 分页）
1、请求方式:get

2、http://请求地址?page=1&pagesize=10&branch=8

参数说明：
```
page: 当前页
pagesize：每页记录条数
branch: 科室
```
3、返回值
```json
{
    "error":"",
    "msg":"",
    "data":[
        {
            "文章id":"id", 
            "图片":"url",
            "标题":"",
            "嘉宾":"string",
            "医院":"string",
            "时间":"Y-m-d H:i:s"
        }
    ],
    "page":"1", // 当前页
}
```

#### 二、院长频道 详情页
1、请求:[ get ] http://请求地址?id=1
```
id: 文章id
```

2、返回值
```json
{
    "error":"",
    "msg":"",
    "data":{
        "标题":"string",
        "时间":"Y-m-d H:i:s",
        "来源":"例如: 医脉通",
        "编辑人":"string",
        "内容":"string",
        "院长":"string",
        "医院":"如：乌鲁木齐第四人民医院",
        "医院":"如：新疆精神卫生中心、乌鲁木齐第四人民医院院长",
        "本期简介":""
    }
}
```



#### 三、大家谈 （列表）
1、请求:[ get ] http://url?page=1&pagesize=10&branch=8

2、返回值
```json
{
    "error":"",
    "msg":"",
    "data":[
        {
            "id":"id",
            "图片":"url",
            "主题":"string",
            "专家":"string",
            "医院":"string",
            "详情页面跳转链接":"url"
        }
    ],
    "page":"1",
}
```