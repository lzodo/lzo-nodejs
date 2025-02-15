const sequelize = require("./db");

// 同步所有模型
require("./admin");

sequelize.sync({ alter: true }).then(() => {
  console.log("统一同步完成");
});
