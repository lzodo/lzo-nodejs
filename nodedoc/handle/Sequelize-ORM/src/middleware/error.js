const { sendErrResult } = require('../utils/tools');
const { apiLogger } = require('../logger');
// var createError = require('http-errors');

module.exports = function () {
	return function (err, req, res, next) {
		// createError();
		// 四个参数就认为是4个中间件
		console.log('进入了错误中间件');
		if (err) {
			apiLogger.error('Error occurred:', {
				message: err instanceof Error ? err.message : err,
				timestamp: new Date().toISOString(),
				request: {
					method: req.method,
					url: req.url,
					body: req.body,
					headers: req.headers
				}
			});
			res.status(200).send(sendErrResult(err instanceof Error ? err.message : err, 401));
		} else {
			next();
		}
	};
};
