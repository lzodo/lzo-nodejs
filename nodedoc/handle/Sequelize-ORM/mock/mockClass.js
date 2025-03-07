const Mock = require('mockjs');
const Class = require('../models/class');

const result = Mock.mock({
	'datas|10': [
		{
			'id|+1': 1,
			name: '@id 班',
			openDate: '@date'
		}
	]
}).datas;

Class.bulkCreate(result);
