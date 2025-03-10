const { Sequelize } = require('sequelize');
const { sqlLogger } = require('../logger');
const { mysqlConfig } = require('../config');

// 创建连接，内部自动使用连接池
const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.account, mysqlConfig.passwd, {
	host: mysqlConfig.host,
	// 选择一种支持的数据库:
	// 'mysql', 'mariadb', 'postgres', 'mssql', 'sqlite', 'snowflake', 'db2' or 'ibmi'
	dialect: 'mysql',
	// logging: false, // 禁用日志记录
	logging: (msg) => {
		sqlLogger.debug(msg);
	},
	pool: {
		max: 15 // 最大连接数
		// min: 0, // 最小连接数
		// idle: 10000, // 连接空闲时间（毫秒）
		// acquire: 30000 // 获取连接的超时时间（毫秒）
	}
});

sequelize
	.authenticate()
	.then(() => {
		// console.log('sequelize 连接成功');
	})
	.catch((error) => {
		// console.error('sequelize 连接异常：', error);
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			// 重新连接
			setTimeout(() => {
				sequelize.authenticate();
			}, 5000); // 5 秒后重试
		}
	});

module.exports = sequelize;
