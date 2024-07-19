import express from 'express'
import { userRoute } from './userRoute'
import { bookRoute } from './bookRoute'

const router = express.Router()

router.use('/user', userRoute)
router.use('/book', bookRoute)

export const APIs = router
