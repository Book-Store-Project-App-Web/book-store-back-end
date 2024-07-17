import StatusCodes from 'http-status-codes'
import { userService } from '~/services/userService'

const createUser = async (req, res, next) => {
  try {
    await userService.createNew(req.body)
    return res.status(StatusCodes.CREATED).json({ message: 'Successfully' })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'some thing wrong' })
  }
}

const getAllUser = async (req, res, next) => {
  try {
    const users = await userService.getAll()
    return res.status(StatusCodes.CREATED).json(users)
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'some thing wrong' })
  }
}

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json(user)
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'some thing wrong' })
  }
}

const updateUser = async (req, res, next) => {
  try {
    await userService.updateDetail(req.params.id, req.body)
    return res.status(StatusCodes.CREATED).json({ message: 'Successfully' })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'some thing wrong' })
  }
}

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json({ message: 'Successfully' })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'some thing wrong' })
  }
}

export const userController = { createUser, getAllUser, getUser, updateUser, deleteUser }
