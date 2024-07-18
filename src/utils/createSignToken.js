import { env } from '~/config/environment'
import jwt from 'jsonwebtoken'

const signToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    //---JWT hết hạn sau 3d - 3ngày
    expiresIn: env.JWT_EXPIRES_IN
  })
}

export const createSignToken = (user, statusCode, res) => {
  const token = signToken(user.id)
  const cookieOptions = {
    expires: new Date(
      //--Đổi thời gian 3 ngày lưu cookie sang milisecond
      Date.now() + env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }
  if (env.BUILD_MODE === 'production') cookieOptions.secure = true

  user.password = undefined

  res.cookie('token', token, cookieOptions)

  return res.status(statusCode).json(user)
}
