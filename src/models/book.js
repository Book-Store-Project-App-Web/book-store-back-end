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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      discount: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
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
