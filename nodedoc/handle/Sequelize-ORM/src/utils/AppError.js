class AppError extends Error {
	constructor(message, statusCode = 500) {
		let msg = message instanceof Error ? message.message : message;
		super(msg);
		this.message = msg;
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		this.captureStackTrace = message;

		if (message instanceof Error) {
			this.stack = message.stack;
		}
		// this.isOperational = true;
		// Error.captureStackTrace(this, this.constructor);
	}

	/**
	 * 请求异常返回数据
	 * @param {*} msg
	 * @param {*} errCode
	 * @returns
	 */
	static sendErrResult(msg = '请求异常', errCode = 500, status = 'error', stack = {}) {
		try {
			let data = JSON.parse(msg);
			return {
				code: errCode,
				status,
				msg: data,
				stack
			};
		} catch (error) {
			return {
				code: errCode,
				status,
				msg: msg,
				stack
			};
		}
	}
}

module.exports = AppError;
