const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

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
      type: DataTypes.STRING(100),
      allowNull: false
    },
    socialClub: {
      type: DataTypes.STRING(100),
      // allowNull: false
    },
    serial: {
      type: DataTypes.STRING(500),
      // allowNull: false
    },
    regDate: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      // allowNull: false
    },
    lastDate: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      // allowNull: false
    },
    regIp: {
      type: DataTypes.STRING(50),
      // allowNull: false
    },
    lastIp: {
      type: DataTypes.STRING(50),
      // allowNull: false
    },
  },
    {
      timestamps: true
    })
  return model
}

