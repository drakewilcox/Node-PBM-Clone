'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manufacturer extends Model {
    static associate(models) {
      Manufacturer.hasMany(models.Machine, {
        foreignKey: 'manufacturer_id',
        as: 'machines',
      });
    }
  }
  Manufacturer.init(
    {
      name: DataTypes.STRING,
      full_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Manufacturer',
      tableName: 'manufacturers',
      underscored: true,
    }
  );
  return Manufacturer;
};
