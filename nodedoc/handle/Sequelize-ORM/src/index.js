require('./services/optionValids/globalExtend');
require('./models/sync'); // 初始化模型
// require('./mock/init'); // 初始化模拟数据

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { servers } = require('./config');
const app = require('./app');
const sequelize = require('./models/db');
const client = require('./redis');
const socketIo = require('./socket');

// 监听一个服务
const { port } = servers;
let server = null;

if (servers.https === 'true') {
	// 创建 HTTPS 服务器
	const options = {
		key: fs.readFileSync(path.join(__dirname, '../keys/server-key.pem')), // 私钥
		cert: fs.readFileSync(path.join(__dirname, '../keys/server-cert.crt')) // 证书
	};
	const httpsServer = https.createServer(options, app);

	server = httpsServer.listen(port, () => {
		console.log(`server listen on ${port}`);
	});
} else {
	const httpServer = http.createServer(app);
	// socket 连接
	socketIo(httpServer);
	server = httpServer.listen(port, () => {
		console.log(`server listen on ${port}`);
	});
}

// SIGTERM：终止信号。通常由系统或进程管理器（如 PM2、Kubernetes）发送，要求应用优雅关闭。
process.on('SIGTERM', () => {
	console.log('接收到程序终止信号 ...');
	server.close(async () => {
		await sequelize.close(); // 关闭 Sequelize 连接
		await client.quit();
		console.log('Server closed.');
		// process.exit(0);
	});
});

// SIGINT：中断信号。通常由用户按下 Ctrl+C 触发，要求应用立即关闭。
process.on('SIGINT', () => {
	console.log('接收到服务中断信号 ...');
	server.close(async () => {
		await sequelize.close(); // 关闭 Sequelize 连接
		await client.quit();
		console.log('Server closed.');
		// process.exit(0);
	});
});

process.on('uncaughtException', (err) => {
	console.error('未捕获的异常:', err);
	// process.exit(1);
});

process.on('unhandledRejection', (err) => {
	console.error('未处理的 Promise 拒绝:', err);
	// process.exit(1);
});
