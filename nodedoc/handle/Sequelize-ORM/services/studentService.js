const Student = require("../models/student");
const Class = require("../models/class");
const { studentCreateVis } = require("./optionValids/studentValid");
const { pick, visHandler } = require("../utils/tools");

// 添加
exports.create = async function (obj) {
  // 获取对象指定属性
  const data = pick(obj, "name", "birthday", "sex", "mobile", "ClassId");
  // 参数校验
  if (visHandler(studentCreateVis, data)) {
    const ins = await Student.create(data);
    return ins.toJSON();
  }
};

exports.findAll = async function () {
  // 多表关联
  var res = await Student.findAll({
    include: [Class],
    where: {
      id: 88,
    },
  });
  return JSON.stringify(res);
};
