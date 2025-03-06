const stuServ = require("../services/studentService");
const { toi } = require("../utils/tools");

class StudentController {
  // 创建学生
  async create(req, res, next) {
    await toi(stuServ.create(req.body), res, next);
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

    await toi(stuServ.findByPage(searchObj), res, next);
  }

  // 通过id查询
  async findById(req, res, next) {
    await toi(stuServ.findById(req.params.id), res, next);
  }

  // 更新
  async update(req, res, next) {
    await toi(stuServ.update(req.body, req.params.id), res, next);
  }

  // 删除
  async remove(req, res, next) {
    await toi(stuServ.delete(req.body), res, next);
  }
}

module.exports = new StudentController();
