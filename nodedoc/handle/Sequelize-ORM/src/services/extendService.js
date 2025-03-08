const UpdatePrompt = require('../models/extend/updatePrompt');

exports.getPrompt = async function () {
	let result = await UpdatePrompt.findOne({
		where: {
			name: 'updateApp'
		}
	});
	if (result) {
		result = result.toJSON();
	} else {
		result = '请创建数据库记录';
	}
	return result;
};
