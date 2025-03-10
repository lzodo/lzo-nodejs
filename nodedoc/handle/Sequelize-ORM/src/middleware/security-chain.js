const path = require('path');
const url = require('url');
const { getImageFormat } = require('../utils/FileTools');
module.exports = function () {
	return async (req, res, next) => {
		let { host, referer } = req.headers;

		// 如果是图片，再进行操作
		let isImg = await getImageFormat(req.url);
		if (isImg) {
			// 解析来源页面主机地址
			if (referer) {
				referer = url.parse(referer).host;
			}

			// 如果来源主机与资源主机不一致，各一个固定资源
			if (referer && referer !== host) {
				req.url = '/source/s1.jpg';
			}
		}

		next();
	};
};
