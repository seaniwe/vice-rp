const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
global.Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Account', {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    login: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    socialClub: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    serial: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    regDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    },
    lastDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    regIp: {
      type: DataTypes.STRING(50),
      defaultValue: Sequelize.NOW,
      allowNull: false
    },
    lastIp: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
  },
    {
      timestamps: false
    })
  return model
}

