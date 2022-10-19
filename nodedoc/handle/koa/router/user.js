const Router = require("koa-router");

const router = new Router({ prefix: "/users" });

router.get('/', (ctx, next) => {
    ctx.response.body = 'user list';
})

router.put('/', (ctx, next) => {
    ctx.response.body = 'user list 2';
})

module.exports =  router;