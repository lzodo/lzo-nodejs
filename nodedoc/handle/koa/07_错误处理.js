const Koa = require("koa"); // 导出一个类

const app = new Koa();

app.use((ctx, next) => {
    return ctx.app.emit('error', new Error("出错了fdsf"), ctx)
})


app.on("error", (err, ctx) => {
    ctx.status = 401;
    ctx.body = err.message;
})

app.listen("8001", () => {
    console.log("服务器开启成功")
})
