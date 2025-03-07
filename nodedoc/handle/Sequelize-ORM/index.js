require('./services/optionValids/globalExtend');
require('./models/sync'); // 初始化模型
// require("./mock/init"); // 初始化模拟数据

const path = require('path');
const express = require('express');
const app = express(); //创建一个express应用
const useRouter = require('./routes/index');
const errHealder = require('./middleware/error');
const saveApiLogs = require('./middleware/api-logger');
const securityChain = require('./middleware/security-chain');
const { servers } = require('./config');
const { httpProxy } = require('./middleware/proxy');
const { useSwagger } = require('./swagger');
const { useAuth } = require('./middleware/Third-party-middle/auth');
const { useCros } = require('./middleware/Third-party-middle/cros');
const { axios } = require('./middleware/request');

// 图片防盗链
app.use(securityChain());

/**
 * 静态资源服务器
 *    通过 http://localhost:5008/images/t1.png 进行访问
 * 下面这段代码的作用：
 * 当请求时，会根据请求路径(req.path)，从指定的目录中寻找是否存在该文件，如果存在，直接响应文件内容，而不再移交给后续的中间件
 * 如果不存在文件，则直接移交给后续的中间件处理
 * 默认情况下，如果映射的结果是一个目录，则会自动使用index.html文件
 */
app.use(
	express.static(path.resolve(__dirname, './public'), {
		maxAge: 3600 * 1000 // 缓存静态资源
	})
);

// 消息体解析
app.use(
	// 解析请求 Content-Type 为 application/x-www-form-urlencoded 的请求体
	express.urlencoded({
		extended: true // 内部使用新的库进行处理
	}),
	// 解析请求 Content-Type 为 application/json 的请求体
	express.json()
);

// 跨域
useCros(app);

// axios api请求
app.use(axios());

// 鉴权
useAuth(app);

// swagger
useSwagger(app);

// api 日志
app.use(saveApiLogs());

// Http Proxy 代理
app.use('/coder', httpProxy);

// api 的请求处理【路由部分】
useRouter(app);

// 错误中间件同一处理
app.use(errHealder());

// 监听一个服务
const { port } = servers;
app.listen(port, () => {
	console.log(`server listen on ${port}`);
});
