const sequelize = require("./db");
const { DataTypes } = require("sequelize");

// 创建一个模型对象
const Admin = sequelize.define(
  "Admin",
  {
    // 在这里定义模型属性
    loginId: {
      type: DataTypes.STRING,
      allowNull: false, // 是否允许为null
    },
    loginPwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // tableName: "admin", // 自定义表名，否则直接用模型名负数形式生成表名
    // createdAt: false, // 不想要 createdAt
    // updatedAt: "updateTimestamp", // 想要 updatedAt 但是希望名称叫做 updateTimestamp
    paranoid: true, // 不会真正删除数据，而是增加一列表示记录删除时间【偏执表】
  }
);

/**
 * 单个同步
 * Admin.sync() 如果不存在则根据模型创建表
 * Admin.sync({force:true}) 如果已存在，先删除再创建
 * Admin.sync({alter:true}) 根据模型的更改，跟新模型
 */
// (async () => {
//   await Admin.sync({ alter: true });
// })();

/**
 * 
    const A = sequelize.define('A'
    const B = sequelize.define('B'

    A.hasOne(B); // A 有一个 B
    A.belongsTo(B); // A 属于 B
    A.hasMany(B); // A 有多个 B
    A.belongsToMany(B, { through: 'C' }); // A 属于多个 B , 通过联结表 C
 * 
 */

module.exports = Admin;
