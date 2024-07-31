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
      Book.belongsToMany(models.Cart, { through: 'Book_Cart' })
      Book.belongsToMany(models.Order, { through: 'Book_Order' })
      Book.belongsToMany(models.Import_Invoice, { through: 'Book_ImportInvoice' })
      Book.belongsTo(models.Supplier)
      Book.belongsTo(models.Category)
    }
  }
  Book.init(
    {
      name: {
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
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pageNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      publishingYear: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      slug: DataTypes.STRING,
      image: DataTypes.STRING,
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
