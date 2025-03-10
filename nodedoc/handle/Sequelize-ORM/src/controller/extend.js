const Mock = require('mockjs');
const extendServ = require('../services/extendService');
const { sendResult, to } = require('../utils/tools');
const path = require('path');
const nodemailer = require('nodemailer');
const { promisify } = require('util');
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
			const filepath = path.resolve(__dirname, '../../public/source', filename);
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

	// 发送邮件
	async sendMail(req, res, next) {
		const { email } = req.body;
		const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!reg.test(email)) {
			next(new Error('邮件格式异常'));
		}
		// 验证码随机数
		let code = Math.random().toString().substr(2, 4);

		// 创建一个SMTP客户端配置
		const config = {
			service: 'QQ',
			auth: {
				// 发件人邮箱账号
				user: '869664233@qq.com',
				//发件人邮箱的授权码 这里可以通过qq邮箱获取 并且不唯一
				pass: 'dkoikvzyhjgvbedg' //授权码生成之后，要等一会才能使用，否则验证的时候会报错
			}
		};

		//创建一个SMTP客户端配置对象
		const transporter = nodemailer.createTransport(config);

		//创建一个收件人对象
		const mail = {
			// 发件人 邮箱  '昵称<发件人邮箱>'
			from: `lzo<869664233@qq.com>`,
			// 主题
			subject: '激活验证码',
			// 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
			to: email,
			//这里可以添加html标签
			html: `<b>您的激活验证码为：${code}, 请24小时内有效，请谨慎保管。</b>`
		};

		//  发送邮件 调用transporter.sendMail(mail, callback)
		transporter.sendMail(mail, function (error, info) {
			if (error) {
				return next(error);
			} else {
				transporter.close();
				console.log('mail sent:', info.response);
				res.send(sendResult(info.response));
			}
		});
	}
}

module.exports = new ExtendController();
