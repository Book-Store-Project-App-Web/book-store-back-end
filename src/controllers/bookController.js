import { StatusCodes } from 'http-status-codes'
import { bookService } from '~/services/bookService'

const createBook = async (req, res, next) => {
  try {
    await bookService.createNew(req.body)
    return res.status(StatusCodes.CREATED).json({ message: 'Successfully' })
  } catch (error) {
    next(error)
  }
}
const getAllBook = async (req, res, next) => {
  try {
    let page = req.query.page
    let limit = req.query.limit
    const books = await bookService.getAll(+page, +limit)
    return res.status(StatusCodes.CREATED).json(books)
  } catch (error) {
    next(error)
  }
}

const getBook = async (req, res, next) => {
  try {
    const book = await bookService.getDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json(book)
  } catch (error) {
    next(error)
  }
}

const updateBook = async (req, res, next) => {
  try {
    await bookService.updateDetail(req.params.id, req.body)
    return res.status(StatusCodes.CREATED).json({ message: 'Successfully' })
  } catch (error) {
    next(error)
  }
}

const deleteBook = async (req, res, next) => {
  try {
    await bookService.deleteDetail(req.params.id)
    return res.status(StatusCodes.CREATED).json({ message: 'Successfully' })
  } catch (error) {
    next(error)
  }
}

export const bookController = { createBook, getAllBook, getBook, updateBook, deleteBook }
