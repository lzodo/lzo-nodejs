const cors = require('cors');
const { crosVis } = require('../cros');

exports.useCros = function (app) {
	// 跨域处理
	app.use(
		cors({
			origin: (origin, callback) => {
				const allowedOrigins = ['xxx'];
				if (!origin || !allowedOrigins.includes(origin)) {
					callback(null, true);
				} else {
					callback(new Error('Not allowed by CORS'));
				}
			}
			// credentials: true, // 允许跨域携带 Cookie
		})
	);
	// app.use(crosVis());
};
