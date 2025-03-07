const validate = require('validate.js');

// 自定义验证规则
validate.validators.allNumbers = function (value) {
	if (!Array.isArray(value)) {
		return 'must be an array';
	}
	return value.every((num) => typeof num === 'number' && !isNaN(num)) ? undefined : 'must contain only numbers';
};
