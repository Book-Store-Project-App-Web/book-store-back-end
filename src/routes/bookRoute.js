import express from 'express'
import { bookController } from '~/controllers/bookController'
import { verifyToken } from '~/middlewares/verifyToken'

const router = express.Router()

router.use(verifyToken)
router.route('/').post(bookController.createBook).get(bookController.getAllBook)
router.route('/:id').get(bookController.getBook).put(bookController.updateBook).delete(bookController.deleteBook)

export const bookRoute = router
