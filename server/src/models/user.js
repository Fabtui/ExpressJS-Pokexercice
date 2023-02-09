const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Username already taken'
      },
    },
    password: {
      type: DataTypes.STRING
    }
  })
}