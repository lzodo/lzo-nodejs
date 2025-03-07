const moment = require('moment');
const UpdatePrompt = require('../../models/extend/updatePrompt');
// 是否更新程序
UpdatePrompt.update(
	{
		updateTime: moment().local().format('YYYY-MM-DD hh:mm:ss')
	},
	{
		where: {
			name: 'updateApp'
		}
	}
);
