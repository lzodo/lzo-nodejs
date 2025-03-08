// 创建连接
const redis = require('redis');
const { redisConfig } = require('../config');
const client = redis.createClient({
	url: redisConfig.url,
	password: redisConfig.passwd
});

// 监听连接成功事件
client.on('connect', () => {
	// console.log('redis 连接成功！');
});

// 监听错误事件
client.on('error', (err) => {
	// console.error('Redis error:', err);
});

// 连接到 Redis
client.connect();

module.exports = client;

// 通过 client 操作数据库
// 操作方式和 redis 原生方式基本一致
// client.set("key222", "value", (err, reply) => {
//   console.log(reply);
// });

// client.get("key222", (err, reply) => {
//   console.log(reply);
// });
// client.get("key222").then((val) => {
//   console.log(val, 111);
// });
