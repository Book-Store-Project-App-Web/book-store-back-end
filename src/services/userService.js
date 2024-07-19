import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'

import db from '~/models'
import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  try {
    const newUser = {
      ...reqBody,
      password: await bcrypt.hash(reqBody.password, 12)
    }
    return await db.User.create(newUser)
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    return await db.User.findAll({ attributes: { exclude: ['password'] } })
  } catch (error) {
    throw error
  }
}

const getDetail = async (userId) => {
  try {
    return await db.User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password'] }
    })
  } catch (error) {
    throw error
  }
}

const updateDetail = async (userId, reqBody) => {
  try {
    return await db.User.update(reqBody, {
      where: {
        id: userId
      }
    })
  } catch (error) {
    throw error
  }
}

const deleteDetail = async (userId) => {
  try {
    return await db.User.destroy({
      where: {
        id: userId
      }
    })
  } catch (error) {
    throw error
  }
}

const updatePassword = async (reqBody, currentUser) => {
  const { currentPassword, newPassword } = reqBody

  // 1) Get user from collection
  const user = await db.User.findOne({
    where: { id: currentUser.id }
  })

  // 2) Check if POSTed current password is correct
  if (!(await bcrypt.compare(currentPassword, currentUser.password))) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Your current password is wrong.')
  }
  // // 3) If so, update password
  user.password = await bcrypt.hash(newPassword, 12)

  await user.save()
  return user.dataValues
}

const updateMe = async (userId, reqBody) => {
  try {
    return await db.User.update(reqBody, {
      where: {
        id: userId
      }
    })
  } catch (error) {
    throw error
  }
}

const addCartUser = async (userId, reqBody) => {
  const { bookId, quantity } = reqBody
  try {
    let cart = await db.Cart.findOne({ where: { userId } })

    if (!cart) {
      cart = await db.Cart.create({ userId })
    }

    let bookCart = await db.Book_Cart.findOne({ where: { cartId: cart.id, bookId } })

    if (bookCart) {
      bookCart.quantity += quantity
      await bookCart.save()
    } else {
      return await db.Book_Cart.create({ cartId: cart.id, book_id: bookId, quantity })
    }
    // return bookCart
  } catch (error) {
    throw error
  }
}

const cartSummary = async (userId) => {
  try {
    const cart = await db.Cart.findOne({ where: { userId }, include: [{ model: db.Book, through: { attributes: ['quantity'] } }] })

    if (!cart) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Cart not found!')
    }

    // let totalQuantity = 0
    // let totalPrice = 0

    // cart.Book.forEach((book) => {
    //   console.log(book)
    //   // totalQuantity += book.CartProduct.quantity
    //   // totalPrice += book.CartProduct.quantity * book.price
    // })
  } catch (error) {
    throw error
  }
}

export const userService = { createNew, getAll, getDetail, updateDetail, deleteDetail, updatePassword, updateMe, addCartUser, cartSummary }
