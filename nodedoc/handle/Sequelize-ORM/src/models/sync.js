const sequelize = require('./db');
const moment = require('moment');

// 同步所有模型
const updateModel = require('./extend/updatePrompt');

const adminModel = require('./admin');
const bookModel = require('./book');
const studentModel = require('./student');
const classModel = require('./class');
const md5 = require('md5');

// 关联模型的关系
// Class.hasMany(Student);
// Student.belongsTo(Class);

(async () => {
	sequelize.sync({ alter: true }).then(() => {
		console.log('统一同步完成');
	});
	setTimeout(async () => {
		const adminCount = await adminModel.count();
		const classCount = await classModel.count();
		const studentCount = await studentModel.count();
		const bookCount = await bookModel.count();
		const updateAppCount = await updateModel.count({ where: { name: 'updateApp' } });

		if (process.env.NODE_ENV == 'development') {
			// 如果是空表就模拟数据
			if (!adminCount) {
				await adminModel.create({
					loginId: 'admin',
					name: '超级管理员',
					loginPwd: md5('123456')
				});
				require('../mock/mockAdmin');
			}
			if (!classCount) {
				require('../mock/mockClass');
			}
			if (!studentCount) {
				require('../mock/mockStudent');
			}
			if (!bookCount) {
				require('../spider');
			}
			console.log('开发环境初始化数据完毕...');
		} else {
			if (!adminCount) {
				await adminModel.create({
					loginId: 'admin',
					name: '超级管理员',
					loginPwd: md5('123456')
				});
			}
			console.log('表数据初始化完毕...');
		}

		// 系统更新提示数据
		if (!updateAppCount) {
			console.log('创建 prompt 更新数据');
			updateModel.create({
				updateTime: moment().local().format('YYYY-MM-DD hh:mm:ss'),
				name: 'updateApp'
			});
			console.log('更细提示数据初始化完毕...');
		}
	}, 3000);
})();
