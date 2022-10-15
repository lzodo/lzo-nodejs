const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//app.use 使用某个中间件
//urlencoded方法用来解析表单格式数据 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//
/**
 *  解析 content-type 为 json
 *  内部
 *      if(req.headers['Content-Type'] == 'xxxx/json') 做原生的on data 那些一系列处理 得到 info
 *      再让req.body = info
 *  新版本中experss内置了，可以直接 
 *      app.use(express.json());
 *      app.use(express.urlencoded({extended:true}));
 *          extended:true //使用一个内部依赖的第三方qs库解析、
 *                   false //使用node的querystring解析
 *      xxxxx
 */
app.use(bodyParser.json()); //任何访问都会走，内部通过on data 处理数据，如果json数据，就处理，好了扔req.body, on end 调用 next()
// app.use(express.json()) // 后面express内置了
// app.use(express.urlencoded({extended:true})) // true 使用 外部qs插件解析，false,使用node querystring模块解析

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
