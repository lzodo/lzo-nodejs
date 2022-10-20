const Koa = require("koa"); // 导出一个类
const app = new Koa();

const bodyParser = require('koa-bodyparser');
app.use(bodyParser)

const multer = require("koa-multer"); // koa 文件上传 ，数据要去 ctx.req 这个对象拿 ，用法和express的一样
const upload = multer();

app.use((ctx, next) => {
    console.log(ctx.request.body);
})




app.listen("8000", () => {
    console.log("服务器开启成功")
})
