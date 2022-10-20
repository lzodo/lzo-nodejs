const Koa = require("koa"); // 导出一个类

const app = new Koa();

app.use((ctx, next) => { // context 简写 ctx.request == req, ctx.response == res
     ctx.response.body = "return str";  // express res.end()
})

app.listen("8000", () => {
    console.log("服务器开启成功")
})


/**
 * 程序执行没end，没返回结果，koa不会一直等
 * 
 */