// const bookServ = require('../services/bookService');
// const { toi } = require('../utils/tools');

const { weChatApplet } = require('../config');
const { createToken } = require('../middleware/auth');
const AppError = require('../utils/AppError');
const { sendResult } = require('../utils/tools');

class WeChatController {
	// 登录
	async wxLogin(req, res, next) {
		const { code } = req.body;
		if (!code) return next(new AppError('code 必填', 400));

		try {
			// 调用微信接口，通过已知的 APPID 和 ，换取 openid 和 session_key
			const response = await req.axios.get('https://api.weixin.qq.com/sns/jscode2session', {
				params: {
					appid: weChatApplet.AppId,
					secret: weChatApplet.AppSecret,
					js_code: code,
					grant_type: 'authorization_code'
				}
			});
			const { openid, session_key } = response.data;
			console.log(response.data, 3344);

			if (!openid || !session_key) return next(new AppError('无法获取openid和session_key', 400));

			// 生成自定义登录态（JWT）
			// const token = jwt.sign({ openid, session_key }, JWT_SECRET, { expiresIn: '7d' });

			const token = await createToken({
				openid,
				session_key
			});
			res.cookie('token', token);
			res.header('authorization', token);
			res.send(
				sendResult({
					token
				})
			);
		} catch (error) {
			return next(new AppError('Internal server error', 500));
		}
	}
}

module.exports = new WeChatController();
