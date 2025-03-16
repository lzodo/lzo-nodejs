const sequelize = require('./db');
const moment = require('moment');

// 同步所有模型
const updateModel = require('./extend/updatePrompt');

const adminModel = require('./admin');
const bookModel = require('./book');
const studentModel = require('./student');
const classModel = require('./class');
const md5 = require('md5');

(async () => {
	// 定义博客和博客分类之间的关系，studentModel 的外键 classId 对应到 classModel 的主键 id
	// 一个班级可以有多个学生，学生通过外键 classId 与 班级主机id进行关联
	classModel.hasMany(studentModel, { foreignKey: 'classId', targetKey: 'id' });
	// 一个学生属于一个班级
	studentModel.belongsTo(classModel, { foreignKey: 'classId', targetKey: 'id' });

	// 模型变化再进行同步(alter: true 更新模型更改的部分,频繁保存会生成很多连接线, 使用 force: true 重置数据库)

	if (process.env.NODE_ENV == 'test') {
		await sequelize.sync({ force: true });
		console.log('统一同步完成');
	} else {
		// await sequelize.sync({ force: true });
		// console.log('统一同步完成');
	}

	// setTimeout(async () => {
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
	// }, 3000);
})();
