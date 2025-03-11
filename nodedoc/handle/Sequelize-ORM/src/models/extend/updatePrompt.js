const sequelize = require('../db');
const { DataTypes } = require('sequelize');

// 创建一个模型对象
const UpdatePrompt = sequelize.define('UpdatePrompt', {
	// 在这里定义模型属性
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	updateTime: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

module.exports = UpdatePrompt;
