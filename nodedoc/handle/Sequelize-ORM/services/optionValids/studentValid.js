const validate = require('validate.js');
const moment = require('moment');
require('./customRule');

exports.studentCreateVis = function (data) {
	// validate.validators.classExits = async function (value) {
	//   // 配置 classExits: true 的属性，就会调用这个函数，传入验证的属性值
	//   const c = await Class.findByPk(value);
	//   if (c) {
	//     return;
	//   }
	//   return "is not exist";
	// };
	const rule = {
		// 验证 name
		name: {
			// 不允许为空
			presence: {
				allowEmpty: false
			},
			// 限制类型
			type: 'string',
			// 限制长度
			length: {
				minimum: 2,
				maximum: 10
			}
		},
		// 验证 birthday
		birthday: {
			presence: {
				allowEmpty: false
			},
			// 必须设置 extend
			datetime: {
				dateOnly: true,
				earliest: +moment.utc().subtract(100, 'y'), // 最早不能是100年前
				latest: +moment.utc().subtract(5, 'y') // 最晚不能是5年内
			}
		},
		sex: {
			presence: true,
			type: 'boolean'
		},
		mobile: {
			presence: {
				allowEmpty: false
			},
			format: /1\d{10}/
		},
		ClassId: {
			presence: true,
			type: 'integer' //integer 必须是整数，number 任何数字都行，比较严格，必须是数字类型不能是字符串数字
			// classExits: false, // 自定义限制
		}
	};
	return validate.validate(data, rule);
	//   const result = await validate.async(data, rule);
};

exports.studentDeleteVis = function (data) {
	const rule = {
		ids: {
			presence: true,
			type: 'array',
			allNumbers: true
		}
	};
	return validate.validate(data, rule);
};

exports.studentUpdateVis = function (data) {
	const rule = {
		name: {
			presence: false,
			type: 'string',
			length: {
				minimum: 2,
				maximum: 10
			}
		},
		birthday: {
			presence: false,
			datetime: {
				dateOnly: true,
				earliest: +moment.utc().subtract(100, 'y'), // 最早不能是100年前
				latest: +moment.utc().subtract(5, 'y') // 最晚不能是5年内
			}
		},
		sex: {
			presence: false,
			type: 'boolean'
		},
		mobile: {
			presence: false,
			format: /1\d{10}/
		},
		ClassId: {
			presence: false,
			type: 'integer'
		}
	};
	return validate.validate(data, rule);
};
