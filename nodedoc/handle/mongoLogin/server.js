const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

//设置静态文件夹
app.use("/", express.static(path.join(__dirname, "./www")));

// 日志 格式 combined ,每当有新的日志，就会往writerStream 也就是 access.log 追加新的数据
const morgan = require('morgan')
const writerStream = fs.createWriteStream("./logs/access.log",{flags:"a+"})
app.use(morgan("combined", {stream: writerStream}))

//解析post请求体数据
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false })); //解析表单数据
app.use(bodyParser.json());

//链接mongodb数据库
let db = require("./db/connect");

//session + cookie省份验证
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(
    session({
        secret: "keyboard cat", //随便设置的一个私钥
        cookie: { maxAge: 600 * 1000 }, //设置过期事件
        resave: true, //即使sessiosn没有修改,也要保存  默认true
        saveUninitialized: false, //无论有没有session cookie, 都要设置session cookie
    })
);

//路由
let userRouter = require("./router/userRouter");
let foodRouter = require("./router/foodRouter");
let fileRouter = require("./router/fileRouter");
const { nextTick } = require("process");
const { WriteStream } = require("fs");
app.use("/user", userRouter);
app.use(
    "/food",
    (req, res, next) => {
        console.log(req.session);
        //给food相关接口设置身份验证
        if (req.session.login) {
            next();
        } else {
            res.send({ status: 99, message: "session 验证失败,请先登录" });
        }
    },
    foodRouter
);
app.use("/file", fileRouter);

//开启服务
app.listen(3002, () => {
    console.log("mongoLogin server success to http://localhost:3002/");
    global.thisServer = "http://localhost:3002/";
});
