const SequelizeAuto = require('sequelize-auto');
const path = require('path');

// 数据库配置
const config = {
	host: '192.168.203.132', // 数据库主机
	port: 3306, // 数据库端口
	dialect: 'mysql', // 数据库类型
	database: 'youlai_boot', // 现有数据库名称
	username: 'root', // 数据库用户名
	password: 'Lzx542684.@' // 数据库密码
};

// 输出目录
const outputDir = path.resolve(__dirname, './src/models');

// 生成模型
const auto = new SequelizeAuto(config.database, config.username, config.password, {
	host: config.host,
	port: config.port,
	dialect: config.dialect,
	directory: outputDir, // 模型输出目录
	caseModel: 'p', // 模型命名风格（如 User -> user）
	caseFile: 'c', // 文件命名风格（如 user.js）
	singularize: true // 使用单数形式命名模型
});

auto.run()
	.then(() => {
		console.log('Models generated successfully!');
	})
	.catch((err) => {
		console.error('Error generating models:', err);
	});
