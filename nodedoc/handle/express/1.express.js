const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//app.use 使用某个中间件
//urlencoded方法用来解析表单格式数据 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//解析 content-type 为 json
app.use(bodyParser.json());

app.get("/user/login", (req, res) => {
    //接收参数
    let { us, ps } = req.query;

    //处理数据
    if (us == 123 && ps == 456) {
        res.send({ status: 0, message: "ok" });
    } else {
        res.send({ status: 99, message: "请求错误" });
    }
});

app.post("/user/req", (req, res) => {
    //接收数据 请求体 通过第三方插件body-parser
    let { us, ps } = req.body;

    //处理数据
    console.log(us, ps);
    if (us == 123 && ps == 456) {
        res.send({ status: 0, message: "post ok" });
    } else {
        res.send({ status: 99, message: "post请求错误" });
    }
});

app.listen(3001, () => {
    console.log("服务开启成功，请通过: http://localhost:3001/ 进行访问");
});
