const express = require("express");
const router = express.Router(); //获取路由实例|路由中间件
const {
  create,
  findByPage,
  findById,
  update,
  remove,
  loginByCookie,
} = require("../../controller/admin");
const { authByCookie } = require("../../middleware/auth");

// 添加
router.post("/", create);
// 通过分页获取
router.get("/", authByCookie, findByPage);
// 通过id获取
router.get("/:id", findById);
// 修改
router.put("/:id", update);
// 删除
router.delete("/", remove);
// 登录
router.post("/loginByCookie", loginByCookie);

module.exports = router;
