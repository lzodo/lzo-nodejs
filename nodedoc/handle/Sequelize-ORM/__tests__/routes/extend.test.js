const request = require('supertest');
const app = require('../../src/app'); // 导入 Express 应用

let client = require('../../src/redis/index');
let sequelize = require('../../src/models/db');

// jest钩子函数
afterAll(async () => {
	await sequelize.close();
	await client.quit();
});

describe('GET /extend', () => {
	it('should return a list of users', async (done) => {
		const res = await request(app).get('/api/extend/jsonp');
		expect(res.statusCode).toEqual(200);
		// expect(res.body).toEqual([{ id: 1, name: 'John Doe' }]);

		done();
	});
});
