<%@ WebHandler Language="C#" Class="ImgUpLoad" %>

using System;
using System.Web;
using System.IO; //需要这三个命名空间
using System.Drawing;//***
using System.Drawing.Imaging;//***

public class ImgUpLoad : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        string imgBase = context.Request["imgBase"];//传递过来的base64编码
        string imgFomate = context.Request["imgFormat"];//传递过来的图片格式
        string lookIndex = context.Request["lookIndex"];//图片对象索引，只为输出回去
        string end = "{\"isok\":\"1\",\"ind\":\"" + lookIndex + "\"}";

        string imgReadyBase = imgBase.Substring(imgBase.IndexOf("4") + 2);//截取base64编码无用开头

        byte[] bytes = System.Convert.FromBase64String(imgReadyBase);//base64转为byte数组

        MemoryStream ms = new MemoryStream(bytes);//创建内存流，将图片编码导入

        Image img = Image.FromStream(ms);//将流中的图片转换为Image图片对象

        //利用时间种子解决伪随机数短时间重复问题
        Random ran = new Random((int)DateTime.Now.Ticks);

        //文件保存位置及命名，精确到毫秒并附带一组随机数，防止文件重名，数据库保存路径为此变量
        string serverPath = "../img_Upload/" + DateTime.Now.ToString("yyyyMMddhhmmssms") + ran.Next() + "." + imgFomate;

        //路径映射为绝对路径
        string path = context.Server.MapPath(serverPath);

        ImageFormat imgfor = ImageFormat.Jpeg;//设置图片格式

        if (imgFomate == "png")
            imgfor = ImageFormat.Png;

        try
        {
            img.Save(path, imgfor);//图片保存
        }
        catch { end = "{\"isok\":\"0\",\"ind\":\"" + lookIndex + "\"}"; }
        context.Response.Write(end);
        context.Response.End();
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}