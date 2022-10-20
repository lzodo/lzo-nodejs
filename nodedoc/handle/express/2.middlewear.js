const express = require("express");
const app = express();

/**
 * 中间件本质就是传给express的一个回调函数
 *  得到一个请求时，会一步一步执行代码中每一个匹配到的并且next的中间件，
 *  中间件功能函数（回调）中有 请求对象、响应对象、next函数(用于执行下一个中间件的函数)
 *  作用:
 *      执行任何代码，更改响应对象与请求对象、结束请求（res.end）、调用栈中的下一个中间件
 *      如果没有res.end结束，就必须通过next()执行下一个中间件，否则会被挂起，一直转不结束
 *      end 和 next 可以同时存在，正常情况先end会写在组后一个中间件中，如果前面end了，在next，后面时不能再写end的
 *  应用:
 *      app/router.use  或 app/router.methods=>app.get  方式应用到程序
 * 自定义全局中间件,像这种根路径其实是能省略的
 *      app.use("/",bodyParser.json()); ==> app.use(bodyParser.json());
 */


// 通过use注册一个普通中间件 ，任意请求访问任意路径都可以出发该中间件执行
app.use((req, res, next) => {
    //调用接口时，遇到/就会拦截进入这里处理业务逻辑(如验证token)，同以通过使用next()
    console.log("middle");
    next(); //调用后面一个符合条件的中间件，
    console.log('next 全部执行了'); //函数调用栈 所有next不包括，主线程执行完，才会执行后面的代码，bubaok

    // express 缺点，如果有多个中间件，第三个中间件存在异步调用，这边想用异步得到的数据是不好做的 
});
 
app.use("/home", (req, res, next) => {
    // 接口访问 /home 时会上一个和这一个全都匹配
    console.log("middle2");
    res.end('ddd')
    next();
});


// 指定请求访问才能执行的中间件
app.get("/test1", (req, res) => {
    console.log("text1");
    res.send({ status: 0, message: "test1" });
});
app.get("/test2", (req, res) => {
    console.log("text2");
    res.send({ status: 0, message: "test2" });
});

// 连续的中间件 get访问 /test3 时，后面的每一个逻辑代码都会执行
app.get(
    "/test3",
    (req, res, next) => {
        console.log("局部中间件");
        next();
    },
    (req, res) => {
        console.log("text3");
        res.send({ status: 0, message: "test2" });
    }
);

// 当调用get接口时，通过next只会走 use 和 get 的，不会走post的

// next() 带参数就会到错误中间件,没有带参数的next永远都不会走这里(这个中间件有四个参数)
app.use((err,req,res,next)=>{ // 统一处理所有 错误
    console.log(err);
})

app.listen(3003, () => {
    console.log("服务开启成功，请通过: http://localhost:3003/ 进行访问");
});
