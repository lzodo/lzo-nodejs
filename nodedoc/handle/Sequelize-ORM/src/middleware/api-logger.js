const { apiLogger } = require('../logger');
const log4js = require('log4js');

// module.exports = () => {
//   return (req, res, next) => {
//     next();
//     apiLogger.debug(`${req.method} ${req.originalUrl} ${req.ip}`);
//   };
// };

module.exports = () => {
	return log4js.connectLogger(apiLogger, {
		level: 'auto',
		nolog: '\\.gif|\\.jpg' // 这些请求不计入日志
	});
};
