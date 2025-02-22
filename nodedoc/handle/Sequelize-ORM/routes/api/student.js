const express = require("express");
const router = express.Router(); //获取路由实例|路由中间件
const stuServ = require("../../services/studentService");
const { sendResult } = require("../../utils/tools");

// 添加
router.post("/", async (req, res, next) => {
  let result = await stuServ.create(req.body, next);
  res.send(result);
});
// 通过分页获取
router.get("/", async (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page >= 1 ? req.query.page : 1;
  let searchObj = {
    where: {},
    page: page,
    limit: limit,
  };
  // 存在的非分页参数添加到where
  if (req.query.name) {
    searchObj.where.name = req.query.name;
  }
  if (req.query.birthday) {
    searchObj.where.birthday = req.query.birthday;
  }

  let result = await stuServ.findByPage(searchObj);
  res.send(sendResult(result));
});
// 通过id获取
router.get("/:id", async (req, res) => {
  let result = await stuServ.findById(req.params.id);
  res.send(result);
});
// 修改
router.put("/:id", async (req, res) => {
  let result = await stuServ.update(req.body, req.params.id);
  res.send(result);
});
// 删除
router.delete("/", async (req, res) => {
  let result = await stuServ.delete(req.body);
  res.send(result);
});

module.exports = router;
