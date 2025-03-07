const {
  bookCreateVis,
  bookDeleteVis,
  bookUpdateVis,
} = require("./optionValids/bookValid.js");
const { pick, visHandler } = require("../utils/tools");
const { Op } = require("sequelize");
const Book = require("../models/book");

// 添加
exports.create = async function (obj) {
  // 获取对象指定属性
  const data = pick(
    obj,
    "name",
    "imgurl",
    "publishDate",
    "author",
    "description"
  );

  // 参数校验
  const visRes = visHandler(bookCreateVis, data);
  if (!visRes) {
    const res = await Book.create(data);
    return res.toJSON();
  } else {
    throw new Error(JSON.stringify(visRes));
  }
};

// 通过分页查询
exports.findByPage = async function (searchObj) {
  const { page, limit } = searchObj;
  const where = {};
  const findObj = {
    attributes: [
      "id",
      "name",
      "imgurl",
      "publishDate",
      "author",
      "description",
    ],
    offset: (page - 1) * limit,
    limit: limit,
  };
  for (const key in searchObj.where) {
    where[key] = { [Op.like]: `%${searchObj.where[key]}%` };
  }
  if (Object.keys(where).length) {
    findObj.where = where;
  }

  const res = await Book.findAndCountAll(findObj);
  return JSON.parse(JSON.stringify(res));
};

// 通过分页查询
exports.findById = async function (id) {
  const res = await Book.findOne({
    attributes: [
      "id",
      "name",
      "imgurl",
      "publishDate",
      "author",
      "description",
    ],
    where: {
      id,
    },
  });

  return res?.toJSON();
};

// 删除
exports.delete = async function (deleteObj) {
  const visRes = visHandler(bookDeleteVis, deleteObj);
  if (!visRes) {
    await Book.destroy({
      where: {
        id: {
          [Op.or]: deleteObj.ids,
        },
      },
    });
    return "删除成功";
  } else {
    throw new Error(JSON.stringify(visRes));
  }
};

// 修改
exports.update = async function (updateObj, id) {
  const data = pick(
    updateObj,
    "name",
    "name",
    "imgurl",
    "publishDate",
    "author",
    "description"
  );
  const visRes = visHandler(bookUpdateVis, data);
  if (!visRes) {
    let result = await Book.update(data, {
      where: {
        id,
      },
    });

    return result[0] == 1 ? "更新成功" : "未更新";
  } else {
    throw new Error(JSON.stringify(visRes));
  }
};
