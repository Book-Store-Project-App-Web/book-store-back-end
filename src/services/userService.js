import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'

import { Op } from 'sequelize'
import db from '~/models'
import ApiError from '~/utils/ApiError'

const getBooksInCartUser = async (cart) => {
  return await db.Cart.findOne({
    where: { id: cart.id },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: db.Book,
        through: { attributes: ['quantity'] }
      }
    ]
  })
}

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
    // --- 1: Tìm kiếm Cart của User đã đăng nhập
    let cart = await db.Cart.findOne({ where: { userId } })

    // --- 2: Nếu không có thì tạo mới Cart
    if (!cart) {
      cart = await db.Cart.create({ userId })
    }

    // --- 3: Tìm tất cả sản phẩm thuộc trong Cart ủa User
    let bookCart = await db.Book_Cart.findOne({
      where: {
        [Op.and]: [{ cartId: cart.id }, { bookId }]
      }
    })

    // --- 4: Nếu đã có Book trong Cart thì tăng số lượng lên
    if (bookCart) {
      bookCart.quantity += quantity
      await bookCart.save()
    } else {
      // --- 5: Nếu chưa có Book trong Cart thì thêm mới vào Cart
      await db.Book_Cart.create({ CartId: cart.id, BookId: bookId, quantity })
    }

    // ---6 Tính toán tổng số lượng sản phẩm trong giỏ hàng
    const booksInCart = await getBooksInCartUser(cart)

    let totalQuantity = 0
    let totalPrice = 0
    booksInCart.Books.forEach((book) => {
      if (book.stock < book.Book_Cart.quantity) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `Not enough stock for ${book.name}`)
      }
      totalQuantity += 1
      totalPrice += book.Book_Cart.quantity * book.price
    })
    booksInCart.totalQuantity = +totalQuantity
    booksInCart.totalCartPrice = totalPrice
    await booksInCart.save()

    return booksInCart
  } catch (error) {
    throw error
  }
}

const getMyCart = async (userId) => {
  try {
    let cart = await db.Cart.findOne({ where: { userId } })
    if (!cart) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Cart not found!')
    }
    const bookCart = await db.Cart.findOne({
      where: { id: cart.id },
      include: [
        {
          model: db.Book,
          attributes: ['name', 'price'],
          through: { attributes: ['quantity'] }
        }
      ]
    })
    if (bookCart.Books.length <= 0) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Chua co san pham trong gio hang')
    }

    return bookCart
  } catch (error) {
    throw error
  }
}

const orderCart = async (userId, reqBody) => {
  const { fullName, phone, address } = reqBody
  const transaction = await db.sequelize.transaction()
  try {
    let cart = await db.Cart.findOne({ where: { userId } })

    if (!cart) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Cart not found')
    }

    const order = await db.Order.create(
      {
        userId,
        fullName,
        phone,
        address
      },
      { transaction }
    )

    const booksInCart = await getBooksInCartUser(cart)

    for (const book of booksInCart.Books) {
      if (book.stock < book.Book_Cart.quantity) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `Not enough stock for ${book.name}`)
      }

      await db.Book_Order.create(
        {
          OrderId: order.id,
          BookId: book.id,
          quantity: book.Book_Cart.quantity
        },
        { transaction }
      )
      book.stock -= book.Book_Cart.quantity
      await book.save({ transaction })
    }

    order.totalOrderPrice = cart.totalCartPrice
    await order.save({ transaction })

    await db.Cart.destroy({ where: { id: cart.id }, transaction })
    await db.Book_Cart.destroy({ where: { CartId: cart.id }, transaction })

    await transaction.commit()
    return { message: 'Order placed successfully' }
  } catch (error) {
    throw error
  }
}

export const userService = { createNew, getAll, getDetail, updateDetail, deleteDetail, updatePassword, updateMe, addCartUser, getMyCart, orderCart }
