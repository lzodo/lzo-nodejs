const Koa = require("koa"); // 导出一个类
const userRouter = require("./router/user");

const app = new Koa();

app.use(userRouter.routes()); // 借助路由实现 路径

app.listen("8000", () => {
    console.log("服务器开启成功")
})
