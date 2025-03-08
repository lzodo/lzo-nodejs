require('./services/optionValids/globalExtend');
require('./models/sync'); // 初始化模型
// require('./mock/init'); // 初始化模拟数据

const { servers } = require('./config');
const app = require('./app');
const sequelize = require('./models/db');
const client = require('./redis');

// 监听一个服务
const { port } = servers;
const server = app.listen(port, () => {
	console.log(`server listen on ${port}`);
});

// SIGTERM：终止信号。通常由系统或进程管理器（如 PM2、Kubernetes）发送，要求应用优雅关闭。
process.on('SIGTERM', () => {
	console.log('接收到程序终止信号 ...');
	server.close(async () => {
		await sequelize.close(); // 关闭 Sequelize 连接
		await client.quit();
		console.log('Server closed.');
		process.exit(0);
	});
});

// SIGINT：中断信号。通常由用户按下 Ctrl+C 触发，要求应用立即关闭。
process.on('SIGINT', () => {
	console.log('接收到服务中断信号 ...');
	server.close(async () => {
		await sequelize.close(); // 关闭 Sequelize 连接
		await client.quit();
		console.log('Server closed.');
		process.exit(0);
	});
});
