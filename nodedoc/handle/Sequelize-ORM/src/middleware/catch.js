const client = require('../redis');

exports.redisCatch = (options = {}) => {
	// 设置缓存过期时间（秒）
	const ttl = options.ttl || 60 * 60;
	return async (req, res, next) => {
		// console.log(req.originalUrl); // 获取包括query的完整路径
		let val = await client.get(req.originalUrl);
		if (val) {
			console.log(req.originalUrl, '使用了Redis缓存数据');
			res.send(val);
		} else {
			// 没有缓存，既然使用了该中间件，说明这个请求到的数据需存入redis
			// 由于res.send内部是调用元素 res.writh 和 res.end
			// 所以可以重写res.writh 和 res.end，当后续执行的时候内部就会执行重写过的方法，这边就能拿到最终要写入的数据
			// 拿到最终的数据，就能存入redis中

			/** 先保存原神 write，end */
			const defaultWrith = res.write.bind(res);
			const defaultEnd = res.end.bind(res);

			/** 重写 wriet end */
			const chunks = [];
			res.write = function (chunk, ...args) {
				chunks.push(chunk);
				defaultWrith(chunk, ...args);
			};
			res.end = function (chunk, ...args) {
				(async (ttl) => {
					chunk && chunks.push(chunk);
					const body = chunks.map((c) => c.toString('utf8')).join();
					console.log('缓存数据', body);
					await client.set(req.originalUrl, body);
					await client.expire(req.originalUrl, ttl);
				})(ttl);
				defaultEnd(chunk, ...args);
			};
			next();
		}
	};
};
