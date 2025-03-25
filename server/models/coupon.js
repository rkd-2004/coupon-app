module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Coupon', {
      code: { type: DataTypes.STRING, unique: true },
      isClaimed: { type: DataTypes.BOOLEAN, defaultValue: false },
      claimedBy: DataTypes.STRING
    });
  };