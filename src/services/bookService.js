import db from '~/models'
import slugify from '~/utils/slugify'

const createNew = async (reqBody) => {
  try {
    const newBook = {
      ...reqBody,
      slug: slugify(reqBody.name)
    }

    return await db.Book.create(newBook)
  } catch (error) {
    throw error
  }
}
const getAll = async (page, limit) => {
  const offset = (page - 1) * limit
  try {
    const { count, rows } = await db.Book.findAndCountAll({
      offset,
      limit,
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    let totalPages = Math.ceil(count / limit)
    return { totalRows: count, totalPages, books: rows }
  } catch (error) {
    throw error
  }
}

const getDetail = async (bookId) => {
  try {
    return await db.Book.findOne({
      where: { id: bookId },
      // attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [{ model: db.Supplier }, { model: db.Category }]
    })
  } catch (error) {
    throw error
  }
}

const updateDetail = async (bookId, reqBody) => {
  try {
    return await db.Book.update(reqBody, {
      where: {
        id: bookId
      }
    })
  } catch (error) {
    throw error
  }
}
const deleteDetail = async (bookId) => {
  try {
    return await db.Book.destroy({
      where: {
        id: bookId
      }
    })
  } catch (error) {
    throw error
  }
}

export const bookService = { createNew, getAll, getDetail, updateDetail, deleteDetail }
