// const { sendErrResult } = require('../utils/tools');
const { apiLogger } = require('../logger');
const AppError = require('../utils/AppError');

module.exports = function () {
	return function (err, req, res, next) {
		// 四个参数就认为是4个中间件
		console.log('进入了错误中间件');
		err.statusCode = err.statusCode || 500;
		err.status = err.status || 'error';

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
		res.status(200).send(AppError.sendErrResult(err instanceof Error ? err.message : err, err.statusCode, err.status, err.stack));
	};
};
