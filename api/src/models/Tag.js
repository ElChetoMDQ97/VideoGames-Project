const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Tag', {
   id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
   },
name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
   }
  },
  {
    timestamps: false
  }
  )}