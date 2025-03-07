const cookieParser = require('cookie-parser');
const session = require('express-session');
const { authByCookie, authBySession, authByJwt } = require('../auth');
const { secretKey } = require('../../config');
const { RedisStore } = require('connect-redis');
const client = require('../../redis');
client.select(2);

exports.useAuth = function (app) {
	// 1、解析cookie
	// 加入之后会在res添加cookie方法用于设置cookie，res.cookie 的 max-age变成毫秒
	// 通过 req.cookies 属性接收请求中的cookie
	// 对称加密：可以选择输入一个秘钥，如果通过 res.cookie 添加cookie，可以通过属性signed:true 加密 cookie，通过req.signedCookies 接收
	app.use(cookieParser(secretKey));
	// 权限校验（cookie）
	// app.use(authByCookie()); // 所有请求必须讲过 cookie 校验

	// 2、session
	// 服务端维护着session表，只将sessionId发到客户端，服务端不是直接使用sessionId，而是通过这个sessionId关联对应的用户信息
	app.use(
		session({
			secret: secretKey,
			name: 'sessionId',
			resave: true, // 强制保存到仓库
			saveUninitialized: false, // 没有用过的session要不要保存
			cookie: {
				// session 内部也是需要通过cookie实现的
				maxAge: 60 * 60 * 1000,
				base: '/',
				domain: 'localhost'
			},
			// 如果不用仓库，存在内存，数据一会就丢失了
			store: new RedisStore({
				client: client,
				prefix: 'sessionLogin:'
			})
		})
	);
	// app.use(authBySession());

	// 3、jwt
	app.use(authByJwt());
};
