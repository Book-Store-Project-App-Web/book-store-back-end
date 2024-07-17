'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsToMany(models.Cart, { through: 'BookCart' })
      Book.belongsToMany(models.Order, { through: 'BookOrder' })
    }
  }
  Book.init(
    {
      name: DataTypes.STRING,
      author: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      discount: DataTypes.DOUBLE,
      stock: DataTypes.INTEGER,
      totalRating: DataTypes.INTEGER,
      sold: DataTypes.INTEGER,
      ratingsAverage: DataTypes.DOUBLE
    },
    {
      sequelize,
      modelName: 'Book'
    }
  )
  return Book
}
