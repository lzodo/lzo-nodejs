const svgCaptcha = require('svg-captcha');
const { sendResult } = require('../utils/tools');
const AppError = require('../utils/AppError');
exports.captcha = (req, res, next) => {
	// 登录界面初始化调用，登录错误也调用，如果登录错误次数足够多，创建图形验证码，客户端能那到图形码就显示
	if ((req.session?.loginRecord || []).length >= 3) {
		// 公式
		let captcha = svgCaptcha.createMathExpr({
			// let captcha = svgCaptcha.create({
			size: 5, // 长度
			ignoreChars: 'il1', // 排除的字符
			noise: 2, // 干扰线条数
			color: true // 五颜六色
		});
		req.session.captcha = captcha.text; // 把验证码的文本存到session，登录的时候校验与用户输入是否一致

		// 将 SVG 转换为 Base64
		// const svg = captcha.data; // SVG 字符串
		// const base64Image = Buffer.from(svg).toString('base64');
		// const base64DataUrl = `data:image/svg+xml;base64,${base64Image}`;

		res.type('svg');
		res.send(captcha.data); // 把验证码图形响应到客户端
	} else {
		res.send(sendResult({ status: true })); // 无异常
	}
};

// 校验图形验证码
exports.visCaptcha = (req, res, next) => {
	// 记录登录失败次数
	if (!req.session.loginRecord) {
		req.session.loginRecord = [];
	}
	if (req.session.loginRecord.length >= 3) {
		// 校验 req.session.captcha 是否等于 req.body.captcha
		if (req.session.captcha != req.body.captcha) {
			req.session.captcha = '';
			return next(new AppError('图形验证码校验失败', 401));
		}
	}
	next();
};
