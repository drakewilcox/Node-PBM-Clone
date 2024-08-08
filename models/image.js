const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Machine, {
        foreignKey: 'imageable_id',
        constraints: false,
        as: 'machine',
        scope: {
          imageable_type: 'machine',
        },
      });
    }
    getImageable(options) {
      if (!this.imageable_type) return Promise.resolve(null);
      const mixinMethodName = `get${this.imageable_type
        .charAt(0)
        .toUpperCase()}${this.imageable_type.slice(1)}`;
      return this[mixinMethodName](options);
    }
  }
  Image.init(
    {
      title: DataTypes.STRING,
      primary: DataTypes.BOOLEAN,
      type: DataTypes.STRING,
      urls: DataTypes.JSON,
      sizes: DataTypes.JSON,
      imageable_id: DataTypes.INTEGER,
      imageable_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Image',
      tableName: 'images',
      underscored: true,
    }
  );
  return Image;
};
