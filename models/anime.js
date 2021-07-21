'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Biodata, {
        foreignKey: 'animeId'
      });
    }
  };
  Anime.init({
    animeId: DataTypes.INTEGER,
    device: DataTypes.STRING,
    favorite: DataTypes.STRING,
    karakter: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Anime',
  });
  return Anime;
};