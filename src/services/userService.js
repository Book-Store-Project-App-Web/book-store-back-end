import db from '~/models'

const createNew = async (reqBody) => {
  try {
    return await db.User.create(reqBody)
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

export const userService = { createNew, getAll, getDetail, updateDetail, deleteDetail }