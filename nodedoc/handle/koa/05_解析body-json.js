const Koa = require("koa"); // 导出一个类
const app = new Koa();

const bodyParser = require('koa-bodyparser');
app.use(bodyParser())

const multer = require("koa-multer"); 
const upload = multer();

app.use((ctx, next) => {
    console.log(ctx.response.body);
})




app.listen("8000", () => {
    console.log("服务器开启成功")
})
