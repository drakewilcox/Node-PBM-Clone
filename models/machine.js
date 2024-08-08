'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Machine extends Model {
    static associate(models) {
      Machine.belongsTo(models.Manufacturer, {
        foreignKey: 'manufacturer_id',
        as: 'manufacturer',
      });

      Machine.hasMany(models.Image, {
        foreignKey: 'imageable_id',
        constraints: false,
        scope: {
          imageable_type: 'machine',
        },
        as: 'images',
      });
    }
  }

  Machine.init(
    {
      opdb_id: DataTypes.STRING,
      is_machine: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      common_name: DataTypes.STRING,
      shortname: DataTypes.STRING,
      physical_machine: DataTypes.INTEGER,
      ipdb_id: DataTypes.INTEGER,
      manufacture_date: DataTypes.DATE,
      type: DataTypes.STRING,
      display: DataTypes.STRING,
      player_count: DataTypes.INTEGER,
      features: DataTypes.ARRAY(DataTypes.STRING),
      keywords: DataTypes.ARRAY(DataTypes.STRING),
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Machine',
      tablename: 'machines',
      underscored: true,
    }
  );
};
