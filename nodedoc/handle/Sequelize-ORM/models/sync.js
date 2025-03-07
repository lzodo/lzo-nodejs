const sequelize = require('./db');

// 同步所有模型
require('./extend/updatePrompt');

require('./admin');
require('./book');
const Student = require('./student');
const Class = require('./class');

// 关联模型的关系
// Class.hasMany(Student);
// Student.belongsTo(Class);

sequelize.sync({ alter: true }).then(() => {
	console.log('统一同步完成');
});
