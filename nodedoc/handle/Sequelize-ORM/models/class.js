const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Class = sequelize.define(
  "Class",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    openDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Class;
