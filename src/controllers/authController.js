import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/authService'

const signup = async (req, res, next) => {
  try {
    await authService.signup(req.body)
    return res.status(StatusCodes.CREATED).json({ message: 'Successfully' })
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'some thing wrong' })
  }
}

export const authController = { signup }
