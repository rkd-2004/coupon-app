const { Sequelize } = require('sequelize');
const config = require('../config/config');
const couponModel = require('./coupon');

const sequelize = new Sequelize(config.development);

const Coupon = couponModel(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  Coupon
};