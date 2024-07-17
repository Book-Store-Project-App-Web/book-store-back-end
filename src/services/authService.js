import db from '~/models'

const signup = async (reqBody) => {
  try {
    return await db.User.create(reqBody)
  } catch (error) {
    throw error
  }
}

export const authService = { signup }
