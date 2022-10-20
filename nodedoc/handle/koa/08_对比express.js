const Koa = require("koa"); // 导出一个类

const app = new Koa();

const middlewarel1 = async (ctx, next) => {
    ctx.msg = 'aaa';
    // m1-1
    await next();
    // m1-2 
    // 不用异步的话 就和express 一样，bbb 无法链接到中间，express next返回的不是promise，是普通函数 ，不会等待m2结束,不能这样用
    ctx.response.body = ctx.msg; // 希望在这里返回 aaabbbccc
}
const middlewarel2 = async (ctx, next) => { 
    const res = await new Promise((resolve,reject)=>{
        setTimeout(()=>{  
            resolve('bbb');
        },1000)
    })
    ctx.msg += res;

    //m2-1
    await next(); // 后面没异步操作 这里是可以不加的
    //m2-2
    ctx.response.body = 'dddd';// 会被覆盖
}
const middlewarel3 = async (ctx, next) => {
    ctx.msg += 'ccc';
    //m3-1
    // next();
    //m3-2
}

app.use(middlewarel1);
app.use(middlewarel2);
app.use(middlewarel3);

// ctx.body 不会立即返回，而是把数据存放在body里，m3-2如果有设置body会覆盖前面的所有设置，会等全部中间件执行完才返回
// 洋葱的含义: m1-1(next 前) -> m2-1 -> m3-1 -> m3-2(next 后) -> m2-2 -> m3-2; 返回ctx.body 


app.listen("8000", () => {
    console.log("服务器开启成功")
})