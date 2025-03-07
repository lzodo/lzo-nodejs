const validate = require('validate.js');
require('./customRule');

exports.bookCreateVis = function (data) {
	const rule = {
		name: {
			presence: {
				allowEmpty: false
			},
			type: 'string',
			length: {
				minimum: 2,
				maximum: 100
			}
		}
	};
	return validate.validate(data, rule);
};

exports.bookDeleteVis = function (data) {
	const rule = {
		ids: {
			presence: true,
			type: 'array',
			allNumbers: true
		}
	};

	return validate.validate(data, rule);
};

exports.bookUpdateVis = function (data) {
	const rule = {
		name: {
			presence: false,
			type: 'string',
			length: {
				minimum: 2,
				maximum: 100
			}
		}
	};
	return validate.validate(data, rule);
};
