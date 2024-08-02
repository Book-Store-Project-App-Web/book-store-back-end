import express from 'express'
import { authController } from '~/controllers/authController'
import { userController } from '~/controllers/userController'
import { verifyToken } from '~/middlewares/verifyToken'

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router.use(verifyToken)
router.put('/update-password', userController.updatePassword)
router.put('/update-me', userController.updateMe)
// --------------------ADD TO CART--------------
router.post('/add-to-cart', userController.addCartUser)
router.get('/cart-quantity/:userId', userController.countQuantityCart)
router.post('/update-cart-quantity', userController.updateCartQuantity)
router.delete('/delete-cart-item/:bookId', userController.deleteCartItem)
router.get('/my-cart', userController.getMyCart)
router.post('/order', userController.orderCart)
router.get('/my-order', userController.getOrder)
router.get('/purchases', userController.getPurchases)
router.post('/recommend', userController.recommendSystem)

router.route('/').post(userController.createUser).get(userController.getAllUser)
router.route('/:id').get(userController.getUser).put(userController.updateUser).delete(userController.deleteUser)

export const userRoute = router
