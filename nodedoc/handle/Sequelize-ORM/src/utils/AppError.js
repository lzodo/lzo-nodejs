class AppError extends Error {
	constructor(message, statusCode = 500) {
		super(message instanceof Error ? message.message : message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		this.captureStackTrace = message;

		if (message instanceof Error) {
			this.stack = message.stack;
		}
		// this.isOperational = true;
		// Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = AppError;
