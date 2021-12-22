'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    static associate(models) {
      // define association here
    }
  };
  accounts.init({
    login: DataTypes.STRING(40),
    password: DataTypes.STRING(128),
    email: DataTypes.STRING(40),
    socialClub: DataTypes.STRING(40),
    socialClubId: DataTypes.STRING(120),
    regDate: DataTypes.DATE,
    lastDate: DataTypes.DATE,
    regIp: DataTypes.STRING(100),
    lastIp: DataTypes.STRING(100),
  },
    {
      sequelize,
      modelName: 'accounts',
    });
  return accounts;
};