const sequelize = require('./db');
const { DataTypes } = require('sequelize');
const Student = require('./student');

const Class = sequelize.define(
	'Class',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		openDate: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		paranoid: true
	}
);

module.exports = Class;
