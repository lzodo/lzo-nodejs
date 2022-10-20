const Koa = require("koa"); // 导出一个类

const app = new Koa();

app.use((ctx, next) => { // context 简写 ctx.request == req, ctx.response == res
    if(ctx.request.url == '/login'){
        if(ctx.request.method == 'GET'){
            ctx.response.body = 'login str';
        }
    }else{
        ctx.response.body = "not login return str";  // express res.end()
    }
})

app.listen("8000", () => {
    console.log("服务器开启成功")
})


/**
 * 只能通过  use 注册中间件
 * 没有methods方式的中间件
 * 也没有path匹配方式的中间件
 *      解决方案通过路由实现，use路由就可以了
 * 
 * 不能连续调用
 */