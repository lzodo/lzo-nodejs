const express = require("express");
const router = express.Router(); //获取路由实例
const { User } = require("../db/connect");

router.get("/login", (req, res) => {
    //接收参数
    let { us, ps } = req.query;

    //处理数据
    User.find({ ps: ps, us: us })
        .then((data) => {
            console.log(data);
            if (data.length > 0) {
                res.send({ status: 0, message: "登入成功" });
            } else {
                res.send({ status: 0, message: "账号或密码错误" });
            }
        })
        .catch((err) => {
            console.log("查询失败：" + err);
            res.send({ status: 99, message: "登入失败" });
        });
});

router.post("/req", (req, res) => {
    let { us, ps, age } = req.body;

    //处理数据
    if (us && ps) {
        User.find({ us: us }).then((info) => {
            if (info.length == 0) {
                User.insertMany({ us: us, ps: ps, age: age })
                    .then((data) => {
                        console.log(data);
                        res.send({ status: 0, message: "ok" });
                    })
                    .catch((err) => {
                        console.log("插入失败：" + err);
                        res.send({ status: 99, message: "数据库插入失败" });
                    });
            } else {
                res.send({ status: 99, message: "用户名已存在" });
            }
        });
    } else {
        res.send({ status: 99, message: "账号或密码不存在" });
    }
});

router.post("/resetpwd", (req, res) => {
    let { us, nps } = req.body;
    if (us && nps) {
        User.find({ us: us }).then((info) => {
            if (info.length != 0) {
                User.update({ us: us }, { ps: nps })
                    .then((data) => {
                        console.log(data);
                        res.send({ status: 0, message: "密码更新成功" });
                    })
                    .catch((err) => {
                        console.log("密码更新失败：" + err);
                        res.send({ status: 0, message: "密码更新失败" });
                    });
            } else {
                res.send({ status: 99, message: "账号不存在" });
            }
        });
    } else {
        res.send({ status: 99, message: "请输入账号或新密码" });
    }
});

router.post("/del", (req, res) => {
    let { id } = req.body;
    if (id) {
        User.find({ _id: id }).then((info) => {
            if (info.length != 0) {
                User.remove({ _id: id })
                    .then((data) => {
                        console.log(data);
                        res.send({ status: 99, message: "删除成功" });
                    })
                    .catch((err) => {
                        res.send({ status: 99, message: "删除失败：" });
                    });
            } else {
                res.send({ status: 99, message: "账号不存在" });
            }
        });
    } else {
        res.send({ status: 99, message: "请输入用户ID" });
    }
});

module.exports = router;
