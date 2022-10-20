const Koa = require("koa"); // 导出一个类
const app = new Koa();

const bodyParser = require('koa-bodyparser');
app.use(bodyParser())

app.use((ctx, next) => {
    console.log(ctx.request.body);
})




app.listen("8000", () => {
    console.log("服务器开启成功")
})
