const Mock = require('mockjs');
const extendServ = require('../services/extendService');
const { sendResult } = require('../utils/tools');
const path = require('path');
// const { PassThrough } = require("stream");

class ExtendController {
	// 更新提示
	async prompt(req, res, next) {
		// 设置响应头
		res.setHeader('Content-Type', 'text/event-stream'); // SSE 通信核心代码
		res.setHeader('Cache-Control', 'no-cache');
		res.setHeader('Connection', 'keep-alive');

		// 发送初始数据
		res.write('data: Connected\n\n');

		// 定时发送数据
		const interval = setInterval(async () => {
			const result = await extendServ.getPrompt();
			res.write(`data: ${JSON.stringify(result)}\n\n`); // 发送数据
		}, 4000);

		// 处理客户端断开连接
		req.on('close', () => {
			clearInterval(interval); // 清除定时器
			console.log('Client disconnected');
		});
	}

	// jsonp 实例
	async jsonp(req, res, next) {
		const callback = req.query.callback || 'callback';
		const data = Mock.mock({
			type: 'jsonp 数据模拟',
			name: '@cname'
		});
		res.send(`${callback}(${JSON.stringify(data)})`);
	}

	// 文件下载
	async downlaod(req, res, next) {
		const filename = req.params.filename;
		if (!filename) {
			next(new Error('请填写文件名'));
		} else {
			const filepath = path.resolve(__dirname, '../public/source', filename);
			/**
			 * download(文件路径，默认文件名，错误处理)
			 * 响应头的属性：
			 *    Content-Disposition: attachment; filename="t1.png"
			 *      attachment 标记为附件
			 *      filename 默认名称
			 *    Accept-Ranges：bytes  支持断的续传
			 *
			 * 请求头：
			 *    Range:bytes=1000-10000  续传的部分，如果有续传，比如大文件暂停再开始下载时
			 *
			 */
			res.download(filepath, filename);
		}
	}

	// 文件上传
	async upload(req, res, next) {
		const files = req.files || [req.file];
		const data = files.map((item) => `/uploads/origin/${item.filename}`);

		res.send(sendResult(data));
	}
}

module.exports = new ExtendController();
