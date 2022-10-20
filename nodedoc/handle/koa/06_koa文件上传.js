const path = require('path');
const Koa = require("koa");
const app = new Koa();

// 静态资源文件
const staticFiles = require('koa-static');
app.use(staticFiles(path.join(__dirname , 'static')));  // 如果是dist目录就相当于直接部署资源了


const multer = require("koa-multer"); // koa 文件上传 ,解析 from-data，数据要去 ctx.req 这个对象拿 ，用法和express的一样
var storage = multer.diskStorage({
    //设置上传后的文件路径,uploads文件夹会自动创建
    destination: function (req, file, cb) {
        cb(null, "./static/image");
    },
    //设置文件名 或 添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = file.originalname.split(".");
        console.log(fileFormat)
        //给文件添加时间戳防止重名名
        //比如把abc.jpg图片切割成数组[abc,jpg],然后用数组长度-1来获取后缀名
        cb(null, file.fieldname + "." + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    },
});
var upload = multer({
    storage: storage, //上传阶段
});

const Router = require('koa-router'); 
const fileRouter = new Router({prefix:"/upload"});

fileRouter.post('/', upload.single("fileKey"),(ctx, next) => {
    // 已经上传成功，处理数据返回到客户端
    let { size, mimetype, path, destination, filename } = ctx.req.file;
    let types = ["jpeg", "png", "jpg", "gif"]; //指定可以通过的类型
    destination = destination.split('./static')[1]
    
 v
    ctx.response.body = { status: 0, message: "上传成功", img: destination + "/" + filename };

},(err)=>{
    console.log(err)
})


app.use(fileRouter.routes())

app.listen("8000",()=>{
    console.log('8000 服务开启成功')
})