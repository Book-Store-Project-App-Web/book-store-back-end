import express from 'express'
import { userController } from '~/controllers/userController'

const router = express.Router()

router.get('/signup', userController.createUser)

export const userRoute = router
