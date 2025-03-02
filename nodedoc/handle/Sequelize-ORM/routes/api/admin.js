const express = require("express");
const router = express.Router(); //获取路由实例|路由中间件
const {
  create,
  findByPage,
  findById,
  update,
  remove,
  loginByCookie,
  loginBySession,
} = require("../../controller/admin");
const { redisCatch } = require("../../middleware/catch");
// const { authByCookie } = require("../../middleware/auth");

// 添加
router.post("/", create);
// 通过分页获取
router.get("/", findByPage);
// 通过id获取
router.get("/:id", redisCatch({ ttl: 20 }), findById);
// 修改
router.put("/:id", update);
// 删除
router.delete("/", remove);
// 登录(cookie)
router.post("/loginByCookie", loginByCookie);
// 登录(session)
router.post("/loginBySession", loginBySession);
// 登录(jwt)
// router.post("/loginByJwt", loginByCookie);

module.exports = router;
