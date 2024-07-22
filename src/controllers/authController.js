import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/authService'
import { createSignToken } from '~/utils/createSignToken'

const signup = async (req, res, next) => {
  try {
    await authService.signup(req.body)
    return res.status(StatusCodes.CREATED).json({ message: 'Đăng ký thành công' })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body)
    createSignToken(user.dataValues, StatusCodes.OK, res)
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  res.clearCookie('token').status(StatusCodes.OK).json({ status: 'Logout Successful' })
}

export const authController = { signup, login, logout }
