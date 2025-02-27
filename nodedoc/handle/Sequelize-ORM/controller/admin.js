const adminServ = require("../services/adminService");
const { sendResult, to } = require("../utils/tools");

class AdminController {
  // 创建学生
  async create(req, res, next) {
    try {
      let result = await adminServ.create(req.body);
      res.send(sendResult(result));
    } catch (err) {
      next(err);
    }
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

    await to(adminServ.findByPage(searchObj), res, next);

    // try {
    //   let result = await adminServ.findByPage(searchObj);
    //   res.send(sendResult(result));
    // } catch (err) {
    //   next(err);
    // }
  }

  // 通过id查询
  async findById(req, res, next) {
    try {
      let result = await adminServ.findById(req.params.id);
      res.send(sendResult(result));
    } catch (err) {
      next(err);
    }
  }

  // 更新
  async update(req, res, next) {
    try {
      let result = await adminServ.update(req.body, req.params.id);
      res.send(sendResult(result));
    } catch (err) {
      next(err);
    }
  }

  // 删除
  async remove(req, res, next) {
    try {
      let result = await adminServ.delete(req.body);
      res.send(sendResult(result));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();
