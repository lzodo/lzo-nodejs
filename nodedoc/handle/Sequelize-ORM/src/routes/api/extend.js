const express = require('express');
const router = express.Router();
const path = require('path');
const QRCode = require('qrcode');
const { to } = require('../../utils/tools');
const { uploadArray, uploadSingle, visRealPicture, pictureResize, addWatermark } = require('../../middleware/upload');
const { captcha } = require('../../middleware/captcha');
const { oauthLoginGitee, oauthLoginCallback } = require('../../middleware/auth');
const { prompt, jsonp, upload, downlaod, sendMail } = require('../../controller/extend');
const { mkdir } = require('../../utils/FileTools');
const AppError = require('../../utils/AppError');

// 系统更新实时提示
router.get('/updatePrompt', prompt);

// jsonp
router.get('/jsonp', jsonp);

// 文件下载
router.get('/download/:filename', downlaod);

// 单文件上传
router.post(
	'/singleUpload',
	(req, res, next) => {
		const schema = req.Joi.object({ keyFile: req.Joi.required() });
		const { error } = schema.validate({ keyFile: req.body.keyFile });
		if (error) {
			return next(new AppError(error, 400));
		}
		next();
	},
	uploadSingle(),
	pictureResize,
	addWatermark,
	upload
);

// 多文件上传
router.post('/arrayUpload', uploadArray(), pictureResize, upload);

// 发送邮件功能
router.post('/email', sendMail);

// oauth 授权登录，拦截前端的a链接跳转
router.get('/oauth/login/gitee', oauthLoginGitee());
// oauth 授权的授权码的回调地址路由
router.get('/oauth/gitee/callback', oauthLoginCallback());

// 二维码生成
router.get('/qrcode/img', async (req, res, next) => {
	const val = req.query.value || '二维码数据！';
	const name = `${Math.random().toString(16).slice(-4)}-${Date.now()}.png`;
	const qrcodePath = path.resolve(__dirname, '../../public/qrcode');
	mkdir(qrcodePath);
	let [error, result] = await to(QRCode.toFile(`${qrcodePath}/${name}`, val));
	if (error) {
		return next(new AppError(error));
	}
	res.download(`${qrcodePath}/${name}`, name);
});
router.get('/qrcode', async (req, res, next) => {
	const val = req.query.value || '二维码数据！';
	let [error, result] = await to(QRCode.toDataURL(val));
	if (error) {
		return next(new AppError(error));
	}
	res.send(result);
});

// 图形验证码,测试使用
router.get('/captcha', captcha);

module.exports = router;
