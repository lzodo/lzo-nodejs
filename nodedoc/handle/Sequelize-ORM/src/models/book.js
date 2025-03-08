const sequelize = require('./db');
const { DataTypes } = require('sequelize');

const Book = sequelize.define(
	'Book',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		imgurl: {
			type: DataTypes.STRING,
			allowNull: true
		},
		publishDate: {
			type: DataTypes.DATE,
			allowNull: true
		},
		author: {
			type: DataTypes.STRING,
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT('long'),
			allowNull: true
		}
	},
	{
		paranoid: true
	}
);

module.exports = Book;
