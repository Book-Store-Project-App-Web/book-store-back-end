import express from 'express'
import { bookController } from '~/controllers/bookController'
import { verifyToken } from '~/middlewares/verifyToken'

const router = express.Router()
router.get('/', bookController.getAllBook)
router.get('/:id', bookController.getBook)
router.use(verifyToken)
router.route('/').post(bookController.createBook)
router.route('/:id').put(bookController.updateBook).delete(bookController.deleteBook)

export const bookRoute = router
