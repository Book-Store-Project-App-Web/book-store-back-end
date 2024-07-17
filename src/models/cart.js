'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User)
      Cart.belongsToMany(models.Book, { through: 'BookCart' })
    }
  }
  Cart.init(
    {},
    {
      sequelize,
      modelName: 'Cart'
    }
  )
  return Cart
}
