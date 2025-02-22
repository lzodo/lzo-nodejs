const express = require("express");
const router = express.Router(); //获取路由实例|路由中间件

// 添加
router.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
// 通过分页获取
router.get("/", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});
// 通过id获取
router.get("/:id", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});
// 修改
router.put("/:id", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});
// 删除
router.delete("/:id", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

module.exports = router;
