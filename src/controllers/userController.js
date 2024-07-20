import StatusCodes from 'http-status-codes'
import { userService } from '~/services/userService'
import { createSignToken } from '~/utils/createSignToken'

const createUser = async (req, res, next) => {
  try {
    await userService.createNew(req.body)
    return res.status(StatusCodes.CREATED).json({ message: 'Successfully' })
  } catch (error) {
    next(error)
  }
}

const getAllUser = async (req, res, next) => {
  try {
    const users = await userService.getAll()
    return res.status(StatusCodes.CREATED).json(users)
  } catch (error) {
    next(error)
  }
}

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json(user)
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    await userService.updateDetail(req.params.id, req.body)
    return res.status(StatusCodes.CREATED).json({ message: 'Successfully' })
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json({ message: 'Successfully' })
  } catch (error) {
    next(error)
  }
}

const updatePassword = async (req, res, next) => {
  try {
    const user = await userService.updatePassword(req.body, req.user)
    createSignToken(user, StatusCodes.OK, res)
  } catch (error) {
    next(error)
  }
}

const updateMe = async (req, res, next) => {
  try {
    await userService.updateMe(req.user.id, req.body)
    return res.status(StatusCodes.OK).json({ message: 'Successfully' })
  } catch (error) {
    next(error)
  }
}

const addCartUser = async (req, res, next) => {
  try {
    const cart = await userService.addCartUser(req.user.id, req.body)
    return res.status(StatusCodes.OK).json(cart)
  } catch (error) {
    next(error)
  }
}

const getMyCart = async (req, res, next) => {
  try {
    const myCart = await userService.getMyCart(req.user.id)
    return res.status(StatusCodes.OK).json(myCart)
  } catch (error) {
    next(error)
  }
}

export const userController = { createUser, getAllUser, getUser, updateUser, deleteUser, updatePassword, updateMe, addCartUser, getMyCart }
