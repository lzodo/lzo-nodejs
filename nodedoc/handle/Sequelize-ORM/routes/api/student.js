const express = require("express");
const router = express.Router(); //获取路由实例|路由中间件
const {
  create,
  findByPage,
  findById,
  update,
  remove,
} = require("../../controller/student");
const { redisCatch } = require("../../middleware/catch");

// 添加
router.post("/", create);
// 通过分页获取
router.get("/", findByPage);
// 通过id获取
router.get("/:id", redisCatch(), findById);
// 修改
router.put("/:id", update);
// 删除
router.delete("/", remove);

module.exports = router;
