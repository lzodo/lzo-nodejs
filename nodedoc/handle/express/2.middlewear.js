const express = require("express");
const app = express();

//自定义全局中间件,像这种根路径其实是能省略的
//类似 app.use("/",bodyParser.json());
app.use("/", (req, res, next) => {
    //调用接口时，遇到/就会拦截进入这里处理业务逻辑(如验证token)，同以通过使用next()
    console.log("middle");
    next();
});

app.get("/test1", (req, res) => {
    console.log("text1");
    res.send({ status: 0, message: "test1" });
});
app.get("/test2", (req, res) => {
    console.log("text2");
    res.send({ status: 0, message: "test2" });
});

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

app.listen(3003, () => {
    console.log("服务开启成功，请通过: http://localhost:3003/ 进行访问");
});
