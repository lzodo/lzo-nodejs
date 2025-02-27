const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const moment = require("moment");

// 创建一个模型对象
const UpdatePrompt = sequelize.define("UpdatePrompt", {
  // 在这里定义模型属性
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updateTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

setTimeout(async () => {
  let result = await UpdatePrompt.findOne({ where: { name: "updateApp" } });
  if (!result) {
    console.log("创建 prompt 更新数据");
    UpdatePrompt.create({
      updateTime: moment().local().format("YYYY-MM-DD hh:mm:ss"),
      name: "updateApp",
    });
  }
}, 3000);

module.exports = UpdatePrompt;
