const request = require('supertest');
const app = require('../../src/app'); // 导入 Express 应用

let client;
let sequelize;
let token = '';

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
describe('POST /api/admin/loginByJwt', () => {
	it('校验 token 登录', async () => {
		const data = {
			loginId: 'admin',
			loginPwd: '123456'
		};
		const res = await request(app).post('/api/admin/loginByJwt').send(data).set('Content-Type', 'application/json');
		expect(res.statusCode).toEqual(200); // 校验状态码是否为200
		expect(res.body).toHaveProperty('msg'); // 校验结果是否存在msg属性
		expect(res.body.msg).toBe('success'); // 校验msg属性是否严格等于 success
		token = res.body.data;
	});
});

describe('GET /api/admin', () => {
	it('通过分页查询 admin', async () => {
		const res = await request(app).get('/api/admin').set('authorization', token);
		expect(res.statusCode).toEqual(200);
		expect(res.body.code).toBe(0);
	});
});

/**
 * expect('hello').toBeTruthy();                 检测值是否为真
 * expect('').toBeFalsy();                       检测值是否为假
 * expect(throwError).toThrow('Error message');  检测函数是否抛出异常
 * expect([1, 2, 3]).toHaveLength(3);            检测数组或数字的长度
 *
 * afterAll(async () => {})                       测试前钩子函数
 * beforeAll(async () => {})                      测试完成钩子函数
 */
