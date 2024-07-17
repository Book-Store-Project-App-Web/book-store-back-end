const createNew = async () => {
  try {
    // const books = await db.Cart.findOne({
    //   where: {
    //     id: 1
    //   },
    //   include: { model: db.User },
    //   raw: true,
    //   nest: true
    // })
    // const newUser = await userService.createNew(req.body)
  } catch (error) {
    throw error
  }
}

export const userService = { createNew }
