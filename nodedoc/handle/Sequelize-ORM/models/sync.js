const sequelize = require("./db");

// 同步所有模型
require("./admin");
require("./book");
const Class = require("./class");
const Student = require("./student");

// 关联模型的关系
Class.hasMany(Student);
Student.belongsTo(Class);

sequelize.sync({ alter: true }).then(() => {
  console.log("统一同步完成");
});
