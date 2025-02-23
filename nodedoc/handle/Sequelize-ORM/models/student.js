const sequelize = require("./db");
const { DataTypes } = require("sequelize");
const moment = require("moment");

const Student = sequelize.define(
  "Student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return this.getDataValue("birthday").getTime();
      },
    },
    age: {
      type: DataTypes.VIRTUAL,
      get() {
        const now = moment.utc();
        const birth = moment.utc(this.birthday);
        return now.diff(birth, "y"); // 对比现在和生日相差多少年
      },
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    // ClassId: {
    //   // 关联表自动生成，不需要在模型添加
    //   type: DataTypes.NUMBER,
    //   allowNull: false,
    // },
  },
  {
    paranoid: true,
  }
);

module.exports = Student;
