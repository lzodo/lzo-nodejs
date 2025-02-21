const Student = require("../models/student");
const Class = require("../models/class");
const { studentCreateVis } = require("./optionValids/studentValid");
const { pick } = require("../utils/tools");

// 添加
exports.create = async function (obj) {
  // 获取对象指定属性
  const data = pick(obj, "name", "birthday", "sex", "mobile", "ClassId");
  // 参数校验
  let result = studentCreateVis(data);
  if (result) {
    console.log("验证失败1", result);
    return;
  }

  const ins = await Student.create(data);
  return ins.toJSON();
};

exports.findAll = async function () {
  // 多表关联
  var res = await Student.findAll({
    where: { id: 1 },
    include: [Class],
  });
  return JSON.stringify(res);
};
