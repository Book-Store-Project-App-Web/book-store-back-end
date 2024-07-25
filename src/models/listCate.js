'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class List_Cate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      List_Cate.hasMany(models.Category, {
        foreignKey: 'listCateId'
      })
    }
  }
  List_Cate.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'List_Cate'
    }
  )
  return List_Cate
}
