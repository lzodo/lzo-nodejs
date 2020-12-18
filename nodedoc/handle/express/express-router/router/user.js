const express = require("express");
const router = express.Router(); //获取路由实例

router.get("/login", (req, res) => {
    //接收参数
    let { us, ps } = req.query;

    //处理数据
    if (us == 123 && ps == 456) {
        res.send({ status: 0, message: "router ok" });
    } else {
        res.send({ status: 99, message: "router 请求错误" });
    }
});

router.get("/add", (req, res) => {
    //接收参数
    res.send("send add");
});

module.exports = router;
