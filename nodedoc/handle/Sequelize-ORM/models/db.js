const { Sequelize } = require("sequelize");
const { sqlLogger } = require("../logger");

// 创建连接，内部自动使用连接池
const sequelize = new Sequelize("duyi_myschooldb", "root", "Lzx542684.@", {
  host: "192.168.203.132",
  // 选择一种支持的数据库:
  // 'mysql', 'mariadb', 'postgres', 'mssql', 'sqlite', 'snowflake', 'db2' or 'ibmi'
  dialect: "mysql",
  // logging: false, // 禁用日志记录
  logging: (msg) => {
    sqlLogger.debug(msg);
  },
});

module.exports = sequelize;
