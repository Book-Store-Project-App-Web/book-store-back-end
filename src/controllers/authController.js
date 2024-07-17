import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/authService'

const signup = async (req, res, next) => {
  try {
    await authService.signup(req.body)
    return res.status(StatusCodes.CREATED).json({ message: 'Successfully' })
  } catch (error) {
    next(error)
  }
}

export const authController = { signup }
