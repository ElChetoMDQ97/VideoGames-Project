const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    backImg: {
      type: DataTypes.TEXT,
    },
    released: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.DECIMAL,
    },
    ratings_count: {
      type: DataTypes.INTEGER,
    },
    lastUpdate: {
      type: DataTypes.TEXT,
    },
    playTime: {
      type: DataTypes.INTEGER,
    },
    screenshot: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    fromApi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    timestamps: false
  });
};
