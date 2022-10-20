const Koa = require("koa"); // 导出一个类
const app = new Koa();

const Router = require("koa-router");


const userRouter = new Router({ prefix: "/users" })

userRouter.get('/:id', (ctx, next) => {
    console.log(ctx.request.url)
    console.log(ctx.request.query)
    console.log(ctx.request.params) // koa 封装的请求对象
    console.log(ctx.req) // node 原生req对象
})

app.use(userRouter.routes())

// http://localhost:8000/users/123?a=1&&b=2

app.listen("8000", () => {
    console.log("服务器开启成功")
})
