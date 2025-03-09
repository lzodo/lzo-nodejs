const dotenv = require('dotenv'); // 通过dotenv插件获取根目录下.env 文件的配置参数
// 根据环境加载对应的 .env 文件
if (process.env.NODE_ENV === 'test') {
	dotenv.config({ path: '.env.test' }); //将 .env.test 配置信息写入到 process.env 环境变量中
} else {
	dotenv.config(); // 默认加载 .env
}

// 环境变量管理器
const { PORT, MYSQL_DATABASE, MYSQL_ACCOUNT, MYSQL_PASSWD, MYSQL_HOST, PROXY_LIST_CODER, AUTH_SECRET_KEY, REDIS_PASSWD, REDIS_URL } = process.env;
console.log(PROXY_LIST_CODER);

// 鉴权白名单
const whiteList = [
	{ method: 'POST', path: '/api/admin/loginByCookie' },
	{ method: 'POST', path: '/api/admin/loginBySession' },
	{ method: 'POST', path: '/api/admin/loginByJwt' },
	{ method: 'GET', path: '/extend/captcha' },
	{ method: 'GET', path: '/api/admin/:id' },
	{ method: 'GET', path: '/' },
	{ path: '/coder', type: 'before' },
	{ path: '/api-docs', type: 'before' },
	{ path: '/api/extend', type: 'before' }
];

// 对称加密秘钥
const secretKey = AUTH_SECRET_KEY;

// proxy 服务器
const proxyList = {
	coder: PROXY_LIST_CODER
};

// 服务器
const servers = {
	port: PORT || 5008
};

// mysql 配置
const mysqlConfig = {
	database: MYSQL_DATABASE,
	account: MYSQL_ACCOUNT,
	passwd: MYSQL_PASSWD,
	host: MYSQL_HOST
};

// redis 配置
const redisConfig = {
	url: REDIS_URL,
	passwd: REDIS_PASSWD
};

module.exports = {
	whiteList,
	secretKey,
	proxyList,
	servers,
	mysqlConfig,
	redisConfig
};
