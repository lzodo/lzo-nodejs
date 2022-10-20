const Router = require("koa-router");

// 1 创建路由
const router = new Router({ prefix: "/users" });


// 2 设置路由
router.get('/', (ctx, next) => {
    ctx.response.body = 'user list';
})

router.put('/', (ctx, next) => {
    ctx.response.body = 'user put list';
})


// 3 返回出去 app.use 祖册路由
module.exports =  router;