const adminServ = require("../services/adminService");
const { encrypt } = require("../utils/crypt");
const { to, sendResult, toh } = require("../utils/tools");
// const { to } = require("lzo-utils");

class AdminController {
  // 创建学生
  async create(req, res, next) {
    await to(adminServ.create(req.body), res, next);
  }

  // 通过分页查询
  async findByPage(req, res, next) {
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
    console.log(req.userId, "req.userId");
    await to(adminServ.findByPage(searchObj), res, next);
  }

  // 通过id查询
  async findById(req, res, next) {
    await to(adminServ.findById(req.params.id), res, next);
  }

  // 更新
  async update(req, res, next) {
    await to(adminServ.update(req.body, req.params.id), res, next);
  }

  // 删除
  async remove(req, res, next) {
    await to(adminServ.delete(req.body), res, next);
  }

  // 通过token登录
  async loginByCookie(req, res, next) {
    const [error, data] = await toh(adminServ.login(req.body));
    if (error) {
      next(error);
      return;
    }

    // 通过一写条件设置cookie，客户端拿到自动储存，调用其他接口时，如果该接口与这些条件匹配，就会自动携带
    // 请求的域名和路径必须与 Cookie 的 Domain 和 Path 匹配的接口， 才会自动携带
    // 过期浏览器会自动删除
    // res.header(
    //   "set-cookie",
    //   `token=${data.id};path=/;domain=localhost;max-age=3600;`
    // );

    // cookieParse 自带的对称加密
    // res.cookie("token", data.id, {
    //   path: "/",
    //   domain: "localhost",
    //   maxAge: 10 * 60 * 1000, // 10分钟
    //   signed: true,
    // });

    // 使用自己写的对称加密
    res.cookie("token", encrypt(data.id.toString()), {
      path: "/",
      domain: "localhost",
      maxAge: 10 * 60 * 1000, // 10分钟
    });

    res.header("authorization", encrypt(data.id.toString())); // 自动cookie只适合浏览器，一般都会额外加上这个，app或其他终端可以去主动获取设置
    res.send(sendResult(data));
  }
}

module.exports = new AdminController();
