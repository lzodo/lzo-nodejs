const express = require("express");
const router = express.Router(); //获取路由实例
var Food = require("../db/model/foodschema");

//添加
router.post("/add", (req, res) => {
    //接收参数
    // let { name, price, typename, typeid, img } = req.query;

    var data = {
        name: "222333",
        price: "123",
        typename: "123",
        desc: "123",
        typeid: 1,
        img: "123",
    };
    Food.insertMany(data)
        .then((data) => {
            res.send({ status: 0, message: "添加成功" });
        })
        .catch((err) => {
            res.send({ status: 0, message: "添加失败:" + err });
        });
});

//关键字查询
router.post("/getInfoByKey", (req, res) => {
    //接收参数
    // let { name, price, typename, typeid, img } = req.query;
    let { key } = req.body;
    let reg = new RegExp(key);
    //mongoose的正则写法
    //Food.find({ name: { $regex: reg } }) //单属性查询
    // $and
    Food.find({ $or: [{ name: { $regex: reg } }, { desc: { $regex: reg } }] }) //多属性查询
        .then((data) => {
            res.send({ status: 0, message: "查询成功", list: data });
        })
        .catch((err) => {
            res.send({ status: 0, message: "添加失败:" + err });
        });
});

//删除
router.post("/del", (req, res) => {
    let { _id } = req.body;

    Food.remove({ _id }) //{ _id:[id1,id2] } 多个删除
        .then((data) => {
            res.send({ status: 0, message: "删除成功" });
        })
        .catch((err) => {
            res.send({ status: 0, message: "删除失败:" + err });
        });
});

//分页查询
router.post("/getInfoByPage", (req, res) => {
    let pageSize = req.body.pageSize || 5;
    let page = req.body.pageNumber || 1;
    Food.find()
        .limit(Number(pageSize)) //查找分页的条数
        .skip(Number((page - 1) * pageSize)) //条过多少开始查
        .then((data) => {
            res.send({ status: 0, message: "查询成功", list: data });
        })
        .catch((err) => {
            res.send({ status: 0, message: "查询失败:" + err });
        });
});

module.exports = router;
