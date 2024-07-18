import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'

import db from '~/models'
import ApiError from '~/utils/ApiError'

const signup = async (reqBody) => {
  try {
    const newUser = {
      ...reqBody,
      password: await bcrypt.hash(reqBody.password, 12)
    }
    return await db.User.create(newUser, { raw: true })
  } catch (error) {
    throw error
  }
}

const login = async (reqBody) => {
  try {
    const { email, password } = reqBody

    if (!email || !password) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Please provide email and password')
    }

    const user = await db.User.findOne({
      where: { email }
    })
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Incorrect email!')
    }
    const matchUser = await bcrypt.compare(password, user.password)
    if (matchUser) {
      return user
    } else {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Incorrect password!')
    }
  } catch (error) {
    throw error
  }
}

export const authService = { signup, login }
