const axios = require('axios');

// 返回一个中间件，将/coder开头的请求，转发到 proxyList.coder 服务器中
exports.axios = function () {
	return (req, res, next) => {
		req.axios = axios;
		next();
	};
};
