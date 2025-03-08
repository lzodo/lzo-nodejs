const request = require('supertest');
const app = require('../../src/app'); // 导入 Express 应用

let client;
let sequelize;

// 开始测试钩子
beforeAll(async () => {
	client = require('../../src/redis/index');
	sequelize = require('../../src/models/db');
});

// 测试结束钩子
afterAll(async () => {
	await sequelize.close();
	await client.quit();
});

// 测试JSON接口
describe('GET /api/extend/jsonp', () => {
	it('toEqual 深度相等（适用于对象和数组）', async () => {
		const res = await request(app).get('/api/extend/jsonp');
		expect(res.statusCode).toEqual(200);
	});
});
