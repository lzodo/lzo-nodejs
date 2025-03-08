require('./services/optionValids/globalExtend');
require('./models/sync'); // 初始化模型
// require('./mock/init'); // 初始化模拟数据

const { servers } = require('./config');
const app = require('./app');

// 监听一个服务
const { port } = servers;
app.listen(port, () => {
	console.log(`server listen on ${port}`);
});
