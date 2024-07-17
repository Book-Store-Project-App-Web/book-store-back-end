import StatusCodes from 'http-status-codes'
import db from '~/models'

const createUser = async (req, res, next) => {
  try {
    // const newUser = await userService.createNew(req.body)
    const data = await db.Cart.findAll({
      include: { model: db.User },
      raw: true,
      nest: true
    })
    console.log(data)
    // return res.status(StatusCodes.CREATED).json(newUser)
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'some thing wrong' })
  }
}

export const userController = { createUser }
