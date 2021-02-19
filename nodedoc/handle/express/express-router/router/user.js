const express = require("express");
const router = express.Router(); //获取路由实例|路由中间件
const {
    login,
    all,
    client,
    server,
    serverPage,
    serverStaticPage,
    token,
} = require("../controller");

router.get("/login", login);
router.get("/token", token);

router.all("/all", all);

router.all("/client", client);

router.all("/server", server);

router.all("/page", serverPage);

router.all("/page_static", serverStaticPage);

/**
 * get:获取数据
 * post:添加数据
 * put:修改数据（覆盖式全部修改）
 * patch:修改数据（修改单独的几个）
 * delete:删除数据
 *
 * 请求方式是有语义的，但是一般都用post代替了put、patch、delete了,一个路径只能一个请求
 * post('/index/add')
 * post('/index/delete')
 * post('/index/put')
 * post('/index/patch')
 *
 * REST 一个路径多个请求就是利用post、get、put、delete的做到的
 *
 */
module.exports = router;
