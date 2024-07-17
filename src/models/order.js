'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User)
      Order.belongsToMany(models.Book, { through: 'BookOrder' })
    }
  }
  Order.init(
    {
      fullName: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      orderTotal: DataTypes.DOUBLE
    },
    {
      sequelize,
      modelName: 'Order'
    }
  )
  return Order
}
