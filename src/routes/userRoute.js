import express from 'express'
import { authController } from '~/controllers/authController'
import { userController } from '~/controllers/userController'

const router = express.Router()

router.post('/signup', authController.signup)

router.route('/').post(userController.createUser).get(userController.getAllUser)
router.route('/:id').get(userController.getUser).put(userController.updateUser).delete(userController.deleteUser)

export const userRoute = router
