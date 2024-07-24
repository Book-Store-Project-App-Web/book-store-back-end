'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Screen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Screen.belongsToMany(models.Group, { through: 'Group_Screen' })
    }
  }
  Screen.init(
    {
      screenName: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Screen'
    }
  )
  return Screen
}
