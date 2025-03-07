const { whiteList, secretKey, servers } = require('../config');
const { decrypt } = require('../utils/crypt');
const { sendErrResult, sendResult } = require('../utils/tools');
const { pathToRegexp } = require('path-to-regexp');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// cookie 鉴权
exports.authByCookie = function () {
	return function (req, res, next) {
		const result = isAuth(req, whiteList);
		if (!result) {
			next();
			return;
		}

		// const token = req.signedCookies.token;
		const token = req.cookies.token;
		if (token) {
			req.userInfo = decrypt(token);
			// 判断有效性，再决定要不要next
			next();
		} else {
			res.send(sendErrResult('鉴权失败'));
		}
	};
};

// session 鉴权
exports.authBySession = function () {
	return function (req, res, next) {
		const result = isAuth(req, whiteList);
		if (!result) {
			next();
			return;
		}

		const userInfo = req.session.userInfo;
		req.userInfo = userInfo;

		if (userInfo) {
			next();
		} else {
			res.send(sendErrResult('鉴权失败'));
		}
	};
};

// jwt 鉴权
exports.authByJwt = function () {
	return function (req, res, next) {
		const result = isAuth(req, whiteList);
		if (!result) {
			next();
			return;
		}

		// 这边一般从header 的 authorization 取，需要前端手动设置，除了浏览器很多终端不支持cookie，先用cookie测试
		// console.log(req.headers.cookie);
		const token = req.cookies.token;
		// console.log(token);
		// verify a token symmetric

		try {
			// jwt.decode(token) 解码，不带校验功能
			const result = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
			req.userInfo = result;
			next();
		} catch (error) {
			next(error + ': jwt 鉴权失败');
		}
	};
};

// 创建jwt
exports.createToken = function () {
	return (req, res, next) => {
		const data = req.userInfo || {};
		console.log('createToken');

		// jwt 签名
		jwt.sign(data, secretKey, { algorithm: 'HS256', expiresIn: 60 * 60 * 1000 }, function (err, token) {
			if (err) {
				next(err);
				return;
			}

			/**
			 *  Authorization 头部字段支持多种授权方案，例如：
			 *    Basic：用于基本认证（用户名和密码）。
			 *    Bearer：用于持有者令牌（如 JWT）。
			 *    Digest：用于摘要认证。
			 */

			res.cookie('token', token);
			res.header('authorization', token);
			res.send(sendResult(token));
		});
	};
};

/**
 *
 * @param {*} req
 * @param {*} whiteList token校验白名单
 * @returns 是否需要校验token
 */
function isAuth(req, whiteList) {
	const isPass = whiteList.filter((item) => {
		let reg = {};
		if (item.type == 'before') {
			reg.regexp = new RegExp(`^${item.path}.*`);
			return reg.regexp.test(req.url);
		} else {
			reg = pathToRegexp(item.path); // PUT /api/admin/:id 这种不能全等判断，也是能进白名单的
			return item.method == req.method && reg.regexp.test(req.url);
		}
	});

	// 如果当前请求存在白名单中
	if (isPass.length) {
		return false;
	}

	// 只要有后缀名就不需要验证token;
	if (path.extname(req.originalUrl)) {
		return false;
	}

	return true;
}

// oauth gitee 授权
// Gitee 应用配置
const GITEE_CLIENT_ID = '1382951b82a4264ca1321c0b187375cdf464d1d8cdc10eca5ccb239088ea1198';
const GITEE_CLIENT_SECRET = '2389b2a7bc29dac5ed186edb190757b49857961d8784c1e4af5405e6f397b9bf';
const GITEE_REDIRECT_URI = `http://localhost:${servers.port}/api/extend/oauth/gitee/callback`; // 回调地址
exports.oauthLoginGitee = function () {
	return (req, res, next) => {
		/* 跳转到git获取授权码的地址  携带了client_id参数*/
		const path = `https://gitee.com/oauth/authorize?client_id=${GITEE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GITEE_REDIRECT_URI)}&response_type=code`;
		res.redirect(path);
		next();
	};
};

exports.oauthLoginCallback = function () {
	return async (req, res, next) => {
		const { code } = req.query;

		/* 请求令牌 post  params参数 */
		const accessToken = await req.axios.post(
			`https://gitee.com/oauth/token?grant_type=authorization_code&code=${code}&client_id=${GITEE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
				GITEE_REDIRECT_URI
			)}&client_secret=${GITEE_CLIENT_SECRET}`
		);

		/* 拿到令牌 */
		const { access_token } = accessToken.data;
		/* 使用令牌：获取用户的信息 */
		userInfo = await req.axios.get(`https://gitee.com/api/v5/user?access_token=${access_token}`);
		userInfo = userInfo.data;

		res.send(userInfo);
	};
};
