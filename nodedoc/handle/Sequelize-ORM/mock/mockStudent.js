const Mock = require('mockjs');
const Student = require('../models/student');

const result = Mock.mock({
	'datas|100': [
		{
			name: '@cname', // 随机中文名
			birthday: '@date',
			'sex|1-2': true,
			mobile: /^1\d{10}$/,
			'ClassId|1-10': 0
		}
	]
}).datas;

console.log(result);
setTimeout(() => {
	Student.bulkCreate(result);
}, 3000);
