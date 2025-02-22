const Student = require("../models/student");
const Class = require("../models/class");
const {
  studentCreateVis,
  studentDeleteVis,
  studentUpdateVis,
} = require("./optionValids/studentValid");
const { pick, visHandler } = require("../utils/tools");
const { Op } = require("sequelize");

// 添加
exports.create = async function (obj, next) {
  // 获取对象指定属性
  const data = pick(obj, "name", "birthday", "sex", "mobile", "ClassId");

  // 参数校验
  const visRes = visHandler(studentCreateVis, data);
  if (!visRes) {
    const res = await Student.create(data);
    return res.toJSON();
  } else {
    next(new Error(visRes));
  }
};

// 通过分页查询
exports.findByPage = async function (searchObj) {
  const { page, limit } = searchObj;
  const where = {};
  const findObj = {
    attributes: ["name", "age", "birthday"],
    offset: (page - 1) * limit,
    limit: limit,
    include: [Class],
  };
  for (const key in searchObj.where) {
    where[key] = { [Op.like]: `%${searchObj.where[key]}%` };
  }
  if (Object.keys(where).length) {
    findObj.where = where;
  }

  const res = await Student.findAndCountAll(findObj);
  return JSON.parse(JSON.stringify(res));
};

// 通过分页查询
exports.findById = async function (id) {
  const res = await Student.findOne({
    attributes: ["name", "age", "birthday"],
    where: {
      id,
    },
  });
  return res.toJSON();
};

// 删除
exports.delete = async function (deleteObj) {
  const visRes = visHandler(studentDeleteVis, deleteObj);
  if (!visRes) {
    await Student.destroy({
      where: {
        id: {
          [Op.or]: deleteObj.ids,
        },
      },
    });
    return {
      code: 200,
      msg: "删除成功",
    };
  } else {
    return {
      code: 400,
      msg: visRes,
    };
  }
};

// 修改
exports.update = async function (updateObj, id) {
  const data = pick(updateObj, "name", "birthday", "sex", "mobile", "ClassId");
  const visRes = visHandler(studentUpdateVis, data);
  if (!visRes) {
    let result = await Student.update(data, {
      where: {
        id,
      },
    });
    console.log(result);

    return {
      code: 200,
      msg: result[0] ? "更新成功" : "未更新",
    };
  } else {
    return {
      code: 400,
      msg: visRes,
    };
  }
};
