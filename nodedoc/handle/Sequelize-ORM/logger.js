const log4js = require('log4js');
const path = require('path');

function createAppenders(type) {
	return {
		type: 'dateFile', // file 保存到文件，dateFile 文件自动以当前日期作为后缀
		filename: path.resolve(__dirname, 'logs', type, 'logging.log'),
		maxLogSize: 1024 * 1024, //配置文件的最大字节数,到达自动分类文件
		keepFileExt: true,
		// daysToKeep: 3, // 保留天数
		numBackups: 5, // 指定保留的旧日志文件数量。超过这个数量的旧日志文件会被自动删除。
		layout: {
			// 自定义日志中时间的格式
			type: 'pattern',
			pattern: '%c [%d{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n'
		}
	};
}
log4js.configure({
	// 定义出口
	appenders: {
		// 定义一个sql日志出口
		sql: createAppenders('sql'),
		// api 日志出口
		api: createAppenders('api'),
		// 定义一个默认输出
		default: {
			type: 'stdout' // 控制台输出
		}
	},
	// 配置分类
	categories: {
		sql: {
			appenders: ['sql'], //该分类使用出口sql的配置写入日志
			level: 'all'
		},
		api: {
			appenders: ['api'], //该分类使用出口api的配置写入日志
			level: 'all'
		},
		// 定义一个默认分类
		default: {
			appenders: ['default'],
			level: 'all'
		}
	}
});

// 程序关闭或意外关闭时结束日志，并把该保存的日志进行最后的保存
process.on('exit', () => {
	log4js.shutdown();
});

const sqlLogger = log4js.getLogger('sql');
const defaultLogger = log4js.getLogger();
const apiLogger = log4js.getLogger('api');

exports.sqlLogger = sqlLogger;
exports.logger = defaultLogger;
exports.apiLogger = apiLogger;
