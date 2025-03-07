const validate = require('validate.js');
require('./customRule');

exports.adminCreateVis = function (data) {
	const rule = {
		name: {
			presence: {
				allowEmpty: false
			},
			type: 'string',
			length: {
				minimum: 2,
				maximum: 10
			}
		},
		loginId: {
			presence: true,
			type: 'string',
			numericality: {
				//整数字符串
				onlyInteger: true,
				strict: false
			}
		},
		loginPwd: {
			presence: {
				allowEmpty: false
			},
			type: 'string'
		}
	};
	return validate.validate(data, rule);
};

exports.adminDeleteVis = function (data) {
	const rule = {
		ids: {
			presence: true,
			type: 'array',
			allNumbers: true
		}
	};

	return validate.validate(data, rule);
};

exports.adminUpdateVis = function (data) {
	const rule = {
		name: {
			presence: false,
			type: 'string',
			length: {
				minimum: 2,
				maximum: 10
			}
		},
		loginId: {
			presence: false,
			type: 'string',
			numericality: {
				//整数字符串
				onlyInteger: true,
				strict: false
			}
		},
		loginPwd: {
			presence: false,
			type: 'string'
		}
	};
	return validate.validate(data, rule);
};
