const { Server } = require('socket.io');

module.exports = function (httpsServer) {
	const io = new Server(httpsServer, {
		// 处理跨域问题
		cors: {
			credentials: true
		},
		pingTimeout: 60000, // 60 秒内未收到客户端心跳则断开连接
		pingInterval: 25000, // 每 25 秒发送一次心跳
		reconnection: true, // 启用重连
		reconnectionAttempts: 5, // 最大重连次数
		reconnectionDelay: 1000, // 初始重连延迟（毫秒）
		reconnectionDelayMax: 5000, // 最大重连延迟（毫秒）
		transports: ['websocket', 'polling'] // 优先使用 WebSocket，失败后回退到 HTTP 轮询
	});
	console.log('创建socketio');

	io.on('connection', (socket) => {
		console.log('有客户端连接！');
		socket.on('message', (msg) => {
			console.log('客户端通过message发送的消息：', msg);

			// 广播给所有监听了 message 事件的用户
			socket.emit('message', msg + '广播');
		});

		const timer = setInterval(() => {
			socket.emit('test', '服务器发送的消息1');
		}, 5000);

		// 监听客户端断开连接
		socket.on('disconnect', () => {
			clearInterval(timer);
			console.log('客户端断开');
		});
	});
};
