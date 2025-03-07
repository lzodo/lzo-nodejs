const express = require('express');
const router = express.Router();
const { to } = require('../../utils/tools');
const path = require('path');
const { prompt, jsonp, upload, downlaod } = require('../../controller/extend');
const { uploadArray, uploadSingle, visRealPicture, pictureResize, addWatermark } = require('../../middleware/upload');

// 系统更新实时提示
router.get('/updatePrompt', prompt);

// jsonp
router.get('/jsonp', jsonp);

// 文件下载
router.get('/download/:filename', downlaod);

// 单文件上传
router.post('/singleUpload', uploadSingle(), visRealPicture, pictureResize, addWatermark, upload);

// 多文件上传
router.post('/arrayUpload', uploadArray(), visRealPicture, pictureResize, upload);

// 二维码生成
var QRCode = require('qrcode');
const { mkdir } = require('../../utils/tools-file');

router.get('/qrcode/img', async (req, res, next) => {
	const val = req.query.value || '二维码数据！';
	const name = `${Math.random().toString(16).slice(-4)}-${Date.now()}.png`;
	const qrcodePath = path.resolve(__dirname, '../../public/qrcode');
	mkdir(qrcodePath);
	let [error, result] = await to(QRCode.toFile(`${qrcodePath}/${name}`, val));
	if (error) {
		next(error);
	}
	res.download(`${qrcodePath}/${name}`, name);
});

router.get('/qrcode', async (req, res, next) => {
	const val = req.query.value || '二维码数据！';
	let [error, result] = await to(QRCode.toDataURL(val));
	if (error) {
		next(error);
	}
	res.send(result);
});

// 图形验证码,测试使用
const { captcha } = require('../../middleware/captcha');
router.get('/captcha', captcha);

module.exports = router;
